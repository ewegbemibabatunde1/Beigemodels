import os
import glob
import re

base_dir = r"c:\Users\Dell\OneDrive\Desktop\Beige"

# 1. Update interior pages headers
interior_routes = [
    "about/index.html",
    "services/index.html",
    "journal/index.html",
    "contact/index.html",
    "book/index.html",
    "apply/index.html",
    "legal/index.html",
    "models/index.html"
]

for route in interior_routes:
    fpath = os.path.join(base_dir, route.replace("/", os.sep))
    if not os.path.exists(fpath):
        continue
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # Add id="mainNav" if missing
    content = content.replace('<nav aria-label="Main Navigation" class="main-nav">', '<nav aria-label="Main Navigation" class="main-nav" id="mainNav">')
    content = content.replace('<nav aria-label="Main navigation" class="main-nav">', '<nav aria-label="Main navigation" class="main-nav" id="mainNav">')

    # Add menuToggle button inside header-right if not already there
    if 'id="menuToggle"' not in content:
        # replace closing </div> of header-right
        pattern = r'(<div class="header-right">\s*<a class="btn sm header-cta"[^>]*>.*?</a>\s*)</div>'
        replacement = r'\1  <button aria-expanded="false" aria-label="Open mobile navigation menu" class="menu-toggle" id="menuToggle">☰</button>\n</div>'
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated header mobile nav in {route}")

print("Interior pages headers updated!")
