# 🎯 Theme Quick Reference Card

**Premium Portfolio Theme** | Dark Luxury • Precision • Cinema | v1.0

---

## 🎨 COLORS (Copy-Paste Ready)

### Backgrounds

```
#0a0a0a  ← Primary (most used)
#0f0f0f  ← Secondary (cards)
#121212  ← Tertiary (contrast)
#1a1a1a  ← Elevated (modals)
```

### Text

```
#ffffff  ← Primary text
#a1a1aa  ← Secondary (accents)
#71717a  ← Tertiary (labels)
#52525b  ← Muted (disabled)
```

### Borders

```
rgba(255,255,255,0.18)  ← Primary borders
rgba(255,255,255,0.12)  ← Subtle dividers
rgba(255,255,255,0.08)  ← Very faint
```

### Status

```
#ef4444  ← Error (red)
#10b981  ← Success (green)
#f59e0b  ← Warning (amber)
#06b6d4  ← Info (cyan)
```

### CSS Variables

```css
--color-bg-primary        /* #0a0a0a */
--color-text-primary      /* #ffffff */
--color-border-primary    /* rgba(255,255,255,0.18) */
--color-accent-primary    /* #a1a1aa */
```

---

## 📝 TYPOGRAPHY (Go-To Sizes)

### Display/Hero

```
clamp(3.6rem, 10vw, 5.5rem)  ← Extra Large
clamp(2.4rem, 8vw, 4rem)     ← Large
clamp(1.8rem, 6vw, 3rem)     ← Medium
```

### Headings

```
var(--type-h1)  OR  clamp(1.8rem, 6vw, 3rem)     [Tight 1.2]
var(--type-h2)  OR  clamp(1.6rem, 5.5vw, 2.8rem) [Snug 1.375]
var(--type-h3)  OR  1.6rem                        [Snug 1.375]
var(--type-h4)  OR  1.3rem                        [Normal 1.5]
```

### Body

```
var(--type-body-lg)  →  16px  [Normal 1.5]
var(--type-body-md)  →  14px  [Normal 1.5]
var(--type-body-sm)  →  13px  [Normal 1.5]
var(--type-body-xs)  →  12px  [Normal 1.5]
```

### Mono (Code/Terminal)

```
var(--type-mono-lg)  →  14px font-family: "Courier New"
var(--type-mono-md)  →  12px letter-spacing: 0.1em
var(--type-mono-sm)  →  11px line-height: 1.6
```

### Letter Spacing

```
text-transform: uppercase;
letter-spacing: 0.22em;  ← Use for all caps labels

letter-spacing: -0.02em; ← Display text (tighter)
letter-spacing: 0.1em;   ← Mono/terminal text
```

### Font Weights

```
400  ← Normal (body text)
600  ← Semibold (emphasis)
700  ← Bold (headings, labels)
```

---

## ⚡ MOTION (Quick Use)

### Durations

```
150ms   ← Fast interactions
300ms   ← Standard (default)
450ms   ← Medium reveals
600ms   ← Slow reveals
900ms   ← Dramatic transitions
1400ms  ← 3D flips
```

### Easing (Defaults)

```
[0.22, 1, 0.36, 1]        ← DEFAULT (smooth & snappy)
cubic-bezier(0.65, 0, 0.35, 1)  ← Snappy (3D flips)
cubic-bezier(0.25, 0.46, 0.45, 0.94)  ← Dramatic
```

### Motion Patterns

```javascript
// Slide-Up Reveal
initial={{ y: "105%", opacity: 0 }}
animate={{ y: "0%", opacity: 1 }}
transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}

// Stagger (between items)
delay: i * 0.08  // 80ms per item

// 3D Flip
animate={{ rotateX: 90 }}
transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
style={{ transformStyle: "preserve-3d" }}
```

### CSS Transition

```css
transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
/* OR use variables */
transition: all var(--duration-base) var(--ease-default);
```

---

## 🧩 COMPONENTS (Essential)

### Button

```jsx
<button
  style={{
    padding: "11px 26px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#ffffff",
    border: "1px solid #ffffff",
    background: "transparent",
    borderRadius: 0,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  }}
>
  Button
</button>
```

### Card/Panel

```jsx
<div
  style={{
    background: "#0f0f0f",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
    borderRadius: 0,
  }}
>
  Content
</div>
```

### Divider

```jsx
<div
  style={{
    height: "1px",
    background: "rgba(255,255,255,0.12)",
    margin: "24px 0",
  }}
/>
```

### Input

```jsx
<input
  style={{
    background: "#0f0f0f",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#ffffff",
    padding: "11px 16px",
    fontSize: "14px",
    borderRadius: 0,
    fontFamily: '"MainFont", sans-serif',
    transition: "border-color 0.3s ease",
  }}
/>
```

---

## 📐 SPACING (8px Grid)

```
4px   → var(--space-1)
8px   → var(--space-2)
12px  → var(--space-3)
16px  → var(--space-4)
20px  → var(--space-5)
24px  → var(--space-6)
32px  → var(--space-8)
40px  → var(--space-10)
48px  → var(--space-12)
64px  → var(--space-16)
80px  → var(--space-20)
96px  → var(--space-24)
```

**Use in padding/margin:**

```css
padding: var(--space-4); /* 16px */
margin-bottom: var(--space-6); /* 24px */
gap: var(--space-4); /* 16px */
```

---

## 🎭 SHADOWS

```
0 4px 12px rgba(0,0,0,0.4)   ← Small (cards)
0 8px 24px rgba(0,0,0,0.6)   ← Medium (overlays)
0 12px 32px rgba(0,0,0,0.8)  ← Large (modals)
0 16px 48px rgba(0,0,0,0.9)  ← Extra Large
```

**Or use variables:**

```css
box-shadow: var(--shadow-sm); /* Small */
box-shadow: var(--shadow-md); /* Medium */
box-shadow: var(--shadow-lg); /* Large */
```

---

## 🎯 COMMON PATTERNS

### Dark Background with Grid

```css
background: #0a0a0a;
background-image: radial-gradient(
  circle,
  rgba(255, 255, 255, 0.12) 1px,
  transparent 1px
);
background-size: 28px 28px;
```

### Button Hover

```jsx
onMouseEnter={(e) => {
  e.target.style.color = '#000000';
  e.target.style.background = '#ffffff';
}}
onMouseLeave={(e) => {
  e.target.style.color = '#ffffff';
  e.target.style.background = 'transparent';
}}
```

### Card Hover

```jsx
onMouseEnter={(e) => {
  e.target.style.boxShadow = 'var(--shadow-md)';
}}
onMouseLeave={(e) => {
  e.target.style.boxShadow = 'var(--shadow-sm)';
}}
```

### Focus Ring

```css
outline: 2px solid #ffffff;
outline-offset: 2px;
```

### Uppercase Label

```jsx
style={{
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
}}
```

---

## 🚀 QUICK COPY-PASTE TEMPLATES

### Hero Section

```jsx
<section
  style={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "120px 40px 80px",
    background: "#0a0a0a",
    backgroundImage:
      "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
  }}
>
  <h1 style={{ fontSize: "var(--type-display-xl)", color: "#ffffff" }}>
    Title
  </h1>
  <p style={{ fontSize: "var(--type-body-lg)", color: "#a1a1aa" }}>Subtitle</p>
</section>
```

### Grid Layout

```jsx
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    padding: "40px",
  }}
>
  {/* Items */}
</div>
```

### Flex Navbar

```jsx
<nav
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    background: "#0a0a0a",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  }}
>
  {/* Nav items */}
</nav>
```

---

## 🔗 FILE LOCATIONS

```
Tokens CSS:     src/theme-tokens.css
Tailwind Config: tailwind.config.js (or tailwind.config-extended.js)
Import in:      src/index.css
```

**To use variables:**

```css
@import url("./theme-tokens.css");
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ✅ CHECKLIST

- [ ] Import `theme-tokens.css` in `index.css`
- [ ] Update `tailwind.config.js`
- [ ] Restart dev server
- [ ] Replace hardcoded colors with CSS variables
- [ ] Apply typography utility classes
- [ ] Test on mobile (768px)
- [ ] Verify animation smoothness
- [ ] Check accessibility (color contrast, focus states)

---

## 📞 QUICK HELP

**Q: Which color should I use?**

- Backgrounds: `#0a0a0a` (primary), `#0f0f0f` (secondary)
- Text: `#ffffff` (primary), `#a1a1aa` (secondary)
- Borders: `rgba(255,255,255,0.18)` (primary)

**Q: What easing should I use?**

- Default: `[0.22, 1, 0.36, 1]` (smooth & snappy)
- 3D Flips: `[0.65, 0, 0.35, 1]` (snappy)

**Q: What duration should I use?**

- Hover effects: `300ms`
- Reveals: `450ms`
- Dramatic: `900ms`

**Q: How do I make uppercase labels?**

```css
text-transform: uppercase;
letter-spacing: 0.22em;
font-weight: 700;
font-size: 11px;
```

---

**Last Updated:** 2026-04-19 | **Version:** 1.0 | **Status:** Production Ready ✓
