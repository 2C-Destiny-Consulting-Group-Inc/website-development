# Copilot Instructions for AI Coding Agents

## Project Overview
This repository is a static website for 2C Destiny Consulting Group Inc. It consists of multiple standalone HTML files, each representing a different page of the site. There is no build system, backend, or JavaScript framework—just plain HTML and static assets (images, links).

## Key Files
- `index.html`: Main landing page.
- `about.html`, `contact.html`, `donate.html`, `fatherhood.html`, `pillars.html`, `signature-programs.html`, `meet-the-team.html`: Individual site pages.
- Image assets: PNG files in the root directory.
- `README.md`: Minimal project documentation.

## Conventions & Patterns
- Each HTML file is self-contained. There is no shared layout or templating system.
- Navigation is handled via standard `<a href="...">` links between pages.
- Images are referenced with relative paths (e.g., `<img src="b91e42c3-3c06-408a-9f23-8d58777f2a2c.png">`).
- No CSS or JS files are present; all styling and interactivity must be inline or added directly to the HTML files.
- File naming is inconsistent; some files use spaces, dashes, or uppercase. Be careful when linking or referencing files.

## Developer Workflows
- No build or test commands are required. Simply edit HTML files and refresh in a browser to see changes.
- To add a new page, create a new `.html` file in the root and link it from existing pages.
- To update images, add or replace PNG files in the root directory and update `<img>` tags as needed.

## Project-Specific Guidance
- Maintain consistency in navigation links across all pages. If you update navigation, propagate changes to every HTML file.
- When adding new content, follow the structure and style of existing pages for a cohesive look.
- Avoid introducing frameworks or build tools unless explicitly requested.
- If you add CSS or JS, keep it minimal and inline unless otherwise directed.

## Example: Adding a New Team Member
1. Edit `meet-the-team.html`.
2. Add a new `<div>` or `<section>` for the team member, matching the format of existing entries.
3. Add their image to the root directory and reference it with a relative path.
4. Update navigation links if needed.

---
For questions about project structure or conventions, review the HTML files directly—they are the source of truth.
