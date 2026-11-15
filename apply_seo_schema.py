import os
import json
import re

base_dir = r"c:\Users\Dell\OneDrive\Desktop\Beige"

PAGE_SEO = {
    "index.html": {
        "title": "BEIGE Model Management — The Art of Representation",
        "description": "Discovering distinctive female talent. Developing exceptional talent. Creating meaningful representation across Africa and global fashion markets.",
        "canonical": "https://beigemodel.org/index.html",
        "og_type": "website",
        "image": "https://beigemodel.org/assets/images/logo/beige-models-art.jpg",
        "is_model": False
    },
    "about/index.html": {
        "title": "About Agency — Beige Model Management",
        "description": "The Art of Representation. Discovering authentic individuality and nurturing sustainable careers for women models across Africa and international fashion markets.",
        "canonical": "https://beigemodel.org/about/index.html",
        "og_type": "website",
        "image": "https://beigemodel.org/assets/images/logo/beige-models-art.jpg",
        "is_model": False
    },
    "services/index.html": {
        "title": "Capabilities & Services — Beige Model Management",
        "description": "Full-service fashion and commercial talent management: model development, runway casting, campaign production, and international placement.",
        "canonical": "https://beigemodel.org/services/index.html",
        "og_type": "website",
        "image": "https://beigemodel.org/assets/images/logo/beige-models-art.jpg",
        "is_model": False
    },
    "journal/index.html": {
        "title": "Editorial Journal — Beige Model Management",
        "description": "Explore editorial features, behind-the-scenes campaigns, and published fashion stories featuring represented Beige models.",
        "canonical": "https://beigemodel.org/journal/index.html",
        "og_type": "website",
        "image": "https://beigemodel.org/assets/images/campaigns/lighthill-01.jpg",
        "is_model": False
    },
    "book/index.html": {
        "title": "Book Talent & Casting Briefs — Beige Model Management",
        "description": "Commission represented women talent for high-fashion editorial, commercial advertising, cosmetics, lookbooks, and runway presentations.",
        "canonical": "https://beigemodel.org/book/index.html",
        "og_type": "website",
        "image": "https://beigemodel.org/assets/images/models/ada-editorial-01.jpg",
        "is_model": False
    },
    "apply/index.html": {
        "title": "Become a Model — Beige Model Management Scouting",
        "description": "Apply for representation with Beige Model Management. Open scouting for emerging women models in editorial, commercial, beauty, and runway. Zero fees.",
        "canonical": "https://beigemodel.org/apply/index.html",
        "og_type": "website",
        "image": "https://beigemodel.org/assets/images/models/belle-beauty-01.jpg",
        "is_model": False
    },
    "contact/index.html": {
        "title": "Contact Agency Headquarters — Beige Model Management",
        "description": "Direct communication with Beige Model Management in Lagos, Nigeria (+234 907 717 8197) for commercial casting, model scouting, and press inquiries.",
        "canonical": "https://beigemodel.org/contact/index.html",
        "og_type": "website",
        "image": "https://beigemodel.org/assets/images/logo/beige-models-art.jpg",
        "is_model": False
    },
    "legal/index.html": {
        "title": "Legal Information & Model Protection — Beige Model Management",
        "description": "Official agency representation standards, model safety advisory, zero application fee guarantee, and digital copyright notices.",
        "canonical": "https://beigemodel.org/legal/index.html",
        "og_type": "website",
        "image": "https://beigemodel.org/assets/images/logo/beige-models-art.jpg",
        "is_model": False
    },
    "404.html": {
        "title": "Page Not Found (404) — Beige Model Management",
        "description": "The requested page could not be found. Explore our women's model roster, agency story, or contact our booking team.",
        "canonical": "https://beigemodel.org/404.html",
        "og_type": "website",
        "image": "https://beigemodel.org/assets/images/logo/beige-models-art.jpg",
        "is_model": False
    },
    "models/index.html": {
        "title": "Models Roster — Beige Model Management",
        "description": "Explore the elite roster of women represented by Beige Model Management across editorial, runway, beauty, and international commercial campaigns.",
        "canonical": "https://beigemodel.org/models/index.html",
        "og_type": "website",
        "image": "https://beigemodel.org/assets/images/models/aisha-editorial-01.jpg",
        "is_model": False
    },
    "models/ada/index.html": {
        "title": "Ada — Portfolio & Measurements | Beige Model Management",
        "description": "Commercial · Beauty · Editorial model represented by Beige Model Management. 5'10\" / 178cm, 32-24-35. View verified portfolio and comp card.",
        "canonical": "https://beigemodel.org/models/ada/index.html",
        "og_type": "profile",
        "image": "https://beigemodel.org/assets/images/models/ada-editorial-01.jpg",
        "is_model": True,
        "model_name": "Ada",
        "category": "Commercial · Beauty · Editorial",
        "height": "178 cm"
    },
    "models/aisha/index.html": {
        "title": "Aisha — Portfolio & Measurements | Beige Model Management",
        "description": "Editorial · High Glamour · Runway model represented by Beige Model Management. 5'11\" / 180cm, 33-24-36. View verified portfolio and comp card.",
        "canonical": "https://beigemodel.org/models/aisha/index.html",
        "og_type": "profile",
        "image": "https://beigemodel.org/assets/images/models/aisha-editorial-01.jpg",
        "is_model": True,
        "model_name": "Aisha",
        "category": "Editorial · High Glamour · Runway",
        "height": "180 cm"
    },
    "models/anastasia/index.html": {
        "title": "Anastasia — Portfolio & Measurements | Beige Model Management",
        "description": "Runway · High Fashion · Editorial model represented by Beige Model Management. 5'11\" / 180cm, 32-23.5-34.5. View verified portfolio and comp card.",
        "canonical": "https://beigemodel.org/models/anastasia/index.html",
        "og_type": "profile",
        "image": "https://beigemodel.org/assets/images/models/anastasia-editorial-01.jpg",
        "is_model": True,
        "model_name": "Anastasia",
        "category": "Runway · High Fashion · Editorial",
        "height": "180 cm"
    },
    "models/becky/index.html": {
        "title": "Becky — Portfolio & Measurements | Beige Model Management",
        "description": "Commercial · Beauty · Lookbook model represented by Beige Model Management. 5'9\" / 175cm, 34-25-36. View verified portfolio and comp card.",
        "canonical": "https://beigemodel.org/models/becky/index.html",
        "og_type": "profile",
        "image": "https://beigemodel.org/assets/images/models/becky-commercial-01.jpg",
        "is_model": True,
        "model_name": "Becky",
        "category": "Commercial · Beauty · Lookbook",
        "height": "175 cm"
    },
    "models/belle/index.html": {
        "title": "Belle — Portfolio & Measurements | Beige Model Management",
        "description": "Beauty · Editorial · New Face model represented by Beige Model Management. 5'9.5\" / 177cm, 32-24-35. View verified portfolio and comp card.",
        "canonical": "https://beigemodel.org/models/belle/index.html",
        "og_type": "profile",
        "image": "https://beigemodel.org/assets/images/models/belle-beauty-01.jpg",
        "is_model": True,
        "model_name": "Belle",
        "category": "Beauty · Editorial · New Face",
        "height": "177 cm"
    },
    "models/debby/index.html": {
        "title": "Debby — Portfolio & Measurements | Beige Model Management",
        "description": "Commercial · Bridal Beauty · Glamour model represented by Beige Model Management. 5'8.5\" / 174cm, 33-25-37. View verified portfolio and comp card.",
        "canonical": "https://beigemodel.org/models/debby/index.html",
        "og_type": "profile",
        "image": "https://beigemodel.org/assets/images/models/debby-beauty-01.jpg",
        "is_model": True,
        "model_name": "Debby",
        "category": "Commercial · Bridal Beauty · Glamour",
        "height": "174 cm"
    },
    "models/ruth/index.html": {
        "title": "Ruth — Portfolio & Measurements | Beige Model Management",
        "description": "Commercial Hair · Beauty · New Face model represented by Beige Model Management. 5'9\" / 176cm, 32-24-35. View verified portfolio and comp card.",
        "canonical": "https://beigemodel.org/models/ruth/index.html",
        "og_type": "profile",
        "image": "https://beigemodel.org/assets/images/models/ruth-beauty-01.jpg",
        "is_model": True,
        "model_name": "Ruth",
        "category": "Commercial Hair · Beauty · New Face",
        "height": "176 cm"
    }
}

for route, meta in PAGE_SEO.items():
    file_path = os.path.join(base_dir, route.replace("/", os.sep))
    if not os.path.exists(file_path):
        print(f"Skipping {route}: file not found")
        continue

    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Generate JSON-LD Schema
    if meta["is_model"]:
        schema_dict = {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
                "@type": "Person",
                "name": meta["model_name"],
                "jobTitle": "Fashion & Commercial Model",
                "worksFor": {
                    "@type": "ModelingAgency",
                    "name": "Beige Model Management",
                    "url": "https://beigemodel.org"
                },
                "image": meta["image"],
                "gender": "Female",
                "height": meta["height"],
                "description": meta["description"]
            }
        }
    else:
        schema_dict = {
            "@context": "https://schema.org",
            "@type": "ModelingAgency",
            "name": "Beige Model Management",
            "alternateName": "Beige Models",
            "url": "https://beigemodel.org",
            "logo": "https://beigemodel.org/assets/images/logo/beige-models-art.jpg",
            "image": meta["image"],
            "description": "Discovering distinctive female talent. Developing exceptional talent. Creating meaningful representation across Africa and global fashion markets.",
            "telephone": "+2349077178197",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lagos",
                "addressRegion": "Lagos State",
                "addressCountry": "NG"
            },
            "sameAs": [
                "https://www.instagram.com/beigemodels/"
            ]
        }

    schema_json = json.dumps(schema_dict, indent=2)

    # Build Complete Meta Block
    meta_block = f"""  <meta name="description" content="{meta['description']}"/>
  <meta name="robots" content="index, follow, max-image-preview:large"/>
  <link rel="canonical" href="{meta['canonical']}"/>

  <!-- OpenGraph Social Sharing -->
  <meta property="og:site_name" content="Beige Model Management"/>
  <meta property="og:type" content="{meta['og_type']}"/>
  <meta property="og:title" content="{meta['title']}"/>
  <meta property="og:description" content="{meta['description']}"/>
  <meta property="og:url" content="{meta['canonical']}"/>
  <meta property="og:image" content="{meta['image']}"/>
  <meta property="og:locale" content="en_US"/>

  <!-- Twitter / X Cards -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="{meta['title']}"/>
  <meta name="twitter:description" content="{meta['description']}"/>
  <meta name="twitter:image" content="{meta['image']}"/>

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
{schema_json}
  </script>"""

    # Update Title
    html = re.sub(r'<title>.*?</title>', f'<title>{meta["title"]}</title>', html, flags=re.DOTALL)

    # Clean existing description & OG tags
    html = re.sub(r'<meta content=".*?" name="description"/>', '', html)
    html = re.sub(r'<meta name="description" content=".*?">', '', html)
    html = re.sub(r'<meta content=".*?" property="og:.*?"/>', '', html)
    html = re.sub(r'<meta property="og:.*?" content=".*?">', '', html)
    html = re.sub(r'<meta name="twitter:.*?" content=".*?">', '', html)
    html = re.sub(r'<link rel="canonical".*?>', '', html)
    html = re.sub(r'<script type="application/ld\+json">.*?</script>', '', html, flags=re.DOTALL)

    # Insert meta block right before <title>
    html = html.replace(f'<title>{meta["title"]}</title>', f'{meta_block}\n  <title>{meta["title"]}</title>')

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"Injected SEO, OpenGraph & JSON-LD schema into {route}")

print("Phase 6 SEO & Schema injection complete across all 17 routes!")
