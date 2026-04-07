# Creator Armour DESIGN.md

## 1. Visual Theme & Atmosphere

**Design Philosophy:** Premium SaaS meets creator economy. Clean, modern, and trustworthy with subtle vibrancy.

- **Mood:** Professional yet approachable, empowering creators
- **Density:** Balanced - not too dense, not too sparse
- **Design DNA:** Inspired by Linear, Stripe, Notion, and Vercel
- **Atmosphere:** Trustworthy, modern, premium, accessible

**Key Principles:**
- Clarity over cleverness
- Consistency across all surfaces
- Mobile-first responsive design
- Accessibility as a requirement, not an afterthought

---

## 2. Color Palette & Roles

### Primary Colors

| Name | Hex | Role |
|------|-----|------|
| Primary | `#7c3aed` | Main brand color, CTAs, links, active states |
| Primary Light | `#a78bfa` | Hover states, secondary accents |
| Primary Dark | `#6d28d9` | Pressed states, emphasis |
| Primary Subtle | `#f5f3ff` | Backgrounds, subtle highlights |

### Neutral Colors

| Name | Hex | Role |
|------|-----|------|
| Gray 900 | `#0f172a` | Primary text, headings |
| Gray 600 | `#475569` | Secondary text, body copy |
| Gray 500 | `#64748b` | Muted text, captions |
| Gray 400 | `#94a3b8` | Placeholders, disabled text |
| Gray 300 | `#cbd5e1` | Borders, dividers |
| Gray 200 | `#e2e8f0` | Subtle borders, backgrounds |
| Gray 100 | `#f1f5f9` | Background surfaces |
| Gray 50 | `#f9fafb` | Page background |
| White | `#ffffff` | Cards, elevated surfaces |

### Semantic Colors

| Name | Hex | Role |
|------|-----|------|
| Success | `#10b981` | Positive actions, earnings, growth |
| Warning | `#f59e0b` | Caution states, pending deals |
| Error | `#ef4444` | Errors, declined offers |
| Info | `#3b82f6` | Informational messages |

---

## 3. Typography Rules

**Font Family:** Inter (Google Fonts)  
**Fallback:** system-ui, -apple-system, sans-serif

### Type Scale

| Name | Size | Weight | Line Height | Letter Spacing | Usage |
|------|------|--------|-------------|----------------|-------|
| Heading XL | 32px | 700 | 1.1 | -0.03em | Hero titles |
| Heading L | 24px | 600 | 1.2 | -0.02em | Page titles |
| Heading M | 20px | 600 | 1.3 | -0.01em | Section headers |
| Body Large | 18px | 500 | 1.5 | -0.01em | Lead paragraphs |
| Body | 16px | 400 | 1.7 | 0.005em | Main content |
| Small | 14px | 400 | 1.6 | 0.01em | Captions, labels |
| XSmall | 12px | 400 | 1.5 | 0.02em | Meta info |

### Weight Guidelines
- **700 (Bold):** Only for h1, h2, critical emphasis
- **600 (Semibold):** Section titles, important labels
- **500 (Medium):** Buttons, links, subtle emphasis
- **400 (Normal):** All body text

---

## 4. Component Stylings

### Buttons

**Primary Button:**
```css
background: #7c3aed;
color: white;
padding: 12px 20px;
border-radius: 12px;
font-weight: 500;
font-size: 14px;
letter-spacing: 0.02em;
transition: all 0.2s ease-out;
```

**Secondary Button:**
```css
background: white;
color: #374151;
border: 1px solid #e5e7eb;
padding: 12px 20px;
border-radius: 12px;
font-weight: 500;
font-size: 14px;
```

**Ghost Button:**
```css
background: transparent;
color: #6b7280;
padding: 12px 20px;
border-radius: 12px;
font-weight: 500;
font-size: 14px;
```

### Cards

```css
background: white;
border: 1px solid #e5e7eb;
border-radius: 16px;
padding: 24px;
box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07);
transition: all 0.3s ease-out;
```

**Hover State:**
```css
box-shadow: 0 4px 25px -5px rgba(0, 0, 0, 0.1);
border-color: #c4b5fd;
```

### Inputs

```css
background: white;
border: 1px solid #e5e7eb;
border-radius: 12px;
padding: 12px 16px;
font-size: 16px;
color: #0f172a;
placeholder-color: #94a3b8;
transition: all 0.2s ease-out;
```

**Focus State:**
```css
border-color: #7c3aed;
box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
```

### Navigation

**Bottom Navigation (Mobile):**
```css
background: white;
border-top: 1px solid #e5e7eb;
padding-bottom: env(safe-area-inset-bottom);
```

**Nav Item:**
```css
color: #6b7280;
font-size: 10px;
font-weight: 500;
padding: 8px 4px;
```

**Active Nav Item:**
```css
color: #7c3aed;
```

---

## 5. Layout Principles

### Spacing Scale

| Name | Value | Usage |
|------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Small gaps |
| md | 12px | Component padding |
| lg | 16px | Standard spacing |
| xl | 24px | Section spacing |
| 2xl | 32px | Large gaps |
| 3xl | 48px | Hero spacing |
| 4xl | 64px | Page sections |

### Grid System
- **Mobile:** Single column, full width
- **Tablet:** 2 columns, max-width 768px
- **Desktop:** 3 columns, max-width 1200px

### Whitespace Philosophy
- Generous padding inside cards (24px minimum)
- Clear visual hierarchy with margin
- Breathing room between sections (48px+)
- Content max-width: 65ch for readability

---

## 6. Depth & Elevation

### Shadow System

| Level | Shadow | Usage |
|-------|--------|-------|
| Soft | `0 2px 15px -3px rgba(0,0,0,0.07)` | Cards, elevated surfaces |
| Soft LG | `0 4px 25px -5px rgba(0,0,0,0.1)` | Hover states, modals |
| Soft XL | `0 8px 30px rgba(0,0,0,0.04)` | Floating elements |
| Glow | `0 0 20px rgba(124,58,237,0.15)` | Primary button hover |

### Surface Hierarchy
1. **Page Background:** Gray 50
2. **Card Surface:** White with soft shadow
3. **Elevated Surface:** White with soft-lg shadow
4. **Floating Surface:** White with soft-xl shadow

---

## 7. Do's and Don'ts

### ✅ DO
- Use Inter font consistently
- Maintain 16px minimum for body text
- Use primary color sparingly for emphasis
- Keep cards with rounded-2xl (16px) corners
- Ensure 4.5:1 contrast ratio for text
- Test on mobile first
- Use soft shadows, never harsh ones
- Keep spacing consistent with the scale

### ❌ DON'T
- Use pure black (#000) for text
- Go below 14px for any UI text
- Use more than 3 font weights per view
- Mix different border radius values
- Overuse the primary color
- Use hard borders when shadows work
- Stack too many cards without spacing
- Ignore safe area insets on mobile

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Strategy |
|------|-------|----------|
| Mobile | < 640px | Single column, bottom nav |
| Tablet | 640px - 1024px | 2 columns, side nav optional |
| Desktop | > 1024px | 3 columns, full layout |

### Touch Targets
- Minimum: 44px × 44px
- Buttons: 48px height minimum
- Input fields: 48px height

### Collapsing Strategy
- Desktop: Full sidebar navigation
- Tablet: Collapsible sidebar or top nav
- Mobile: Bottom tab navigation

---

## 9. Agent Prompt Guide

### Quick Color Reference
```
Primary: #7c3aed (violet-600)
Text Primary: #0f172a (slate-900)
Text Secondary: #475569 (slate-600)
Background: #f9fafb (gray-50)
Surface: #ffffff (white)
Border: #e5e7eb (gray-200)
```

### Ready-to-Use Prompts

**"Create a card component"**
→ White background, 16px border-radius, soft shadow, 24px padding, gray-900 title, gray-600 body

**"Create a primary button"**
→ #7c3aed background, white text, 12px 20px padding, 12px border-radius, 500 weight, hover: #6d28d9

**"Create a form input"**
→ White background, 1px gray-200 border, 12px border-radius, 16px font-size, focus: #7c3aed border + ring

**"Create a navigation item"**
→ gray-500 text, 10px font-size, 500 weight, active: #7c3aed, 8px padding

---

## 10. Animation Guidelines

### Transitions
- **Default:** `all 0.2s ease-out`
- **Card hover:** `all 0.3s ease-out`
- **Page transitions:** `opacity 0.3s ease-in-out`

### Micro-interactions
- Button press: `scale(0.97)`
- Card hover: Lift with shadow increase
- Loading: Subtle pulse animation
- Success: Checkmark animation

### Duration
- Fast: 150ms (micro-interactions)
- Normal: 200ms (buttons, links)
- Slow: 300ms (cards, modals)
- Page: 400ms (transitions)

---

*This DESIGN.md follows the Google Stitch format for AI agent compatibility.*