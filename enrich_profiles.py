import os
import re

MODELS_DATA = {
    "ada": {
        "name": "Ada",
        "category": "Commercial · Beauty · Editorial",
        "intro": "A versatile presence redefining elegance across beauty campaigns, commercial productions, and high-fashion editorial.",
        "stats": {
            "Height": "5'10\" / 178cm",
            "Bust": "32\" / 81cm",
            "Waist": "24\" / 61cm",
            "Hips": "35\" / 89cm",
            "Shoe": "39 EU / 8.5 US",
            "Eyes": "Dark Brown",
            "Hair": "Black Natural",
            "Base": "Lagos / Int'l"
        },
        "credits": [
            ("Lighthill Photography", "Lead Editorial Portrait Campaign"),
            ("Beauty by Dii", "Clean Skin & Glow Beauty Series"),
            ("Lagos Fashion Series", "National Commercial Print")
        ],
        "related": [
            {"name": "Aisha", "cat": "Editorial · High Glamour", "path": "../aisha/index.html", "img": "../../assets/images/models/aisha-editorial-01.jpg"},
            {"name": "Belle", "cat": "Beauty · New Face", "path": "../belle/index.html", "img": "../../assets/images/models/belle-editorial-01.jpg"},
            {"name": "Becky", "cat": "Commercial · Beauty", "path": "../becky/index.html", "img": "../../assets/images/models/becky-commercial-01.jpg"}
        ]
    },
    "aisha": {
        "name": "Aisha",
        "category": "Editorial · High Glamour · Runway",
        "intro": "An expressive, statuesque editorial presence commanding international runway presentations and luxury beauty campaigns.",
        "stats": {
            "Height": "5'11\" / 180cm",
            "Bust": "33\" / 84cm",
            "Waist": "24\" / 61cm",
            "Hips": "36\" / 91cm",
            "Shoe": "40 EU / 9 US",
            "Eyes": "Dark Brown",
            "Hair": "Black",
            "Base": "Lagos / Int'l"
        },
        "credits": [
            ("Finessed by SB", "Haute Glamour Beauty Series"),
            ("Beat by AB", "Luxury Cosmetics & Glow Campaign"),
            ("Lighthill Series", "Monochrome High Fashion Archive")
        ],
        "related": [
            {"name": "Anastasia", "cat": "Runway · High Fashion", "path": "../anastasia/index.html", "img": "../../assets/images/models/anastasia-editorial-01.jpg"},
            {"name": "Ada", "cat": "Commercial · Editorial", "path": "../ada/index.html", "img": "../../assets/images/models/ada-editorial-01.jpg"},
            {"name": "Belle", "cat": "Beauty · Editorial", "path": "../belle/index.html", "img": "../../assets/images/models/belle-editorial-01.jpg"}
        ]
    },
    "anastasia": {
        "name": "Anastasia",
        "category": "Runway · High Fashion · Editorial",
        "intro": "Commanding proportions and razor-sharp poise for international catwalks, couture lookbooks, and avant-garde editorials.",
        "stats": {
            "Height": "5'11\" / 180cm",
            "Bust": "32\" / 81cm",
            "Waist": "23.5\" / 60cm",
            "Hips": "34.5\" / 88cm",
            "Shoe": "40 EU / 9 US",
            "Eyes": "Dark Brown",
            "Hair": "Black Braided",
            "Base": "Lagos / Paris / Milan"
        },
        "credits": [
            ("Glam Drop Beauty", "High Fashion Sculptural Editorial"),
            ("Dowsk Studio", "Monochrome Runway Archive"),
            ("Lagos Fashion Week", "Runway Designer Showcase")
        ],
        "related": [
            {"name": "Aisha", "cat": "Editorial · High Glamour", "path": "../aisha/index.html", "img": "../../assets/images/models/aisha-editorial-01.jpg"},
            {"name": "Becky", "cat": "Commercial · Beauty", "path": "../becky/index.html", "img": "../../assets/images/models/becky-commercial-01.jpg"},
            {"name": "Ada", "cat": "Commercial · Editorial", "path": "../ada/index.html", "img": "../../assets/images/models/ada-editorial-01.jpg"}
        ]
    },
    "becky": {
        "name": "Becky",
        "category": "Commercial · Beauty · Lookbook",
        "intro": "Warm, radiant elegance delivering high commercial engagement across luxury bridal, skincare, and designer lookbooks.",
        "stats": {
            "Height": "5'9\" / 175cm",
            "Bust": "34\" / 86cm",
            "Waist": "25\" / 63.5cm",
            "Hips": "36\" / 91cm",
            "Shoe": "39 EU / 8.5 US",
            "Eyes": "Dark Brown",
            "Hair": "Dark Brown Wavy",
            "Base": "Lagos / Int'l"
        },
        "credits": [
            ("Maison Avadote Couture", "Bridal & Evening Lookbook Campaign"),
            ("Bernard Beauty Glam", "Radiant Skin Cosmetics Campaign"),
            ("Prime Style Magazine", "Commercial Fashion Editorial")
        ],
        "related": [
            {"name": "Debby", "cat": "Bridal Beauty · Glamour", "path": "../debby/index.html", "img": "../../assets/images/models/debby-commercial-01.jpg"},
            {"name": "Ruth", "cat": "Commercial Hair · Beauty", "path": "../ruth/index.html", "img": "../../assets/images/models/ruth-commercial-01.jpg"},
            {"name": "Belle", "cat": "Beauty · Editorial", "path": "../belle/index.html", "img": "../../assets/images/models/belle-editorial-01.jpg"}
        ]
    },
    "belle": {
        "name": "Belle",
        "category": "Beauty · Editorial · New Face",
        "intro": "A luminous, fresh editorial face with flawless skin and magnetic natural presence for beauty and magazine editorials.",
        "stats": {
            "Height": "5'9.5\" / 177cm",
            "Bust": "32\" / 81cm",
            "Waist": "24\" / 61cm",
            "Hips": "35\" / 89cm",
            "Shoe": "39 EU / 8.5 US",
            "Eyes": "Brown",
            "Hair": "Natural Afro Black",
            "Base": "Lagos"
        },
        "credits": [
            ("Mola Glamz Beauty", "Radiant Glow Cosmetics Campaign"),
            ("Highlightsby Editorial", "Natural Hair Portraiture Series"),
            ("Pan-African New Wave", "Fresh Faces Emerging Talent Showcase")
        ],
        "related": [
            {"name": "Ada", "cat": "Commercial · Editorial", "path": "../ada/index.html", "img": "../../assets/images/models/ada-editorial-01.jpg"},
            {"name": "Ruth", "cat": "Commercial Hair · Beauty", "path": "../ruth/index.html", "img": "../../assets/images/models/ruth-commercial-01.jpg"},
            {"name": "Aisha", "cat": "Editorial · High Glamour", "path": "../aisha/index.html", "img": "../../assets/images/models/aisha-editorial-01.jpg"}
        ]
    },
    "debby": {
        "name": "Debby",
        "category": "Commercial · Bridal Beauty · Glamour",
        "intro": "A striking bridal and luxury commercial talent with seasoned styling adaptability and exceptional screen presence.",
        "stats": {
            "Height": "5'8.5\" / 174cm",
            "Bust": "33\" / 84cm",
            "Waist": "25\" / 63.5cm",
            "Hips": "37\" / 94cm",
            "Shoe": "38.5 EU / 8 US",
            "Eyes": "Dark Brown",
            "Hair": "Black Sleek",
            "Base": "Lagos"
        },
        "credits": [
            ("Pretty Faces by Olivia", "Luxury Bridal Campaign"),
            ("Doje Signature", "Glamour Hair & Styling Editorial"),
            ("Adeoge Glam", "High-Profile Celebration Campaign")
        ],
        "related": [
            {"name": "Ruth", "cat": "Commercial Hair · Beauty", "path": "../ruth/index.html", "img": "../../assets/images/models/ruth-commercial-01.jpg"},
            {"name": "Becky", "cat": "Commercial · Lookbook", "path": "../becky/index.html", "img": "../../assets/images/models/becky-commercial-01.jpg"},
            {"name": "Ada", "cat": "Commercial · Editorial", "path": "../ada/index.html", "img": "../../assets/images/models/ada-editorial-01.jpg"}
        ]
    },
    "ruth": {
        "name": "Ruth",
        "category": "Commercial Hair · Beauty · New Face",
        "intro": "Distinctive natural features, radiant complexion, and premium hair modeling suitability for luxury brands.",
        "stats": {
            "Height": "5'9\" / 176cm",
            "Bust": "32\" / 81cm",
            "Waist": "24\" / 61cm",
            "Hips": "35\" / 89cm",
            "Shoe": "39 EU / 8.5 US",
            "Eyes": "Dark Brown",
            "Hair": "Natural Textured Black",
            "Base": "Lagos"
        },
        "credits": [
            ("Adeoge MUA Bridal", "Contemporary Bridal Beauty Campaign"),
            ("Tee Artistry Hair", "Commercial Natural Hair Feature"),
            ("Glow & Radiance", "Editorial Skincare Series")
        ],
        "related": [
            {"name": "Belle", "cat": "Beauty · New Face", "path": "../belle/index.html", "img": "../../assets/images/models/belle-editorial-01.jpg"},
            {"name": "Debby", "cat": "Bridal Beauty · Glamour", "path": "../debby/index.html", "img": "../../assets/images/models/debby-commercial-01.jpg"},
            {"name": "Becky", "cat": "Commercial · Lookbook", "path": "../becky/index.html", "img": "../../assets/images/models/becky-commercial-01.jpg"}
        ]
    }
}

def generate_compcard_html(stats):
    stats_html = "".join([
        f'<div class="compcard-stat"><span class="compcard-label">{k}</span><span class="compcard-val">{v}</span></div>'
        for k, v in stats.items()
    ])
    return f'''<div class="compcard-box">
  <div class="compcard-title">Official Model Measurements · Comp Card</div>
  <div class="compcard-grid">
    {stats_html}
  </div>
</div>'''

def generate_credits_html(credits):
    items_html = "".join([
        f'<li><strong>{c[0]}:</strong> {c[1]}</li>'
        for c in credits
    ])
    return f'''<section class="profile-credits">
  <span class="eyebrow" style="color: var(--color-raspberry);">Verified Work</span>
  <h3>Campaign Credits &amp; Collaborations</h3>
  <ul>
    {items_html}
  </ul>
</section>'''

def generate_related_html(related):
    cards_html = "".join([
        f'''<a class="related-card" href="{r['path']}">
  <img alt="{r['name']} — Beige Model Management" loading="lazy" src="{r['img']}"/>
  <div class="related-card-meta">
    <h3>{r['name']}</h3>
    <span>{r['cat']}</span>
  </div>
</a>'''
        for r in related
    ])
    return f'''<section class="related-models">
  <span class="eyebrow" style="color: #d58a9c;">Curated Recommendations</span>
  <h2>Discover Related Talent</h2>
  <div class="related-grid">
    {cards_html}
  </div>
</section>'''

base_dir = r"c:\Users\Dell\OneDrive\Desktop\Beige"

for slug, data in MODELS_DATA.items():
    file_path = os.path.join(base_dir, "models", slug, "index.html")
    if not os.path.exists(file_path):
        print(f"Skipping {slug}: not found at {file_path}")
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Update intro paragraph if present
    intro_pattern = r'<p class="profile-intro">.*?</p>'
    new_intro = f'<p class="profile-intro">{data["intro"]}</p>'
    content = re.sub(intro_pattern, new_intro, content)
    
    # 2. Add or update compcard-box in .profile-copy
    compcard_html = generate_compcard_html(data["stats"])
    if '<div class="compcard-box">' in content:
        content = re.sub(r'<div class="compcard-box">.*?</div>\s*</div>', compcard_html, content, flags=re.DOTALL)
    else:
        # insert right before <div class="profile-actions">
        content = content.replace('<div class="profile-actions">', f'{compcard_html}\n<div class="profile-actions">')
    
    # 3. Add credits & related models right before <section class="profile-bottom"
    credits_html = generate_credits_html(data["credits"])
    related_html = generate_related_html(data["related"])
    
    # Remove existing profile-credits or related-models if already present
    content = re.sub(r'<section class="profile-credits">.*?</section>', '', content, flags=re.DOTALL)
    content = re.sub(r'<section class="related-models">.*?</section>', '', content, flags=re.DOTALL)
    
    insert_block = f'\n{credits_html}\n{related_html}\n'
    content = content.replace('<section class="profile-bottom"', f'{insert_block}<section class="profile-bottom"')
    
    # 4. Standardize footer text
    old_footer_text_1 = "Discovering distinctive faces. Nurturing international presence. Defining contemporary African elegance on the global fashion stage."
    new_footer_text = "Discovering distinctive female talent. Developing exceptional talent. Creating meaningful representation across Africa and global fashion markets."
    content = content.replace(old_footer_text_1, new_footer_text)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"Enriched profile for {data['name']} ({slug})")

print("All 7 model profiles successfully enriched!")
