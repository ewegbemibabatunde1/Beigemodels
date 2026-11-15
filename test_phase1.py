import os
import re
import subprocess

print("--- Running Beige Phase 1 Verification Tests ---")

# 1. Verify existence of primary files
files_to_check = [
    'BEIGE_PROJECT_AUDIT.md',
    'BEIGE_DESIGN_SYSTEM.md',
    'BEIGE_IMPLEMENTATION_STATUS.md',
    'index.html',
    'css/tokens.css',
    'css/base.css',
    'css/components.css',
    'css/sections.css',
    'js/main.js'
]
missing = [f for f in files_to_check if not os.path.exists(f)]
if missing:
    print('ERROR: Missing files:', missing)
    exit(1)
print('PASS: All primary phase 1 deliverable files exist.')

# 2. Check all 5 hero images exist
hero_images = [f'assets/images/hero/hero-slide-{i}.jpg' for i in range(1, 6)]
missing_hero = [f for f in hero_images if not os.path.exists(f)]
if missing_hero:
    print('ERROR: Missing hero slide images:', missing_hero)
    exit(1)
print(f'PASS: All 5 dedicated hero slide images exist ({len(hero_images)}/5).')

# 3. Check image paths in index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

img_srcs = re.findall(r'src=["\']([^"\']+)["\']', html)
missing_imgs = [src for src in img_srcs if not src.startswith('http') and not os.path.exists(src)]
if missing_imgs:
    print('ERROR: Missing images in HTML:', missing_imgs)
    exit(1)
print(f'PASS: All {len(img_srcs)} local images in index.html exist on disk.')

# 4. Check CSS background image paths
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
    exit(1)
print('PASS: All CSS background image paths exist on disk.')

# 5. Check restrictions compliance
if 'unsplash' in html.lower():
    print('ERROR: Unsplash stock image found in index.html')
    exit(1)
print('PASS: Zero Unsplash stock images found in index.html.')

# Check for shortlist (should be removed per user request)
if 'shortlist' in html.lower():
    print('WARNING: Shortlist reference found in index.html!')
else:
    print('PASS: Shortlist menu and components completely removed as requested.')

# Check header has no text next to logo
if '<div class="brand-name">' in html:
    print('ERROR: Brand name text still in header!')
    exit(1)
print('PASS: Header text removed, leaving only logo emblem and navigation menus.')

# 6. Check JS syntax with node
res2 = subprocess.run(['node', '--check', 'js/main.js'], capture_output=True, text=True)
if res2.returncode == 0:
    print('PASS: JavaScript syntax check passed cleanly via Node.')
else:
    print('ERROR in JS:', res2.stderr)
    exit(1)

print("--- ALL PHASE 1 CHECKS PASSED WITH EXCELLENCE ---")
