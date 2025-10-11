# Image Inventory for 2C Destiny Website

This file serves as a centralized inventory of all images used across the website. All images are organized in the `/images/` directory structure.

## Directory Structure

```
images/
├── team/          # Team member photos and headshots
├── programs/      # Signature programs images
├── pillars/       # Pillars page images
├── hero/          # Hero section images for various pages
├── logos/         # Company logos and branding assets
└── general/       # General purpose images (temporary holding)
```

## Available Images

### General Images (images/general/)
Currently contains 4 images that need to be categorized:
- `6f9c332d-6f6a-4bc5-8f6a-6e5449d764ce.png` - *Needs description and categorization*
- `8d55fb6b-6dae-41b8-bb21-9395c293ac98.png` - *Needs description and categorization*
- `b91e42c3-3c06-408a-9f23-8d58777f2a2c.png` - *Needs description and categorization*
- `cceebb64-b15b-465b-86fc-68a06c9e5f64.png` - *Needs description and categorization*

### Team Images (images/team/)
**Currently empty** - Add team member photos here
- Expected: Malveria Cox Carter headshot
- Expected: MaryEtta P. Clarkson headshot
- Expected: Robert P. Carter headshot
- Expected: Sonia Lynch-Dillard headshot

### Programs Images (images/programs/)
**Currently empty** - Add signature program images here
- Expected: Fatherhood program images
- Expected: Trauma-informed practice training images
- Expected: Community anti-violence program images
- Expected: Case management and family conferencing images

### Pillars Images (images/pillars/)
**Currently empty** - Add pillars page images here
- Expected: Diversity, equity, and inclusion image
- Expected: Community partners image
- Expected: Trauma-informed practice image
- Expected: Child development and family resilience images

### Hero Images (images/hero/)
**Currently empty** - Add hero section images here
- Expected: Homepage hero image
- Expected: Pillars hero image ("Heart made of diverse hands")
- Expected: Fatherhood page hero image

### Logo Images (images/logos/)
**Currently empty** - Add logo files here
- Expected: 2C Destiny main logo (logo.svg)
- Expected: 2c-destiny-logo.png

## Images Referenced in HTML Files (Currently Missing)

### Index Page (index.html)
- `to-a-brighter-future.jpg` - Hero section image

### Fatherhood Page (fatherhood.html)
- `family1.jpg` - Father and child bonding at home
- `peek a boo.png` - Child playing peek-a-boo
- `fatherhood-extra.jpg` - Shared moment of care and play

### Pillars Page (pillars.html)
- `HEART MADE OF DIVERSE HANDS.jpg` - Hero image
- `fathers 2/DEI.jpg` - Diversity, equity, and inclusion
- `LITTLE GIRL IN FIELD WITH BALLOONS.jpg` - Child holding balloons
- `fathers 2/community partners.png` - Community partners meeting
- `PARENTS HOLFOING BABY.jpg` - Parents holding baby

### Signature Programs Page (signature-programs.html)
- `PROGRAMS FOR SIGNATURE PROGRAM S.jpg` - Program photo
- `fathers%202/reading.png` - Fatherhood program image
- `HEALING.jpg` - Trauma-informed practice training
- `SMILING WITH PAINT ON FACE.jpg` - Community anti-violence program
- `maryetta_high-quality_photo_of_families_of_diverse_backgrounds__8.png` - Case management

### Contact Page (contact.html)
- `2c-destiny-logo.png` - Logo

### Donate Page (donate.html)
- `/logo.svg` - Logo

### Meet the Team Page (meet-the-team with temporary pics.html)
- `/images/team/malveria-headshot-source-800.jpg` (with 400w variant)
- `/images/team/maryetta-p-clarkson-800.jpg` (with 400w variant)
- `/images/team/robert-source-800.jpg` (with 400w variant)
- `/images/team/sonia-source-800.jpg` (with 400w variant)
- `/KIDS SMILING.jpg` - Fallback image
- `/peek a boo.png` - Contact illustration

## How to Use This Inventory

### Adding New Images
1. Place the image file in the appropriate subdirectory under `/images/`
2. Use descriptive, lowercase filenames with hyphens (e.g., `father-child-bonding.jpg`)
3. Update this inventory file with:
   - Filename
   - Description
   - Intended use/location
   - Dimensions (if relevant)

### Organizing Existing Images
1. Review images in `images/general/`
2. Rename with descriptive names if needed
3. Move to appropriate category folder
4. Update this inventory

### Requesting Image Assignment
When requesting an image to be placed in a specific location:
1. Reference the image by its path from this inventory (e.g., `images/team/malveria-headshot.jpg`)
2. Specify the exact location (HTML file and section)
3. Provide any sizing or formatting requirements

## Image Naming Conventions

- Use lowercase letters
- Separate words with hyphens (kebab-case)
- Be descriptive but concise
- Include the category in the path, not the filename
- Examples:
  - `images/team/malveria-cox-carter.jpg`
  - `images/programs/fatherhood-initiative.jpg`
  - `images/hero/community-hands-heart.jpg`

## Image Optimization Guidelines

- Use appropriate formats: JPG for photos, PNG for graphics with transparency, SVG for logos
- Optimize file sizes for web (aim for <200KB for most images, <100KB for thumbnails)
- Provide multiple sizes for responsive images where needed (e.g., 400w, 800w, 1200w)
- Use descriptive alt text in HTML for accessibility

## Next Steps

1. **Categorize existing images**: Review the 4 PNG files in `images/general/` and move to appropriate folders
2. **Add missing images**: Upload all images referenced in HTML files but currently missing
3. **Update HTML references**: Update all HTML files to use the new organized paths
4. **Rename for clarity**: Give descriptive names to UUID-named files once their purpose is identified
