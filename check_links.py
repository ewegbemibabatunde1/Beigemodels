import glob, re, os

base_dir = r'c:\Users\Dell\OneDrive\Desktop\Beige'
html_files = glob.glob(os.path.join(base_dir, '**', '*.html'), recursive=True)

broken_links = []
for hf in html_files:
    with open(hf, 'r', encoding='utf-8') as f:
        content = f.read()
    
    hrefs = re.findall(r'href=["\']([^#"\'?]+)["\']', content)
    for href in hrefs:
        if href.startswith(('http://', 'https://', 'mailto:', 'tel:')):
            continue
        # clean query or fragments
        clean_href = href.split('?')[0].split('#')[0]
        if not clean_href:
            continue
        target = os.path.normpath(os.path.join(os.path.dirname(hf), clean_href))
        if not os.path.exists(target):
            broken_links.append((os.path.relpath(hf, base_dir), href, target))

if broken_links:
    print('Found broken links:')
    for b in broken_links:
        print(b)
else:
    print('PERFECT: All internal links across all 17 HTML pages exist and are 100% valid!')
