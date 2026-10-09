/* ooxml.js — build .docx and .pptx in the browser, with no dependencies.
 *
 * The AIRS Engagement Planner already proved this works: it writes a valid
 * .xlsx from scratch using a store-only zip and hand-written OOXML parts.
 * .docx and .pptx use the same container, so the zip, CRC and escaping layers
 * are shared here and only the part writers differ.
 *
 * buildDocx() and buildPptx() are pure: they take a plain object and return a
 * Uint8Array. Nothing touches the DOM, so both are testable under Node. Only
 * triggerDownload() needs a browser.
 *
 * Shared with: docs/guides/airs-pov/ (document and deck generation) and
 * docs/guides/airs-planner/ (spreadsheet export).
 * Specification: workspace/POV-Generator/POV-SPEC.md §8.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OOXML = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // ── Palette ────────────────────────────────────────────────────────────────
  // Matches the site tokens in pan-guides.css, minus the leading hash: OOXML
  // wants bare hex.
  const NAVY = '00294D';
  const GOLD = 'FFB81C';
  const LINK = '006DCC';
  const FG = '333333';
  const FG_LIGHT = '666666';
  const BORDER = 'DEE2E6';
  const ROW_ALT = 'F7F8FA';
  const CODE_BG = 'F8F9FA';
  const NOTE_BG = 'E7F3FF';
  const NOTE_EDGE = '3B82F6';
  const WARN_BG = 'FFFBEB';
  const WARN_EDGE = 'F59E0B';

  // Word has no font stacks. w:altName in fontTable.xml is the OOXML
  // substitution mechanism: a machine with the brand font uses it, everything
  // else falls back to a font that ships with Office on Windows and macOS.
  const BODY_FONT = 'Lato';
  const BODY_FALLBACK = 'Calibri';
  const CODE_FONT = 'Source Code Pro';
  const CODE_FALLBACK = 'Consolas';

  // ── Zip (store only) ───────────────────────────────────────────────────────
  const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[i] = c >>> 0;
    }
    return t;
  })();

  function crc32(bytes) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function zipStore(files) {
    const enc = new TextEncoder();
    const chunks = [];
    const central = [];
    let offset = 0;

    const u16 = n => [n & 0xFF, (n >>> 8) & 0xFF];
    const u32 = n => [n & 0xFF, (n >>> 8) & 0xFF, (n >>> 16) & 0xFF, (n >>> 24) & 0xFF];

    // Fixed DOS timestamp, so the same input always yields a byte-identical
    // file. Makes generated output diffable and cacheable.
    const dosTime = (12 << 11);
    const dosDate = ((2024 - 1980) << 9) | (1 << 5) | 1;

    files.forEach(f => {
      const nameBytes = enc.encode(f.name);
      const data = f.content instanceof Uint8Array ? f.content : enc.encode(f.content);
      const crc = crc32(data);

      const local = [
        ...u32(0x04034B50), ...u16(20), ...u16(0x0800), ...u16(0),
        ...u16(dosTime), ...u16(dosDate),
        ...u32(crc), ...u32(data.length), ...u32(data.length),
        ...u16(nameBytes.length), ...u16(0)
      ];
      chunks.push(new Uint8Array(local), nameBytes, data);

      central.push([
        ...u32(0x02014B50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0),
        ...u16(dosTime), ...u16(dosDate),
        ...u32(crc), ...u32(data.length), ...u32(data.length),
        ...u16(nameBytes.length), ...u16(0), ...u16(0),
        ...u16(0), ...u16(0), ...u32(0), ...u32(offset)
      ]);
      central.push(nameBytes);
      offset += local.length + nameBytes.length + data.length;
    });

    const centralChunks = [];
    let centralSize = 0;
    for (const c of central) {
      const arr = c instanceof Uint8Array ? c : new Uint8Array(c);
      centralChunks.push(arr);
      centralSize += arr.length;
    }

    const eocd = new Uint8Array([
      ...u32(0x06054B50), ...u16(0), ...u16(0),
      ...u16(files.length), ...u16(files.length),
      ...u32(centralSize), ...u32(offset), ...u16(0)
    ]);

    const all = [...chunks, ...centralChunks, eocd];
    const total = all.reduce((n, a) => n + a.length, 0);
    const out = new Uint8Array(total);
    let p = 0;
    all.forEach(a => { out.set(a, p); p += a.length; });
    return out;
  }

  // Control characters below 0x20 other than tab/LF/CR are illegal in XML 1.0
  // and make Word refuse the file outright, so they are dropped rather than
  // escaped.
  const CTRL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;

  // An apostrophe needs no escape: every attribute written here is delimited
  // with double quotes, and ' is legal in text content.
  function xmlEsc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(CTRL, '');
  }

  const XML_DECL = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

  // ── Excel ──────────────────────────────────────────────────────────────────
  // Moved here verbatim from the Engagement Planner, which is still its only
  // caller. Output is byte-identical to the in-page version it replaced.

  function colRef(i) {
    let s = '';
    i += 1;
    while (i > 0) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); }
    return s;
  }

  function sheetXml(sheet) {
    const cols = sheet.cols.map((w, i) =>
      `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('');

    const rows = sheet.rows.map((row, r) => {
      const cells = row.map((val, c) => {
        const ref = colRef(c) + (r + 1);
        if (r === 0) return `<c r="${ref}" s="1" t="inlineStr"><is><t xml:space="preserve">${xmlEsc(val)}</t></is></c>`;
        if (typeof val === 'number') return `<c r="${ref}" s="2"><v>${val}</v></c>`;
        if (val === '' || val == null) return `<c r="${ref}" s="2"/>`;
        return `<c r="${ref}" s="2" t="inlineStr"><is><t xml:space="preserve">${xmlEsc(val)}</t></is></c>`;
      }).join('');
      const h = sheet.heights && sheet.heights[r] ? ` ht="${sheet.heights[r]}" customHeight="1"` : '';
      return `<row r="${r + 1}"${h}>${cells}</row>`;
    }).join('');

    const lastCol = colRef(sheet.cols.length - 1);
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="15"/><cols>${cols}</cols><sheetData>${rows}</sheetData><autoFilter ref="A1:${lastCol}${sheet.rows.length}"/></worksheet>`;
  }

  function buildXlsx(sheets) {
    const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF00294D"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;

    const files = [
      { name: '[Content_Types].xml', content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((s, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>` },
      { name: '_rels/.rels', content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
      { name: 'xl/workbook.xml', content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((s, i) => `<sheet name="${xmlEsc(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>` },
      { name: 'xl/_rels/workbook.xml.rels', content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((s, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
      { name: 'xl/styles.xml', content: STYLES }
    ];
    sheets.forEach((s, i) => files.push({ name: `xl/worksheets/sheet${i + 1}.xml`, content: sheetXml(s) }));
    return zipStore(files);
  }

  // ── Word ───────────────────────────────────────────────────────────────────
  const W_NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';

  function wRun(text, opts) {
    const o = opts || {};
    const props = [];
    if (o.bold) props.push('<w:b/>');
    if (o.italic) props.push('<w:i/>');
    if (o.color) props.push(`<w:color w:val="${o.color}"/>`);
    if (o.size) props.push(`<w:sz w:val="${o.size * 2}"/>`);
    if (o.font) props.push(`<w:rFonts w:ascii="${o.font}" w:hAnsi="${o.font}"/>`);
    const rPr = props.length ? `<w:rPr>${props.join('')}</w:rPr>` : '';
    // xml:space preserve keeps leading and trailing spaces, which Word
    // otherwise silently collapses.
    return `<w:r>${rPr}<w:t xml:space="preserve">${xmlEsc(text)}</w:t></w:r>`;
  }

  function wPara(text, opts) {
    const o = opts || {};
    const props = [];
    if (o.style) props.push(`<w:pStyle w:val="${o.style}"/>`);
    if (o.align) props.push(`<w:jc w:val="${o.align}"/>`);
    if (o.spaceBefore || o.spaceAfter) {
      props.push(`<w:spacing w:before="${o.spaceBefore || 0}" w:after="${o.spaceAfter || 0}"/>`);
    }
    if (o.bullet) props.push('<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>');
    if (o.shade) props.push(`<w:shd w:val="clear" w:fill="${o.shade}"/>`);
    const pPr = props.length ? `<w:pPr>${props.join('')}</w:pPr>` : '';
    const runs = text == null ? '' : wRun(text, o);
    return `<w:p>${pPr}${runs}</w:p>`;
  }

  // An explicit break run, rather than pPr/pageBreakBefore: the latter is
  // ignored by several renderers, including macOS Quick Look.
  const W_PAGE_BREAK = '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';

  function wCell(text, opts) {
    const o = opts || {};
    const props = [`<w:tcW w:w="${o.width || 0}" w:type="${o.width ? 'dxa' : 'auto'}"/>`];
    if (o.fill) props.push(`<w:shd w:val="clear" w:fill="${o.fill}"/>`);
    props.push('<w:vAlign w:val="top"/>');
    const body = String(text == null ? '' : text).split('\n')
      .map(line => wPara(line, { bold: o.bold, color: o.color, size: o.size }))
      .join('');
    return `<w:tc><w:tcPr>${props.join('')}</w:tcPr>${body}</w:tc>`;
  }

  function wTable(head, rows, widths) {
    const borders = ['top', 'left', 'bottom', 'right', 'insideH', 'insideV']
      .map(s => `<w:${s} w:val="single" w:sz="4" w:space="0" w:color="${BORDER}"/>`).join('');
    const grid = (widths || []).map(w => `<w:gridCol w:w="${w}"/>`).join('');

    const headRow = head && head.length
      ? `<w:tr><w:trPr><w:tblHeader/></w:trPr>${head.map((h, i) =>
          wCell(h, { fill: NAVY, bold: true, color: 'FFFFFF', width: widths && widths[i] })).join('')}</w:tr>`
      : '';

    const bodyRows = rows.map((r, ri) =>
      `<w:tr>${r.map((c, i) =>
        wCell(c, { fill: ri % 2 ? ROW_ALT : null, width: widths && widths[i] })).join('')}</w:tr>`
    ).join('');

    return `<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/>` +
      `<w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${borders}</w:tblBorders>` +
      `<w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>${grid}</w:tblGrid>${headRow}${bodyRows}</w:tbl>`;
  }

  /* A single-cell table used for callouts and code blocks. Paragraph shading
   * (w:shd on pPr) tints only the text line and is dropped by some renderers,
   * so a bordered cell is the reliable way to draw a block with a background
   * and a coloured edge. */
  function wPanel(paras, fill, accent) {
    const edge = (side, color, sz) =>
      `<w:${side} w:val="single" w:sz="${sz}" w:space="0" w:color="${color}"/>`;
    const borders = edge('top', fill, 2) + edge('left', accent, 18) +
      edge('bottom', fill, 2) + edge('right', fill, 2);
    return `<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/>` +
      `<w:tblBorders>${edge('top', fill, 2)}${edge('left', accent, 18)}` +
      `${edge('bottom', fill, 2)}${edge('right', fill, 2)}</w:tblBorders>` +
      `<w:tblCellMar><w:top w:w="120" w:type="dxa"/><w:left w:w="180" w:type="dxa"/>` +
      `<w:bottom w:w="120" w:type="dxa"/><w:right w:w="180" w:type="dxa"/></w:tblCellMar>` +
      `</w:tblPr><w:tblGrid><w:gridCol w:w="9638"/></w:tblGrid>` +
      `<w:tr><w:tc><w:tcPr><w:tcW w:w="5000" w:type="pct"/>` +
      `<w:shd w:val="clear" w:fill="${fill}"/>` +
      `<w:tcBorders>${borders}</w:tcBorders></w:tcPr>${paras}</w:tc></w:tr></w:tbl>`;
  }

  function docxStyles() {
    const heading = (id, name, size, color, before) =>
      `<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${name}"/>` +
      `<w:basedOn w:val="Normal"/><w:qFormat/>` +
      `<w:pPr><w:keepNext/><w:spacing w:before="${before}" w:after="120"/></w:pPr>` +
      `<w:rPr><w:rFonts w:ascii="${BODY_FONT}" w:hAnsi="${BODY_FONT}" w:cs="${BODY_FONT}"/>` +
      `<w:b/><w:color w:val="${color}"/>` +
      `<w:sz w:val="${size * 2}"/></w:rPr></w:style>`;

    return XML_DECL + `<w:styles ${W_NS}>` +
      `<w:docDefaults><w:rPrDefault><w:rPr>` +
      `<w:rFonts w:ascii="${BODY_FONT}" w:hAnsi="${BODY_FONT}" w:eastAsia="${BODY_FONT}" w:cs="${BODY_FONT}"/>` +
      `<w:color w:val="${FG}"/><w:sz w:val="20"/>` +
      `</w:rPr></w:rPrDefault><w:pPrDefault><w:pPr>` +
      `<w:spacing w:after="120" w:line="276" w:lineRule="auto"/>` +
      `</w:pPr></w:pPrDefault></w:docDefaults>` +
      `<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>` +
      heading('Heading1', 'heading 1', 18, NAVY, 360) +
      heading('Heading2', 'heading 2', 14, NAVY, 280) +
      heading('Heading3', 'heading 3', 11, NAVY, 240) +
      `<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:qFormat/>` +
      `<w:pPr><w:spacing w:after="160"/></w:pPr>` +
      `<w:rPr><w:rFonts w:ascii="${BODY_FONT}" w:hAnsi="${BODY_FONT}" w:cs="${BODY_FONT}"/><w:b/>` +
      `<w:color w:val="${NAVY}"/><w:sz w:val="56"/></w:rPr></w:style>` +
      `<w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:qFormat/>` +
      `<w:rPr><w:rFonts w:ascii="${BODY_FONT}" w:hAnsi="${BODY_FONT}" w:cs="${BODY_FONT}"/>` +
      `<w:color w:val="${FG_LIGHT}"/><w:sz w:val="28"/></w:rPr></w:style>` +
      `<w:style w:type="paragraph" w:styleId="Code"><w:name w:val="Code"/><w:basedOn w:val="Normal"/>` +
      `<w:pPr><w:spacing w:after="0"/></w:pPr>` +
      `<w:rPr><w:rFonts w:ascii="${CODE_FONT}" w:hAnsi="${CODE_FONT}" w:cs="${CODE_FONT}"/><w:sz w:val="18"/></w:rPr></w:style>` +
      `<w:style w:type="table" w:styleId="TableGrid"><w:name w:val="Table Grid"/>` +
      `<w:tblPr><w:tblCellMar><w:top w:w="72" w:type="dxa"/><w:left w:w="108" w:type="dxa"/>` +
      `<w:bottom w:w="72" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>` +
      `</w:styles>`;
  }

  function docxFontTable() {
    const font = (name, alt, family, pitch) =>
      `<w:font w:name="${name}"><w:altName w:val="${alt}"/>` +
      `<w:family w:val="${family}"/><w:pitch w:val="${pitch}"/></w:font>`;
    return XML_DECL + `<w:fonts ${W_NS}>` +
      font(BODY_FONT, BODY_FALLBACK, 'swiss', 'variable') +
      font(CODE_FONT, CODE_FALLBACK, 'modern', 'fixed') +
      font(BODY_FALLBACK, 'Arial', 'swiss', 'variable') +
      font(CODE_FALLBACK, 'Courier New', 'modern', 'fixed') +
      `</w:fonts>`;
  }

  function docxNumbering() {
    return XML_DECL + `<w:numbering ${W_NS}>` +
      `<w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/>` +
      `<w:numFmt w:val="bullet"/><w:lvlText w:val="&#8226;"/><w:lvlJc w:val="left"/>` +
      `<w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>` +
      `<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>`;
  }

  /* buildDocx(doc) -> Uint8Array
   *
   * doc = {
   *   title, subtitle,
   *   blocks: [
   *     { t:'heading', level:1|2|3, text }
   *     { t:'para',    text }
   *     { t:'bullets', items:[string] }
   *     { t:'table',   head:[string], rows:[[string]], widths:[number] }
   *     { t:'code',    text }
   *     { t:'callout', kind:'note'|'warn', title, text }
   *     { t:'pagebreak' }
   *   ]
   * }
   */
  function buildDocx(doc) {
    const body = [];

    if (doc.title) {
      body.push(wPara(doc.title, { style: 'Title' }));
      if (doc.subtitle) body.push(wPara(doc.subtitle, { style: 'Subtitle' }));
    }

    (doc.blocks || []).forEach(b => {
      switch (b.t) {
        case 'heading':
          body.push(wPara(b.text, { style: 'Heading' + (b.level || 1) }));
          break;
        case 'para':
          body.push(wPara(b.text, {}));
          break;
        case 'bullets':
          (b.items || []).forEach(i => body.push(wPara(i, { bullet: true })));
          break;
        case 'table':
          body.push(wTable(b.head, b.rows || [], b.widths));
          // Word merges consecutive tables that are not separated by a
          // paragraph, which silently corrupts the layout.
          body.push(wPara('', { spaceAfter: 120 }));
          break;
        case 'code':
          body.push(wPanel(
            String(b.text || '').split('\n').map(l => wPara(l, { style: 'Code' })).join(''),
            CODE_BG, BORDER));
          body.push(wPara('', { spaceAfter: 120 }));
          break;
        case 'callout': {
          const warn = b.kind === 'warn';
          body.push(wPanel(
            wPara(b.title, { bold: true, color: NAVY }) + wPara(b.text, {}),
            warn ? WARN_BG : NOTE_BG, warn ? WARN_EDGE : NOTE_EDGE));
          body.push(wPara('', { spaceAfter: 120 }));
          break;
        }
        case 'pagebreak':
          body.push(W_PAGE_BREAK);
          break;
        default:
          break;
      }
    });

    // A4 portrait with 2cm margins, in twentieths of a point.
    const sect = `<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>` +
      `<w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567"/></w:sectPr>`;

    const files = [
      {
        name: '[Content_Types].xml', content: XML_DECL +
          `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
          `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
          `<Default Extension="xml" ContentType="application/xml"/>` +
          `<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>` +
          `<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>` +
          `<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>` +
          `<Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>` +
          `</Types>`
      },
      {
        name: '_rels/.rels', content: XML_DECL +
          `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
          `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>` +
          `</Relationships>`
      },
      {
        name: 'word/_rels/document.xml.rels', content: XML_DECL +
          `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
          `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>` +
          `<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>` +
          `<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml"/>` +
          `</Relationships>`
      },
      { name: 'word/styles.xml', content: docxStyles() },
      { name: 'word/numbering.xml', content: docxNumbering() },
      { name: 'word/fontTable.xml', content: docxFontTable() },
      {
        name: 'word/document.xml', content: XML_DECL +
          `<w:document ${W_NS}><w:body>${body.join('')}${sect}</w:body></w:document>`
      }
    ];

    return zipStore(files);
  }

  // ── PowerPoint ─────────────────────────────────────────────────────────────
  const A_NS = 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"';
  const P_NS = 'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"';
  const R_NS = 'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';

  const EMU_W = 12192000;          // 13.333in — 16:9
  const EMU_H = 6858000;           // 7.5in
  const IN = 914400;

  function aPara(text, o) {
    const opts = o || {};
    const props = [];
    if (opts.size) props.push(`sz="${Math.round(opts.size * 100)}"`);
    if (opts.bold) props.push('b="1"');
    const bullet = opts.bullet
      ? `<a:buFont typeface="Arial"/><a:buChar char="&#8226;"/>`
      : '<a:buNone/>';
    const indent = opts.bullet ? ' marL="285750" indent="-285750"' : '';
    const color = `<a:solidFill><a:srgbClr val="${opts.color || FG}"/></a:solidFill>`;
    const font = `<a:latin typeface="${opts.font || BODY_FONT}"/>`;
    return `<a:p><a:pPr${indent}>${bullet}</a:pPr>` +
      `<a:r><a:rPr lang="en-US" ${props.join(' ')} dirty="0">${color}${font}</a:rPr>` +
      `<a:t>${xmlEsc(text)}</a:t></a:r></a:p>`;
  }

  function shape(id, name, x, y, cx, cy, paras, fill) {
    const bg = fill ? `<a:solidFill><a:srgbClr val="${fill}"/></a:solidFill>` : '<a:noFill/>';
    return `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="${xmlEsc(name)}"/>` +
      `<p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr/></p:nvSpPr>` +
      `<p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm>` +
      `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>${bg}</p:spPr>` +
      `<p:txBody><a:bodyPr wrap="square" lIns="91440" tIns="45720" rIns="91440" bIns="45720">` +
      `<a:normAutofit/></a:bodyPr><a:lstStyle/>${paras}</p:txBody></p:sp>`;
  }

  function slideXml(s) {
    const shapes = [];
    let id = 2;

    // Gold rule under the title, the deck's one piece of brand furniture.
    shapes.push(
      `<p:sp><p:nvSpPr><p:cNvPr id="${id++}" name="accent"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>` +
      `<p:spPr><a:xfrm><a:off x="${Math.round(0.6 * IN)}" y="${Math.round(1.32 * IN)}"/>` +
      `<a:ext cx="${Math.round(1.6 * IN)}" cy="${Math.round(0.055 * IN)}"/></a:xfrm>` +
      `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>` +
      `<a:solidFill><a:srgbClr val="${GOLD}"/></a:solidFill></p:spPr>` +
      `<p:txBody><a:bodyPr/><a:lstStyle/><a:p/></p:txBody></p:sp>`
    );

    const isTitle = s.layout === 'title';
    shapes.push(shape(id++, 'Title',
      Math.round(0.6 * IN), Math.round(isTitle ? 2.4 * IN : 0.45 * IN),
      Math.round(12 * IN), Math.round(isTitle ? 1.2 * IN : 0.8 * IN),
      aPara(s.title || '', { size: isTitle ? 40 : 28, bold: true, color: NAVY })));

    if (s.subtitle) {
      shapes.push(shape(id++, 'Subtitle',
        Math.round(0.6 * IN), Math.round(isTitle ? 3.7 * IN : 1.45 * IN),
        Math.round(12 * IN), Math.round(0.6 * IN),
        aPara(s.subtitle, { size: isTitle ? 18 : 14, color: FG_LIGHT })));
    }

    if (s.bullets && s.bullets.length) {
      shapes.push(shape(id++, 'Body',
        Math.round(0.6 * IN), Math.round(1.6 * IN),
        Math.round(12 * IN), Math.round(5.2 * IN),
        s.bullets.map(b => {
          const text = typeof b === 'string' ? b : b.text;
          const sub = typeof b === 'object' && b.sub;
          return aPara(text, { size: sub ? 13 : 16, bullet: true, color: sub ? FG_LIGHT : FG });
        }).join('')));
    }

    if (s.table && s.table.rows) {
      const head = s.table.head || [];
      const rows = s.table.rows;
      const cols = Math.max(head.length, ...rows.map(r => r.length));
      const width = Math.round(12 * IN);
      const colW = Math.floor(width / cols);
      const rowH = Math.round(0.36 * IN);

      const cell = (text, isHead, alt) => {
        const fillHex = isHead ? NAVY : (alt ? ROW_ALT : 'FFFFFF');
        return `<a:tc><a:txBody><a:bodyPr/><a:lstStyle/>` +
          aPara(text == null ? '' : text, {
            size: isHead ? 11 : 10, bold: isHead, color: isHead ? 'FFFFFF' : FG
          }) +
          `</a:txBody><a:tcPr marL="45720" marR="45720" marT="27432" marB="27432">` +
          `<a:solidFill><a:srgbClr val="${fillHex}"/></a:solidFill></a:tcPr></a:tc>`;
      };

      const trs = [];
      if (head.length) {
        trs.push(`<a:tr h="${rowH}">${head.map(h => cell(h, true)).join('')}</a:tr>`);
      }
      rows.forEach((r, i) => {
        const cells = [];
        for (let c = 0; c < cols; c++) cells.push(cell(r[c], false, i % 2 === 1));
        trs.push(`<a:tr h="${rowH}">${cells.join('')}</a:tr>`);
      });

      shapes.push(
        `<p:graphicFrame><p:nvGraphicFramePr><p:cNvPr id="${id++}" name="Table"/>` +
        `<p:cNvGraphicFramePr><a:graphicFrameLocks noGrp="1"/></p:cNvGraphicFramePr><p:nvPr/></p:nvGraphicFramePr>` +
        `<p:xfrm><a:off x="${Math.round(0.6 * IN)}" y="${Math.round(1.7 * IN)}"/>` +
        `<a:ext cx="${width}" cy="${rowH * trs.length}"/></p:xfrm>` +
        `<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table">` +
        `<a:tbl><a:tblPr firstRow="1" bandRow="1"/><a:tblGrid>` +
        Array.from({ length: cols }, () => `<a:gridCol w="${colW}"/>`).join('') +
        `</a:tblGrid>${trs.join('')}</a:tbl></a:graphicData></a:graphic></p:graphicFrame>`
      );
    }

    return XML_DECL +
      `<p:sld ${A_NS} ${P_NS} ${R_NS}><p:cSld><p:spTree>` +
      `<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
      `<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/>` +
      `<a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>` +
      shapes.join('') +
      `</p:spTree></p:cSld><p:clrMapOvr><a:overrideClrMapping bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2"` +
      ` accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5"` +
      ` accent6="accent6" hlink="hlink" folHlink="folHlink"/></p:clrMapOvr></p:sld>`;
  }

  function notesXml(text) {
    return XML_DECL +
      `<p:notes ${A_NS} ${P_NS} ${R_NS}><p:cSld><p:spTree>` +
      `<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
      `<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/>` +
      `<a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>` +
      `<p:sp><p:nvSpPr><p:cNvPr id="2" name="Notes Placeholder"/>` +
      `<p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>` +
      `<p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr><p:spPr/>` +
      `<p:txBody><a:bodyPr/><a:lstStyle/>` +
      String(text).split('\n').map(l => aPara(l, { size: 12 })).join('') +
      `</p:txBody></p:sp></p:spTree></p:cSld></p:notes>`;
  }

  const THEME = XML_DECL +
    `<a:theme ${A_NS} name="PAN"><a:themeElements>` +
    `<a:clrScheme name="PAN"><a:dk1><a:srgbClr val="${FG}"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>` +
    `<a:dk2><a:srgbClr val="${NAVY}"/></a:dk2><a:lt2><a:srgbClr val="${ROW_ALT}"/></a:lt2>` +
    `<a:accent1><a:srgbClr val="${GOLD}"/></a:accent1><a:accent2><a:srgbClr val="${NAVY}"/></a:accent2>` +
    `<a:accent3><a:srgbClr val="${LINK}"/></a:accent3><a:accent4><a:srgbClr val="22C55E"/></a:accent4>` +
    `<a:accent5><a:srgbClr val="F59E0B"/></a:accent5><a:accent6><a:srgbClr val="EF4444"/></a:accent6>` +
    `<a:hlink><a:srgbClr val="${LINK}"/></a:hlink><a:folHlink><a:srgbClr val="004C99"/></a:folHlink></a:clrScheme>` +
    `<a:fontScheme name="PAN"><a:majorFont><a:latin typeface="${BODY_FONT}"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>` +
    `<a:minorFont><a:latin typeface="${BODY_FONT}"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme>` +
    `<a:fmtScheme name="PAN">` +
    `<a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill>` +
    `<a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst>` +
    `<a:lnStyleLst><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln>` +
    `<a:ln w="12700"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln>` +
    `<a:ln w="19050"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst>` +
    `<a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle>` +
    `<a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>` +
    `<a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill>` +
    `<a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst>` +
    `</a:fmtScheme></a:themeElements></a:theme>`;

  const SLIDE_LAYOUT = XML_DECL +
    `<p:sldLayout ${A_NS} ${P_NS} ${R_NS} type="blank" preserve="1"><p:cSld name="Blank"><p:spTree>` +
    `<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
    `<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/>` +
    `<a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>` +
    `</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`;

  const SLIDE_MASTER = XML_DECL +
    `<p:sldMaster ${A_NS} ${P_NS} ${R_NS}><p:cSld><p:spTree>` +
    `<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
    `<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/>` +
    `<a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>` +
    `</p:spTree></p:cSld>` +
    `<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2"` +
    ` accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>` +
    `<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst></p:sldMaster>`;

  const NOTES_MASTER = XML_DECL +
    `<p:notesMaster ${A_NS} ${P_NS} ${R_NS}><p:cSld><p:spTree>` +
    `<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
    `<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/>` +
    `<a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>` +
    `</p:spTree></p:cSld>` +
    `<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2"` +
    ` accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>` +
    `</p:notesMaster>`;

  /* buildPptx(deck) -> Uint8Array
   *
   * deck = { slides: [ {
   *   layout: 'title' | 'content',
   *   title, subtitle,
   *   bullets: [ string | {text, sub:true} ],
   *   table:   { head:[string], rows:[[string]] },
   *   notes:   string
   * } ] }
   */
  function buildPptx(deck) {
    const slides = deck.slides || [];
    const withNotes = slides.map((s, i) => (s.notes ? i + 1 : 0)).filter(Boolean);

    const files = [];

    const ct = [
      `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>`,
      `<Default Extension="xml" ContentType="application/xml"/>`,
      `<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>`,
      `<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>`,
      `<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>`,
      `<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>`
    ];
    if (withNotes.length) {
      ct.push(`<Override PartName="/ppt/notesMasters/notesMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesMaster+xml"/>`);
    }
    slides.forEach((s, i) => {
      ct.push(`<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`);
    });
    withNotes.forEach(n => {
      ct.push(`<Override PartName="/ppt/notesSlides/notesSlide${n}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml"/>`);
    });

    files.push({
      name: '[Content_Types].xml',
      content: XML_DECL + `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">${ct.join('')}</Types>`
    });

    files.push({
      name: '_rels/.rels', content: XML_DECL +
        `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
        `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>` +
        `</Relationships>`
    });

    // Presentation rels: master, then one per slide, then theme, then notes
    // master. Slide ids in presentation.xml must reference these exact ids.
    const presRels = [`<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>`];
    slides.forEach((s, i) => {
      presRels.push(`<Relationship Id="rId${i + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`);
    });
    const themeRid = slides.length + 2;
    presRels.push(`<Relationship Id="rId${themeRid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>`);
    if (withNotes.length) {
      presRels.push(`<Relationship Id="rId${themeRid + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="notesMasters/notesMaster1.xml"/>`);
    }
    files.push({
      name: 'ppt/_rels/presentation.xml.rels',
      content: XML_DECL + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${presRels.join('')}</Relationships>`
    });

    const sldIds = slides.map((s, i) => `<p:sldId id="${256 + i}" r:id="rId${i + 2}"/>`).join('');
    const notesMasterIdLst = withNotes.length
      ? `<p:notesMasterIdLst><p:notesMasterId r:id="rId${themeRid + 1}"/></p:notesMasterIdLst>` : '';
    files.push({
      name: 'ppt/presentation.xml', content: XML_DECL +
        `<p:presentation ${A_NS} ${P_NS} ${R_NS} saveSubsetFonts="1">` +
        `<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>` +
        notesMasterIdLst +
        `<p:sldIdLst>${sldIds}</p:sldIdLst>` +
        `<p:sldSz cx="${EMU_W}" cy="${EMU_H}"/><p:notesSz cx="${EMU_H}" cy="${EMU_W}"/>` +
        `</p:presentation>`
    });

    files.push({ name: 'ppt/theme/theme1.xml', content: THEME });
    files.push({ name: 'ppt/slideMasters/slideMaster1.xml', content: SLIDE_MASTER });
    files.push({
      name: 'ppt/slideMasters/_rels/slideMaster1.xml.rels', content: XML_DECL +
        `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
        `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>` +
        `<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>` +
        `</Relationships>`
    });
    files.push({ name: 'ppt/slideLayouts/slideLayout1.xml', content: SLIDE_LAYOUT });
    files.push({
      name: 'ppt/slideLayouts/_rels/slideLayout1.xml.rels', content: XML_DECL +
        `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
        `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>` +
        `</Relationships>`
    });

    if (withNotes.length) {
      files.push({ name: 'ppt/notesMasters/notesMaster1.xml', content: NOTES_MASTER });
      files.push({
        name: 'ppt/notesMasters/_rels/notesMaster1.xml.rels', content: XML_DECL +
          `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
          `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>` +
          `</Relationships>`
      });
    }

    slides.forEach((s, i) => {
      files.push({ name: `ppt/slides/slide${i + 1}.xml`, content: slideXml(s) });
      const rels = [`<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>`];
      if (s.notes) {
        rels.push(`<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide" Target="../notesSlides/notesSlide${i + 1}.xml"/>`);
        files.push({ name: `ppt/notesSlides/notesSlide${i + 1}.xml`, content: notesXml(s.notes) });
        files.push({
          name: `ppt/notesSlides/_rels/notesSlide${i + 1}.xml.rels`, content: XML_DECL +
            `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
            `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="../notesMasters/notesMaster1.xml"/>` +
            `<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="../slides/slide${i + 1}.xml"/>` +
            `</Relationships>`
        });
      }
      files.push({
        name: `ppt/slides/_rels/slide${i + 1}.xml.rels`,
        content: XML_DECL + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${rels.join('')}</Relationships>`
      });
    });

    return zipStore(files);
  }

  // ── Download ───────────────────────────────────────────────────────────────
  const MIME = {
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  };

  function triggerDownload(bytes, filename, mime) {
    const ext = String(filename).split('.').pop();
    const blob = new Blob([bytes], { type: mime || MIME[ext] || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  return {
    crc32, zipStore, xmlEsc,
    buildXlsx, buildDocx, buildPptx,
    triggerDownload, MIME,
    COLORS: { NAVY, GOLD, LINK, FG, FG_LIGHT, BORDER, ROW_ALT }
  };
});
