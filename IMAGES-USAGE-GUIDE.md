# Images Usage Guide

This guide explains how to work with the centralized image directory structure for the 2C Destiny website.

## Quick Start

All website images are now organized in the `/images/` directory with the following structure:

```
images/
├── team/          # Team member photos
├── programs/      # Signature programs images  
├── pillars/       # Pillars page images
├── hero/          # Hero section images
├── logos/         # Company logos
└── general/       # Temporary uncategorized images
```

## How to Request Image Assignment

When you want an image placed in a specific location on the website, provide:

1. **Image identifier**: The path from the inventory (e.g., `images/team/member-name.jpg`)
2. **Target location**: The specific HTML file and section
3. **Requirements**: Any sizing or styling needs

### Example Request Format

```
Please assign:
- Image: images/programs/fatherhood-bonding.jpg
- Location: fatherhood.html, hero section
- Size: Full width, 600px height
- Alt text: "Father and child bonding at home"
```

## Adding New Images

### Step 1: Choose the Right Directory

| Image Type | Directory | Example |
|------------|-----------|---------|
| Team headshots | `images/team/` | Team member photos |
| Program photos | `images/programs/` | Fatherhood, training sessions |
| Pillars imagery | `images/pillars/` | DEI, community partners |
| Hero banners | `images/hero/` | Large page headers |
| Logos | `images/logos/` | Company branding |
| Other/Temporary | `images/general/` | Until categorized |

### Step 2: Name the File

Use descriptive, lowercase filenames with hyphens:

✅ Good examples:
- `malveria-cox-carter.jpg`
- `fatherhood-reading-together.jpg`
- `community-partners-meeting.jpg`

❌ Avoid:
- `IMG_1234.jpg`
- `untitled.png`
- `photo.jpeg`

### Step 3: Upload to Repository

Place the file in the chosen directory under `/images/[category]/`

### Step 4: Update IMAGE-INVENTORY.md

Add an entry documenting:
- Filename and path
- Description of the image
- Intended use/location
- Dimensions (optional but helpful)

## Referencing Images in HTML

Use relative paths from the HTML file location:

```html
<!-- From root-level HTML files (index.html, about.html, etc.) -->
<img src="images/team/member-name.jpg" alt="Description">

<!-- From subdirectories (if any exist) -->
<img src="../images/team/member-name.jpg" alt="Description">
```

## Responsive Images

For high-resolution displays and different screen sizes, provide multiple image sizes:

```html
<img 
  src="images/team/member-name-800.jpg" 
  srcset="images/team/member-name-400.jpg 400w,
          images/team/member-name-800.jpg 800w,
          images/team/member-name-1200.jpg 1200w"
  sizes="(max-width: 768px) 400px,
         (max-width: 1024px) 800px,
         1200px"
  alt="Team member name"
  loading="lazy">
```

### Naming Convention for Sizes
- `image-name-400.jpg` (400px wide)
- `image-name-800.jpg` (800px wide) 
- `image-name-1200.jpg` (1200px wide)

## Image Optimization Best Practices

### File Size Guidelines
- **Thumbnails**: < 50KB
- **Standard images**: < 200KB
- **Hero images**: < 500KB
- **Logos (PNG)**: < 50KB
- **Logos (SVG)**: < 20KB

### Format Selection
- **Photographs**: Use JPG (quality 80-85%)
- **Graphics with transparency**: Use PNG
- **Logos and icons**: Use SVG when possible
- **Animated graphics**: Use modern formats or fallback to GIF

### Tools for Optimization
- Online: TinyPNG, Squoosh
- Command line: ImageMagick, cwebp
- Design tools: Export at appropriate quality settings

## Current Image Status

### Available Images (in images/general/)
- 4 PNG files with UUID names - **Need to be categorized and renamed**

### Missing Images (Referenced in HTML)
See IMAGE-INVENTORY.md section "Images Referenced in HTML Files" for complete list.

Priority missing images:
- Team member headshots (4 needed)
- Hero images for main pages
- Program and pillar images
- Company logo files

## Workflow for Organizing Existing Images

For the images currently in `images/general/`:

1. **Identify the image purpose**
   - Open the file and view it
   - Determine what it shows

2. **Choose descriptive name**
   - Use the naming convention (lowercase-with-hyphens)
   - Make it meaningful

3. **Move to appropriate directory**
   ```bash
   mv images/general/uuid-name.png images/[category]/descriptive-name.png
   ```

4. **Update IMAGE-INVENTORY.md**
   - Remove from "General" section
   - Add to appropriate category section

5. **Request HTML update**
   - Specify where this image should be used
   - Provide the new path

## Common Image Assignment Requests

### Assign a Team Photo
```
Image: images/team/malveria-cox-carter.jpg
Location: meet-the-team.html, CEO section
Requirements: Square crop, 400x400px display
Alt text: "Portrait of Malveria Cox Carter, CEO"
```

### Assign a Hero Image
```
Image: images/hero/community-hands-heart.jpg
Location: pillars.html, hero section at top
Requirements: Full width, maintain aspect ratio, min-height 600px
Alt text: "Hands forming a heart around community"
```

### Assign a Program Image
```
Image: images/programs/fatherhood-initiative.jpg
Location: signature-programs.html, Fatherhood section
Requirements: Card image, 800x450px display
Alt text: "Father and child in mentorship program"
```

## Troubleshooting

### Image Not Displaying
1. Check the file path is correct (case-sensitive)
2. Verify the image file exists in the repository
3. Check file permissions
4. Validate HTML syntax

### Wrong Image Size
1. Check if responsive sizes are available
2. Use CSS to constrain dimensions
3. Consider providing optimized versions

### Slow Loading
1. Optimize file size
2. Use `loading="lazy"` attribute
3. Consider WebP format with JPG fallback
4. Implement responsive images

## Questions or Issues?

Refer to:
- `IMAGE-INVENTORY.md` - Complete image catalog
- Directory README files - Category-specific guidance
- This guide - Usage and workflow

When requesting help, please provide:
- What you're trying to accomplish
- The specific image(s) involved
- The target location(s)
- Any error messages or issues
