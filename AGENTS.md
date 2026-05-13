# AGENTS.md

## Project Overview
This is a static wedding invitation website for Elias & Lorena, built with vanilla HTML, CSS, and JavaScript. The site features a luxury theme with green and gold colors, Spanish language content, and interactive elements like a countdown timer, RSVP form, and background music.

## Technologies
- HTML5
- CSS3 (custom properties for theming)
- JavaScript (ES6+ features)
- External dependencies: Google Fonts, Font Awesome icons, YouTube API for music

## How to Run
Open `index.html` in a web browser. No build process required.

## Key Features
- Hero section with animated invitation reveal
- Real-time countdown to wedding date (Aug 16, 2026)
- Image gallery with organic layouts
- Event timeline
- Dress code section with color palette
- Gift information with bank details
- RSVP form submitting to Google Sheets via Apps Script
- Background music player using YouTube API
- Scroll-based animations and preloader

## Conventions
- Language: Spanish (all user-facing text)
- Color scheme: Greens (#4a5d4e, #8da390, #2c3327) and gold (#c5a059)
- Responsive design with mobile-first approach
- Luxury/elegant aesthetic with glass effects and animations
- Font families: Playfair Display (titles), Inter (body), Great Vibes (script)

## Development Notes
- Avoid modifying external CDN links or YouTube video IDs
- RSVP form uses a specific Google Apps Script URL - preserve this
- Images are in `img/` directory; maintain aspect ratios for gallery
- JavaScript handles URL parameters for personalized greetings
- No build tools or package managers used

## Common Tasks
- Update wedding date: Modify the Date string in `js/script.js`
- Change colors: Update CSS custom properties in `:root`
- Add images: Place in `img/` and update HTML src attributes
- Modify text: Edit HTML content directly (no i18n system)</content>
<parameter name="filePath">c:\Users\admin\Desktop\Boda-Verde-Crema\AGENTS.md