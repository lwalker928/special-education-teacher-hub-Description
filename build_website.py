"""Embed local assets so index.html also works as a standalone download."""

from pathlib import Path
import re

root = Path(__file__).resolve().parent
page = root / "index.html"
html = page.read_text()
css = (root / "assets/styles.css").read_text()
js = "\n".join((root / name).read_text() for name in ["assets/hub-data.js", "assets/legal-data.js", "assets/app.js", "assets/hub.js"])

style_pattern = r'  <!-- BEGIN EMBEDDED STYLES -->.*?<!-- END EMBEDDED STYLES -->|  <link rel="stylesheet" href="assets/styles.css">'
html, style_count = re.subn(
    style_pattern,
    lambda _: f"  <!-- BEGIN EMBEDDED STYLES -->\n  <style>\n{css}\n  </style>\n  <!-- END EMBEDDED STYLES -->",
    html,
    flags=re.S,
)
html = html.replace('  <script src="assets/app.js" defer></script>\n', '')
script_pattern = r'  <!-- BEGIN EMBEDDED SCRIPT -->.*?<!-- END EMBEDDED SCRIPT -->'
script = f"  <!-- BEGIN EMBEDDED SCRIPT -->\n  <script>\n{js}\n  </script>\n  <!-- END EMBEDDED SCRIPT -->"
if re.search(script_pattern, html, flags=re.S):
    html, script_count = re.subn(script_pattern, lambda _: script, html, flags=re.S)
else:
    script_count = html.count('</body>')
    html = html.replace('</body>', f'{script}\n</body>')
if style_count != 1 or script_count != 1:
    raise SystemExit("Expected one stylesheet and one script block; no files changed.")
page.write_text(html)
print("Built standalone index.html with embedded styles and interactive resources.")
