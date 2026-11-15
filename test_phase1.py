import os
import re

# 1. Verify existence of all created files
files_to_check = [
    'BEIGE_PROJECT_AUDIT.md',
    'BEIGE_DESIGN_SYSTEM.md',
    'BEIGE_IMPLEMENTATION_STATUS.md',
    'index.html',
    'css/tokens.css',
    'css/base.css',
    'css/components.css',
    'css/sections.css',
    'js/main.js',
    'js/shortlist.js'
]
missing = [f for f in files_to_check if not os.path.exists(f)]
if missing:
    print('ERROR: Missing files:', missing)
else:
    print('PASS: All primary phase 1 deliverable files exist.')

# 2. Check image paths in index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

img_srcs = re.findall(r'src=["\']([^"\']+)["\']', html)
missing_imgs = [src for src in img_srcs if not src.startswith('http') and not os.path.exists(src)]
if missing_imgs:
    print('ERROR: Missing images in HTML:', missing_imgs)
else:
    print(f'PASS: All {len(img_srcs)} local images in index.html exist on disk.')

# 3. Check CSS background image paths
css_bg_imgs = []
for css_file in ['css/sections.css', 'css/components.css']:
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    bgs = re.findall(r'url\(["\']?\.\./([^"\'\)]+)["\']?\)', content)
    for bg in bgs:
        full_p = bg.split('?')[0]
        if not os.path.exists(full_p):
            css_bg_imgs.append(full_p)
if css_bg_imgs:
    print('ERROR: Missing CSS background images:', css_bg_imgs)
else:
    print('PASS: All CSS background image paths exist on disk.')

# 4. Check that no 'unsplash.com' or 'Men' division slips into index.html
if 'unsplash' in html:
    print('ERROR: Unsplash stock image found in index.html')
else:
    print('PASS: Zero Unsplash stock images found in index.html.')

# Check for men's division keywords in talent sections
if re.search(r'>\s*Men\s*<', html, re.IGNORECASE):
    print('ERROR: Men category found in index.html')
else:
    print('PASS: Zero Men category found in index.html (Strictly women-only models).')

# 5. Check JS syntax with node
import subprocess
try:
    res1 = subprocess.run(['node', '--check', 'js/shortlist.js'], capture_output=True, text=True)
    res2 = subprocess.run(['node', '--check', 'js/main.js'], capture_output=True, text=True)
    if res1.returncode == 0 and res2.returncode == 0:
        print('PASS: JavaScript syntax check passed cleanly via Node.')
    else:
        print('JS Error:', res1.stderr, res2.stderr)
except Exception as e:
    print('Node check skipped/error:', e)
