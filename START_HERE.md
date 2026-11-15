# Beige Model Management — Updated Project

## Run locally

1. Extract the project folder.
2. Open the `Beige` folder in VS Code.
3. Open `index.html` with the VS Code Live Server extension (recommended), or use another local static HTTP server.
4. Start with the homepage, then open **Models** to browse the roster and individual profiles.

## Important: configure WhatsApp before accepting enquiries

Open `js/site-config.js` and set `whatsappNumber` to the agency's verified WhatsApp Business number in international format, digits only. Example format: `2348012345678` — this is an example format, not the agency's number.

The booking form prepares the enquiry message in WhatsApp. The visitor must press **Send**. The website does not itself save or dispatch booking records, and it must not claim that an enquiry has been received before the visitor sends the message.

## Included in this update

- Corrected the fake booking success state and removed unsafe HTML interpolation from the booking form.
- Consolidated hero carousel controls so each click advances one slide.
- Added pause behaviour and reduced-motion handling for the hero carousel.
- Added a model directory and seven individual portfolio pages: Ada, Aisha, Anastasia, Belle, Becky, Debby and Ruth.
- Added About, Services, Contact and pre-launch Legal Information pages.
- Added WhatsApp click-to-chat configuration shared by booking and model enquiry links.
- Updated homepage/footer routes and created an implementation status tracker.

## Still required before production launch

- Add the verified WhatsApp Business number.
- Verify the published email address and all agency contact details.
- Confirm model consent and image usage permissions for all profile photographs.
- Replace the legal information notice with reviewed Privacy, Terms and Cookie documents.
- Test the WhatsApp flow on actual iOS, Android and desktop devices.
- Complete browser/device, accessibility, performance, SEO and security QA.
