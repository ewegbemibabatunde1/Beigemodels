import os
import re
import subprocess

print("=== VERIFYING BEIGE MODEL MANAGEMENT PROJECT ===")

# 1. Check all route index files
routes = [
    'index.html',
    'about/index.html',
    'services/index.html',
    'contact/index.html',
    'legal/index.html',
    'journal/index.html',
    'apply/index.html',
    'book/index.html',
    '404.html',
    'models/index.html',
    'models/ada/index.html',
    'models/aisha/index.html',
    'models/anastasia/index.html',
    'models/becky/index.html',
    'models/belle/index.html',
    'models/debby/index.html',
    'models/ruth/index.html'
]

missing_routes = [r for r in routes if not os.path.exists(r)]
if missing_routes:
    print("ERROR: Missing routes:", missing_routes)
    exit(1)
print(f"PASS: All {len(routes)} required website routes exist.")

# 2. Check CSS files
css_files = [
    'css/tokens.css',
    'css/base.css',
    'css/components.css',
    'css/sections.css',
    'css/interior.css',
    'css/profiles.css'
]
missing_css = [c for c in css_files if not os.path.exists(c)]
if missing_css:
    print("ERROR: Missing CSS files:", missing_css)
    exit(1)
print(f"PASS: All {len(css_files)} CSS files exist.")

# 3. Check JS files with Node
js_files = ['js/site-config.js', 'js/main.js', 'js/profile.js', 'js/roster.js', 'js/forms.js']
for js in js_files:
    if not os.path.exists(js):
        print(f"ERROR: Missing JS file: {js}")
        exit(1)
    res = subprocess.run(['node', '--check', js], capture_output=True, text=True)
    if res.returncode != 0:
        print(f"ERROR in {js}:", res.stderr)
        exit(1)
print(f"PASS: All {len(js_files)} JS files exist and passed syntax validation.")

# 4. Check image references in all HTML files
total_images_checked = 0
for r in routes:
    with open(r, 'r', encoding='utf-8') as f:
        content = f.read()
    r_dir = os.path.dirname(r)
    srcs = re.findall(r'src=["\']([^"\']+)["\']', content)
    for src in srcs:
        if src.startswith('http') or src.startswith('data:'):
            continue
        total_images_checked += 1
        resolved = os.path.normpath(os.path.join(r_dir, src))
        if not os.path.exists(resolved):
            print(f"ERROR in {r}: Image not found on disk: {src} -> {resolved}")
            exit(1)

print(f"PASS: All {total_images_checked} image references across all pages exist on disk.")

# 5. Check CSS image references
for c in css_files:
    with open(c, 'r', encoding='utf-8') as f:
        content = f.read()
    c_dir = os.path.dirname(c)
    bgs = re.findall(r'url\(["\']?([^"\'\)]+)["\']?\)', content)
    for bg in bgs:
        if bg.startswith('http') or bg.startswith('data:'):
            continue
        resolved = os.path.normpath(os.path.join(c_dir, bg.split('?')[0]))
        if not os.path.exists(resolved):
            print(f"ERROR in {c}: Background image not found: {bg} -> {resolved}")
            exit(1)
print("PASS: All CSS background image assets exist on disk.")

print("=== ALL VERIFICATION CHECKS PASSED WITH EXCELLENCE ===")
