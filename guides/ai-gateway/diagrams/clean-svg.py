"""Shrink and light-mode-pin the SVGs that `drawio -x -f svg` emits.

drawio writes a base64 PNG raster fallback alongside every <foreignObject>
text block (which is what makes the files 1.5-2.5 MB), and wraps every colour
in CSS light-dark() so the diagram inverts inside a dark-mode page. Neither is
wanted for a guide asset, so strip both.
"""
import re, sys, os

def strip_light_dark(s):
    """Replace light-dark(a, b) with a, handling nested parens like rgb(...)."""
    out, i = [], 0
    while True:
        j = s.find('light-dark(', i)
        if j == -1:
            out.append(s[i:]); break
        out.append(s[i:j])
        k = j + len('light-dark(')
        depth, start, first = 1, k, None
        while k < len(s):
            c = s[k]
            if c == '(': depth += 1
            elif c == ')':
                depth -= 1
                if depth == 0: break
            elif c == ',' and depth == 1 and first is None:
                first = s[start:k]
            k += 1
        out.append((first if first is not None else s[start:k]).strip())
        i = k + 1
    return ''.join(out)

for path in sys.argv[1:]:
    before = os.path.getsize(path)
    s = open(path).read()
    s = re.sub(r'<image[^>]*xlink:href="data:image/png;base64,[^"]*"[^>]*/>', '', s)
    s = s.replace('color-scheme: light dark;', 'color-scheme: light;')
    s = s.replace('background: transparent; background-color: transparent;',
                  'background: #ffffff; background-color: #ffffff;')
    s = strip_light_dark(s)
    open(path, 'w').write(s)
    print(f"{os.path.basename(path):34s} {before/1024:8.1f} KB -> {os.path.getsize(path)/1024:6.1f} KB"
          f"  base64:{s.count('base64,')}  light-dark:{s.count('light-dark(')}")
