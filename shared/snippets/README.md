# Shared content snippets

Blocks of guide content that more than one guide needs, held in one place and
copied into each guide by a script. The copy is committed, so a published page
is a complete static file: search indexing, printing, and offline viewing all
keep working.

This exists to serve the self-contained charter. A guide must never tell the
reader to go and do a phase of a different guide and come back. If two guides
need the same procedure, both get the procedure.

## Running it

```bash
node docs/shared/scripts/sync-shared-content.js            # write
node docs/shared/scripts/sync-shared-content.js --check    # exit 1 if stale
node docs/shared/scripts/sync-shared-content.js --list     # inventory + usage
node docs/shared/scripts/sync-shared-content.js docs/guides/ai-gateway
```

`hooks/pre-commit` and `.github/workflows/shared-content-check.yml` both run
`--check`, so drift cannot reach `main`.

## How a guide uses a snippet

Put a marker pair where the content belongs. The script fills the space between
them and rewrites it on every run.

```html
<!-- shared:begin id="aigw-support-channel"
     vars='{
       "channelNote": "Every later step that says \"contact the team\" means this channel."
     }' -->
<!-- shared:end -->
```

In markdown the same markers work, and they may sit inside a blockquote. Put the
`> ` on the marker lines and the generated lines inherit it:

```markdown
> <!-- shared:begin id="aigw-credentials-request" -->
> <!-- shared:end -->
```

The script picks the `.html` or `.md` variant of the snippet from the host
file's extension. A snippet used in both needs both files.

Everything between the markers is generated. Edit the snippet, not the guide.

## Writing a snippet

One file per variant: `docs/shared/snippets/<id>.html` and `<id>.md`. An
optional metadata header documents it and is stripped from the output:

```html
<!-- @snippet
  title: Support channel and Organisation ID
  desc:  How to reach PANW for credentials, plus where to find the Org ID.
  vars:  channelNote
-->
```

Substitute with `{{varName}}`. A `{{var}}` with no supplied value is a hard
error rather than a literal `{{var}}` on the published page. Supplying a var the
snippet does not use is a warning.

## The rule that makes this work

**A snippet holds only what is genuinely identical for every consumer.**
Anything that differs becomes a short `{{var}}` or stays in the host guide.

This is not a style preference. The first candidate for extraction — Phase 1 of
the AI Gateway deployment guide — contained forward references like
`href="#deployment-model"` and "Phase 2 works from the left navigation". Copied
verbatim into the Kubernetes guide, those become broken anchors and instructions
about a phase that does not exist there: the exact failure this mechanism is
supposed to prevent. They are vars now.

So before extracting, read the block as a reader of each consuming guide and
check for:

- anchors (`href="#..."`) that resolve only in the source guide
- step and phase numbers (`Step 1.3`, `Phase 2`) that differ per guide
- image paths, which differ per guide directory (use an `imgBase` var)
- "next you will..." sentences that assume the source guide's running order

If most of a block is host-specific, it is not shared content. Leave it.

## Checks after a change

```bash
node docs/shared/scripts/sync-shared-content.js
git diff                                                   # review every host
node docs/shared/scripts/sync-shared-content.js --check    # idempotent?
grep -rn '{{' docs/guides/<changed guide>                  # no stray vars
```

Then open each consuming guide and confirm the generated block reads correctly
in that guide's context, not just in the one it came from.
