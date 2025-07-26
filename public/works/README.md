# Works Images Directory

This directory contains images for the Works section of the portfolio.

## How to Add/Edit Work Images

### Adding New Work Images:

1. **Image Requirements:**
   - Format: JPG, PNG, or WebP
   - Recommended size: 800x600px (4:3 aspect ratio)
   - Maximum file size: 2MB for optimal loading
   - High quality images that showcase your work clearly

2. **File Naming:**
   - Use descriptive names like `work1.jpg`, `work2.jpg`, etc.
   - Or use project names like `brand-identity-project.jpg`
   - Avoid spaces in filenames - use hyphens instead

3. **Steps to Add:**
   - Place your image files in this `public/works/` directory
   - Update the `src/data/worksData.ts` file with the new work entry
   - Update the `image` field to match your filename: `/works/your-image.jpg`

### Editing Existing Work Images:

1. **Replace Image:**
   - Simply replace the existing image file with the same filename
   - Or update the filename in `worksData.ts` if you change the name

2. **Update Work Information:**
   - Edit the corresponding entry in `src/data/worksData.ts`
   - Update title, description, category, date, and tools as needed

### Example Work Entry in worksData.ts:

```typescript
{
  id: 6,
  title: "Your New Project",
  description: "Description of your amazing work",
  image: "/works/your-new-image.jpg",
  category: "Category Name",
  date: "2024",
  tools: ["Tool1", "Tool2", "Tool3"]
}
```

## Current Images:
- work1.jpg - Brand Identity Design
- work2.jpg - Website Redesign  
- work3.jpg - E-commerce App Interface
- work4.jpg - Social Media Campaign
- work5.jpg - Logo Animation

Note: Current images are placeholders. Replace them with actual work samples.