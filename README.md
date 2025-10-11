# 2C Destiny Consulting Group - Website Development

## Overview
This repository contains the complete website for 2C Destiny Consulting Group, a nonprofit organization empowering families and community partners through programs and training.

## Website Pages

### Core Pages
- **index.html** - Home page with hero section, mission statement, and core values
- **about.html** - About Us page with collapsible sections showcasing experience and commitments
- **meet-the-team.html** - Team profiles with modal popups for detailed bios
- **contact.html** - Contact information, email form, and location details
- **donate.html** - Donation page with giving tiers and impact information

### Program Pages
- **pillars.html** - Core pillars and organizational values
- **signature-programs.html** - Detailed descriptions of flagship programs
- **fatherhood.html** - Fatherhood & Family Resilience Initiative details

## Styles & Assets
- **styles.css** - Global stylesheet with brand colors, typography, and component styles
- **Images** - Various PNG images for team members and programs (referenced in HTML)

## Technical Stack
- **HTML5** - Semantic, accessible markup
- **CSS3** - Custom styles with CSS variables for theming
- **Tailwind CSS** - Utility-first CSS framework (loaded via CDN)
- **JavaScript** - Vanilla JS for interactive components (mobile nav, modals, collapsibles)

## Brand Colors
The website uses a purple/violet color palette:
- Primary: `#5b21b6` (deep purple)
- Accent: `#8b5cf6` (soft lavender)
- Dark: `#2a0b45` (very dark purple)

## Development

### Local Development
To run the website locally:

```bash
# Using Python 3
python3 -m http.server 8080

# Using Python 2
python -m SimpleHTTPServer 8080

# Using Node.js
npx http-server -p 8080
```

Then open http://localhost:8080 in your browser.

### File Structure
```
website-development/
├── index.html                 # Home page
├── about.html                 # About page
├── meet-the-team.html         # Team page
├── contact.html               # Contact page
├── donate.html                # Donation page
├── pillars.html               # Pillars page
├── signature-programs.html    # Programs page
├── fatherhood.html            # Fatherhood initiative page
├── styles.css                 # Global styles
├── *.png                      # Image assets
├── WEBSITE_STRUCTURE.md       # Detailed structure documentation
└── README.md                  # This file
```

## Features
- ✅ Mobile-responsive navigation
- ✅ Accessible design with ARIA labels and semantic HTML
- ✅ Collapsible sections for better content organization
- ✅ Modal dialogs for team member details
- ✅ Consistent branding across all pages
- ✅ Fast loading with CDN-hosted dependencies

## Navigation Structure
All pages include consistent navigation:
- About
- Meet the Team
- Pillars
- Signature Programs
- Fatherhood
- Contact
- Donate

## Accessibility
- Skip to main content links
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators

## Browser Support
The website is compatible with all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contributing
This is a private repository for 2C Destiny Consulting Group. For questions or updates, please contact the organization directly.

## License
© 2025 2C Destiny Consulting Group. All rights reserved.

## Contact
- **Website**: [2C Destiny Consulting Group](https://2cdestiny.org)
- **Email**: info@2cdestiny.org
- **Address**: P.O. BOX 772862, 4545 SW 60th Ave., Ocala, FL 34474-4301

---

*2C Destiny is a 501(c)(3) organization*