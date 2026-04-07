# Creator Armour Typography System

## Overview

A premium SaaS typography system inspired by Linear, Stripe, Notion, and Vercel. Designed for clarity, consistency, and readability across all devices.

---

## Font Family

**Primary Font:** Inter  
**Fallback:** system-ui, -apple-system, sans-serif

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Why Inter?
- Designed specifically for computer screens
- Excellent readability at small sizes
- Professional, neutral appearance
- Wide range of weights (300-900)
- Free and open source

---

## Type Scale

| Name | Size | Weight | Line Height | Letter Spacing | Usage |
|------|------|--------|-------------|----------------|-------|
| Heading XL | 32px (2rem) | 700 | 1.1 | -0.02em | Hero titles, major headings |
| Heading L | 24px (1.5rem) | 600 | 1.2 | -0.01em | Page titles, section headers |
| Heading M | 20px (1.25rem) | 600 | 1.3 | -0.01em | Card titles, subsection headers |
| Body Large | 18px (1.125rem) | 500 | 1.5 | -0.01em | Lead paragraphs, emphasis |
| Body | 16px (1rem) | 400 | 1.5 | 0 | Main content, descriptions |
| Small | 14px (0.875rem) | 400 | 1.5 | 0.01em | Captions, labels, secondary text |
| XSmall | 12px (0.75rem) | 400 | 1.4 | 0.025em | Meta information, timestamps |

---

## Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Rarely used, special cases only |
| Normal | 400 | Body text, paragraphs |
| Medium | 500 | Emphasis, subheadings, buttons |
| Semibold | 600 | Section titles, important labels |
| Bold | 700 | Primary headings, strong emphasis |

### Guidelines
- Avoid overusing bold (700)
- Use semibold (600) for most emphasis
- Medium (500) for subtle emphasis
- Normal (400) for all body text

---

## Line Heights

| Context | Value | Reason |
|---------|-------|--------|
| Headings | 1.1 - 1.3 | Tight for visual impact |
| Body Text | 1.5 - 1.6 | Optimal readability |
| Large Text | 1.4 | Balanced for larger sizes |
| Small Text | 1.5 | Prevents crowding |

---

## Letter Spacing

| Context | Value | Usage |
|---------|-------|-------|
| Headings | -0.02em to -0.01em | Tighter for impact |
| Body | 0 | Default spacing |
| Small Text | 0.01em to 0.025em | Slightly wider for clarity |
| Buttons | 0.02em | Improved readability |
| Uppercase | 0.05em | Always add spacing |

---

## Text Colors

### Primary Hierarchy

```css
/* Primary text - highest contrast */
text-primary: #0f172a;    /* slate-900 */

/* Secondary text - medium contrast */
text-secondary: #475569;  /* slate-600 */

/* Muted text - low contrast */
text-muted: #64748b;      /* slate-500 */

/* Tertiary text - subtle */
text-tertiary: #94a3b8;   /* slate-400 */
```

### Usage Guidelines
- **Primary (#0f172a):** Headings, important text, CTAs
- **Secondary (#475569):** Body text, descriptions
- **Muted (#64748b):** Secondary information, captions
- **Tertiary (#94a3b8):** Placeholders, disabled text

---

## Component Typography

### Buttons
```css
.btn-text {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
    line-height: 1.4;
}
```

### Form Labels
```css
.label {
    font-size: 14px;
    font-weight: 500;
    color: #374151; /* gray-700 */
}
```

### Form Inputs
```css
.input {
    font-size: 16px; /* Minimum for mobile */
    font-weight: 400;
    color: #0f172a;
    placeholder-color: #94a3b8;
}
```

### Links
```css
.link {
    font-weight: 500;
    color: #7c3aed; /* primary-600 */
    text-decoration: none;
    transition: color 0.2s;
}
```

---

## Mobile Typography

### Minimum Sizes
- Body text: **14px** (never smaller)
- Buttons: **14px**
- Labels: **14px**
- Headings: **20px**

### Adjustments
- Increase line height by 0.1 on mobile
- Use slightly larger font sizes for readability
- Ensure adequate tap target sizes (44px minimum)

---

## Utility Classes

### Headings
```html
<h1 class="heading-xl">Extra Large Heading</h1>
<h2 class="heading-lg">Large Heading</h2>
<h3 class="heading-md">Medium Heading</h3>
<h4 class="heading-sm">Small Heading</h4>
```

### Body Text
```html
<p class="body-lg">Large body text for emphasis</p>
<p class="body">Standard body text</p>
<p class="body-sm">Small body text</p>
<p class="body-xs">Extra small text (use sparingly)</p>
```

### Text Colors
```html
<span class="text-primary">Primary text</span>
<span class="text-secondary">Secondary text</span>
<span class="text-muted">Muted text</span>
<span class="text-tertiary">Tertiary text</span>
```

---

## Best Practices

### ✅ DO
- Use the defined type scale consistently
- Maintain proper contrast ratios (WCAG AA minimum)
- Test typography on actual devices
- Use semantic HTML (h1-h6, p, etc.)
- Keep line lengths between 45-75 characters

### ❌ DON'T
- Use more than 3 font weights in one view
- Go below 14px for body text
- Use pure black (#000) for text
- Mix different font families
- Use all caps for long text

---

## Accessibility

### Contrast Ratios
- Normal text: **4.5:1** minimum
- Large text (18px+): **3:1** minimum
- UI components: **3:1** minimum

### Focus States
- Always visible focus indicators
- Minimum 2px outline
- Sufficient contrast with background

### Screen Readers
- Use semantic HTML
- Don't rely on visual styling alone
- Provide adequate spacing for readability

---

## Implementation

### Tailwind Configuration
```javascript
// tailwind.config.js
theme: {
    extend: {
        fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        fontSize: {
            'xs': ['0.75rem', { lineHeight: '1rem' }],
            'sm': ['0.875rem', { lineHeight: '1.25rem' }],
            'base': ['1rem', { lineHeight: '1.5rem' }],
            'lg': ['1.125rem', { lineHeight: '1.75rem' }],
            'xl': ['1.25rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        },
    },
}
```

### Google Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## Examples

### Hero Section
```html
<h1 class="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 leading-tight">
    Build better products
</h1>
<p class="mt-4 text-lg text-gray-600 max-w-2xl">
    The all-in-one platform for modern teams.
</p>
```

### Card Component
```html
<div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <h3 class="text-lg font-semibold text-gray-900">Card Title</h3>
    <p class="mt-2 text-sm text-gray-500">
        Description text goes here with proper contrast.
    </p>
</div>
```

### Form
```html
<label class="block text-sm font-medium text-gray-700">
    Email address
</label>
<input 
    type="email" 
    class="mt-1 block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    placeholder="you@example.com"
>
```

---

## Resources

- [Inter Font](https://rsms.me/inter/)
- [Tailwind CSS Typography](https://tailwindcss.com/docs/typography)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design Typography](https://material.io/design/typography/the-type-system.html)