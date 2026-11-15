import os
import glob
import re

base_dir = r"c:\Users\Dell\OneDrive\Desktop\Beige"

# 1. Ensure editorial-motion.js is included in all 17 routes
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

for hf in html_files:
    rel_path = os.path.relpath(hf, base_dir)
    depth = rel_path.count(os.sep)
    prefix = "../" * depth if depth > 0 else ""
    script_tag = f'<script src="{prefix}js/editorial-motion.js"></script>'
    
    with open(hf, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Check if editorial-motion.js is already included
    if "editorial-motion.js" not in content:
        # insert before </body>
        content = content.replace("</body>", f"{script_tag}\n</body>")
        with open(hf, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Added editorial-motion.js to {rel_path}")

# 2. Add .reveal to cards in interior pages
# In interior.css pages (about, services, contact, book, apply, journal, legal)
def add_reveal_classes(file_rel, replacements):
    fpath = os.path.join(base_dir, file_rel)
    if not os.path.exists(fpath):
        return
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    changed = False
    for target, replacement in replacements.items():
        if target in content:
            content = content.replace(target, replacement)
            changed = True
    
    if changed:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Added reveal animations to {file_rel}")

# About page
add_reveal_classes("about/index.html", {
    '<section class="interior-top">': '<section class="interior-top reveal">',
    '<article class="interior-card">': '<article class="interior-card reveal">',
    '<div class="interior-actions">': '<div class="interior-actions reveal">'
})

# Services page
add_reveal_classes("services/index.html", {
    '<section class="interior-top">': '<section class="interior-top reveal">',
    '<article class="interior-card">': '<article class="interior-card reveal">',
    '<div class="interior-note">': '<div class="interior-note reveal">'
})

# Journal page
add_reveal_classes("journal/index.html", {
    '<section class="interior-top">': '<section class="interior-top reveal">',
    '<article class="journal-card">': '<article class="journal-card reveal">'
})

# Contact page
add_reveal_classes("contact/index.html", {
    '<section class="interior-top">': '<section class="interior-top reveal">',
    '<div class="inquiry-router-card">': '<div class="inquiry-router-card reveal">',
    '<div class="contact-panel">': '<div class="contact-panel reveal">'
})

# Book page
add_reveal_classes("book/index.html", {
    '<section class="interior-top">': '<section class="interior-top reveal">',
    '<div class="editorial-form-wrap" id="bookingFormWrap">': '<div class="editorial-form-wrap reveal" id="bookingFormWrap">',
    '<div class="booking-assurance-card">': '<div class="booking-assurance-card reveal">'
})

# Apply page
add_reveal_classes("apply/index.html", {
    '<section class="interior-top">': '<section class="interior-top reveal">',
    '<div class="safety-warning-banner">': '<div class="safety-warning-banner reveal">',
    '<div class="guideline-item">': '<div class="guideline-item reveal">',
    '<div class="polaroid-card">': '<div class="polaroid-card reveal">',
    '<div class="editorial-form-wrap" id="applicationFormWrap">': '<div class="editorial-form-wrap reveal" id="applicationFormWrap">',
    '<details class="faq-item"': '<details class="faq-item reveal"'
})

# Models index page
add_reveal_classes("models/index.html", {
    '<div class="roster-header">': '<div class="roster-header reveal">',
    '<div class="roster-controls">': '<div class="roster-controls reveal">',
    '<a class="roster-card"': '<a class="roster-card reveal"'
})

# 7 Model profile pages
model_slugs = ["ada", "aisha", "anastasia", "becky", "belle", "debby", "ruth"]
for slug in model_slugs:
    add_reveal_classes(f"models/{slug}/index.html", {
        '<div class="profile-copy">': '<div class="profile-copy reveal">',
        '<div class="profile-main-image">': '<div class="profile-main-image reveal">',
        '<div class="compcard-box">': '<div class="compcard-box reveal">',
        '<figure>': '<figure class="reveal">',
        '<section class="profile-credits">': '<section class="profile-credits reveal">',
        '<section class="related-models">': '<section class="related-models reveal">',
        '<section class="profile-bottom"': '<section class="profile-bottom reveal"'
    })

print("Editorial motion successfully applied across all 17 routes!")
