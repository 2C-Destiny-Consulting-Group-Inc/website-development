# Example Workflow: Using the Image Organization System

This document shows practical examples of how to use the new image organization system.

## Scenario 1: Adding a New Team Photo

### Situation
You have a new headshot of team member "John Smith" that needs to be added to the website.

### Steps

1. **Prepare the image**
   - Filename: `john-smith.jpg` (or `john-smith-800.jpg` if providing size)
   - Optimized for web (< 200KB)

2. **Upload to correct directory**
   - Place in: `/images/team/john-smith.jpg`

3. **Update inventory**
   - Open `IMAGE-INVENTORY.md`
   - Add to "Team Images" section:
     ```
     - `john-smith.jpg` - Headshot of John Smith, Program Director
     ```

4. **Request assignment** (using IMAGE-REQUEST-TEMPLATE.md format)
   ```
   Image: images/team/john-smith.jpg
   Location: meet-the-team.html, Team Members section
   Requirements: 
     - Size: 400x400px square crop
     - Display: Rounded corners with shadow
     - Position: Below existing team members
   Alt text: "Portrait of John Smith, Program Director"
   ```

---

## Scenario 2: Adding Multiple Program Images

### Situation
You have 3 images from the Fatherhood Initiative that need to be added.

### Steps

1. **Prepare images with descriptive names**
   - `fatherhood-mentorship.jpg` (father and child reading)
   - `fatherhood-workshop.jpg` (group workshop photo)
   - `fatherhood-family-activity.jpg` (family outdoor activity)

2. **Upload to programs directory**
   - Place all in: `/images/programs/`

3. **Update inventory**
   - Add to "Programs Images" section in `IMAGE-INVENTORY.md`

4. **Request assignments in batch**
   ```
   Image 1: images/programs/fatherhood-mentorship.jpg
   Location: fatherhood.html, "Stories" section, first figure
   Alt text: "Father and child reading together"
   
   Image 2: images/programs/fatherhood-workshop.jpg  
   Location: fatherhood.html, "Who We Serve" section
   Alt text: "Fathers participating in group workshop"
   
   Image 3: images/programs/fatherhood-family-activity.jpg
   Location: fatherhood.html, hero section
   Alt text: "Family enjoying outdoor activity together"
   ```

---

## Scenario 3: Organizing Existing Images in general/

### Situation
The 4 existing PNG images in `images/general/` need to be categorized.

### Steps for Each Image

1. **Open/view the image file**
   - Look at: `images/general/6f9c332d-6f6a-4bc5-8f6a-6e5449d764ce.png`

2. **Identify content**
   - Example: "This is a photo of diverse hands forming a heart"

3. **Determine appropriate category**
   - Best fit: `images/hero/` (could be hero image for pillars page)

4. **Rename descriptively**
   ```bash
   mv images/general/6f9c332d-6f6a-4bc5-8f6a-6e5449d764ce.png \
      images/hero/community-hands-heart.jpg
   ```

5. **Update IMAGE-INVENTORY.md**
   - Remove from "General Images" section
   - Add to "Hero Images" section:
     ```
     - `community-hands-heart.jpg` - Diverse hands forming heart shape, 
       suitable for community/unity themes
     ```

6. **Request assignment**
   ```
   Image: images/hero/community-hands-heart.jpg
   Location: pillars.html, hero section
   Requirements: Full width, 1600x600px display
   Alt text: "Hands forming a heart around community"
   ```

---

## Scenario 4: Adding Logo Files

### Situation
You have the company logo in SVG and PNG formats.

### Steps

1. **Prepare logo files**
   - `2c-destiny-logo.svg` (vector, preferred)
   - `2c-destiny-logo.png` (raster fallback)
   - `2c-destiny-logo-small.png` (for small displays)

2. **Upload to logos directory**
   - Place all in: `/images/logos/`

3. **Update inventory**
   ```
   ### Logo Images (images/logos/)
   - `2c-destiny-logo.svg` - Main company logo (vector format)
   - `2c-destiny-logo.png` - Main company logo (raster, 512x512px)
   - `2c-destiny-logo-small.png` - Small version for compact headers (128x128px)
   ```

4. **Request assignments across multiple pages**
   ```
   Logo Usage Request:
   
   File: images/logos/2c-destiny-logo.svg
   
   Locations to update:
   1. index.html - Header navigation
   2. contact.html - Footer
   3. donate.html - Header
   4. All HTML files - Consistent header logo
   
   Requirements:
   - Height: 32px in header
   - Height: 48px in footer
   - Maintain aspect ratio
   - Alt text: "2C Destiny Consulting Group logo"
   ```

---

## Scenario 5: Creating Responsive Images

### Situation
You have a high-resolution hero image that needs responsive versions.

### Steps

1. **Create multiple sizes from original**
   - `community-celebration-400.jpg` (400px wide)
   - `community-celebration-800.jpg` (800px wide)
   - `community-celebration-1200.jpg` (1200px wide)
   - `community-celebration-1600.jpg` (1600px wide)

2. **Upload all sizes**
   - Place in: `/images/hero/`

3. **Update inventory**
   ```
   - `community-celebration-[size].jpg` - Community celebration event
     Available in: 400w, 800w, 1200w, 1600w
   ```

4. **Request assignment with responsive code**
   ```
   Image: images/hero/community-celebration-*.jpg
   Location: index.html, hero section
   
   Requirements: Responsive image set
   Suggested HTML:
   <img 
     src="images/hero/community-celebration-800.jpg" 
     srcset="images/hero/community-celebration-400.jpg 400w,
             images/hero/community-celebration-800.jpg 800w,
             images/hero/community-celebration-1200.jpg 1200w,
             images/hero/community-celebration-1600.jpg 1600w"
     sizes="100vw"
     alt="Community members celebrating together"
     loading="lazy">
   ```

---

## Quick Reference Commands

### View existing images
```bash
ls -la images/team/
ls -la images/programs/
```

### Move image to correct category
```bash
mv images/general/old-name.png images/programs/new-name.jpg
```

### Check image file size (should be optimized)
```bash
ls -lh images/programs/my-image.jpg
```

### View directory structure
```bash
tree images/
# or
find images -type f | sort
```

---

## Tips for Success

✅ **DO:**
- Use descriptive filenames (lowercase-with-hyphens)
- Optimize images before uploading (< 200KB for most)
- Update IMAGE-INVENTORY.md after adding images
- Provide complete information in assignment requests
- Include descriptive alt text for accessibility

❌ **DON'T:**
- Leave images in general/ permanently
- Use generic names like "image1.jpg"
- Upload huge unoptimized files
- Skip updating the inventory
- Forget to specify exact locations for assignments

---

## Need Help?

- **Can't find an image?** → Check IMAGE-INVENTORY.md
- **Don't know where to put an image?** → See IMAGES-USAGE-GUIDE.md section "Adding New Images"
- **Need to request assignment?** → Use IMAGE-REQUEST-TEMPLATE.md
- **Want overview?** → See IMAGES-SUMMARY.md
- **Questions about process?** → Refer to this workflow document

---

**Remember**: The goal is to keep all images organized, documented, and easy to find. When in doubt, refer to the documentation files!
