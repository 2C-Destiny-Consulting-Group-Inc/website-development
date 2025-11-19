# Images Directory

This directory contains all images used across the 2C Destiny website.

## Subdirectories

- **team/** - Team member photos and headshots
- **programs/** - Images for signature programs
- **pillars/** - Images for the pillars page
- **hero/** - Hero section images for various pages
- **logos/** - Company logos and branding assets
- **general/** - Temporary holding area for uncategorized images

## Usage

Place all website images in the appropriate subdirectory. Refer to `/IMAGE-INVENTORY.md` for complete documentation on image organization and naming conventions.

## To Add a New Image

1. Place the image in the appropriate subdirectory
2. Use descriptive, lowercase filenames with hyphens
3. Update `/IMAGE-INVENTORY.md` with the new image details
4. Reference the image in HTML using the relative path: `images/[category]/[filename]`

Example:
```html
<img src="images/team/member-name.jpg" alt="Team member name">
```
