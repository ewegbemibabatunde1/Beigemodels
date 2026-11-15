# Beige Model Management — Production Launch & Operations Guide

**Domain:** `beigemodel.org`  
**Brand Concept:** The Art of Representation  
**Official WhatsApp Business Line:** `+234 907 717 8197` (`09077178197`)  
**Official Email Addresses:** `bookings@beigemodel.org`, `scouting@beigemodel.org`, `hello@beigemodel.org`  
**Headquarters:** Lagos, Nigeria  
**Last Audited:** November 15, 2026  

---

## 1. Project Architecture Overview

The Beige Model Management platform is engineered as a static, multi-page website built with modern standards for fast loading times and cross-device compatibility:

```
Beige/
├── index.html                   # Cinematic homepage (hero carousel, manifesto, roster preview)
├── 404.html                     # Custom luxury 404 error page
├── sitemap.xml                  # XML sitemap with 17 canonical URLs
├── robots.txt                   # Search crawler directives
├── about/index.html             # Agency philosophy, founding story & ethos
├── services/index.html          # Core capabilities (booking, development, runway, production)
├── journal/index.html           # Published editorial features & campaign archive
├── book/index.html              # Interactive client booking brief & WhatsApp generator
├── apply/index.html             # Model scouting studio with polaroid simulator & FAQ
├── contact/index.html           # 4-Department routing hub & live Lagos office clock
├── legal/index.html             # Model protection charter & safety advisory
├── models/
│   ├── index.html               # Live discovery platform with search & category filters
│   ├── ada/index.html           # Ada (Commercial · Beauty · Editorial)
│   ├── aisha/index.html         # Aisha (Editorial · High Glamour · Runway)
│   ├── anastasia/index.html     # Anastasia (Runway · High Fashion · Editorial)
│   ├── becky/index.html         # Becky (Commercial · Beauty · Lookbook)
│   ├── belle/index.html         # Belle (Beauty · Editorial · New Face)
│   ├── debby/index.html         # Debby (Commercial · Bridal Beauty · Glamour)
│   └── ruth/index.html          # Ruth (Commercial Hair · Beauty · New Face)
├── css/
│   ├── tokens.css               # Design tokens (palette, typography scales, timing)
│   ├── base.css                 # Reset, typography, scroll-reveals, ambient glow
│   ├── components.css           # Buttons, fixed header, mobile navigation, footer
│   ├── sections.css             # Homepage layout sections
│   ├── interior.css             # Subpage layouts, forms, polaroids, FAQ accordion
│   └── profiles.css             # Model comp-card matrix, filter tabs, related talent
└── js/
    ├── site-config.js           # Single source of truth for agency WhatsApp number
    ├── main.js                  # Hero carousel, home booking brief & interactions
    ├── roster.js                # Instant category filter, live search & count update
    ├── forms.js                 # Talent chips, polaroids preview, height converter
    ├── profile.js               # Model comp-card WhatsApp booking generator
    └── editorial-motion.js      # Scroll-reveals, header backdrop blur, year sync
```

---

## 2. Verified Agency Configuration

* **WhatsApp Single Source of Truth:**  
  Located in [`js/site-config.js`](js/site-config.js):
  ```javascript
  window.BEIGE_CONFIG = Object.freeze({
    whatsappNumber: '2349077178197'
  });
  ```
  Whenever the agency changes or adds phone numbers, update this single file to automatically propagate to all 17 routes, floating buttons, booking engines, and scouting submission handlers.

---

## 3. Deployment Options

### Option A: Cloudflare Pages / Vercel / Netlify (Recommended - 1-Click Zero Config)
1. Push this repository to GitHub or GitLab.
2. Connect your repository to **Vercel**, **Netlify**, or **Cloudflare Pages**.
3. **Build Command:** Leave blank (no build step required).
4. **Output Directory:** `.` (root directory).
5. Point your custom domain `beigemodel.org` in DNS (CNAME or A records).

### Option B: Firebase Hosting
1. Run `firebase init hosting`.
2. Set public directory to `.`.
3. Configure as a single-page app: **No** (it is a true multi-page website).
4. Deploy with `firebase deploy --only hosting`.

### Option C: GitHub Pages
1. Go to repository **Settings** -> **Pages**.
2. Select **Source:** Deploy from a branch (`main` / `master`), folder: `/ (root)`.
3. Add custom domain `beigemodel.org` and enforce HTTPS.

---

## 4. How to Update Content

### Adding a New Model to the Roster
1. Add their high-resolution portfolio photos into `assets/images/models/` (e.g. `zainab-editorial-01.jpg`).
2. Duplicate any model folder (e.g. `models/belle/`) to `models/zainab/`.
3. Update `models/zainab/index.html` with her measurements, credits, and portrait paths.
4. Add her card into `models/index.html` with appropriate `data-category` and `data-name` attributes.
5. Add her URL to `sitemap.xml`.

### Publishing a New Journal Story
1. Add the campaign photography to `assets/images/campaigns/`.
2. Add a new `<article class="journal-card reveal">` in `journal/index.html` referencing the photographer, stylists, and models involved.

---

## 5. Security & Model Protection Protocols
* **Anti-Scam Advisory:** Always reinforce the agency's zero-fee policy. Beige Model Management never charges registration, audition, or portfolio fees.
* **Consent & Likeness:** All talent displayed on this platform are under agency agreement and have consented to portfolio representation.
