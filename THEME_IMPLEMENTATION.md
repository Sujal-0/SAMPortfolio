# 🎨 Theme System Implementation Guide

Complete walkthrough for integrating the Premium Portfolio Theme into your React + Vite project.

## Quick Start (3 Steps)

### Step 1: Import Theme Tokens

In your `src/index.css`, add at the very beginning (before `@tailwind` directives):

```css
@import url("./theme-tokens.css");
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 2: Update Tailwind Config

Replace your `tailwind.config.js` with `tailwind.config-extended.js`:

```bash
# Backup your current config
cp tailwind.config.js tailwind.config.js.backup

# Copy the extended config
cp tailwind.config-extended.js tailwind.config.js
```

### Step 3: Restart Dev Server

```bash
npm run dev
```

---

## File Structure

```
s:/Portfolio-sam/
├── src/
│   ├── index.css              ← Import theme-tokens.css here
│   ├── theme-tokens.css       ← NEW: CSS custom properties
│   ├── App.css
│   ├── App.jsx
│   └── components/
├── tailwind.config.js         ← Updated with new colors/scale
├── THEME_SYSTEM.md            ← Comprehensive design documentation
└── THEME_IMPLEMENTATION.md    ← This file
```

---

## Using the Theme System

### 1️⃣ CSS Variables (Recommended for Maximum Control)

In any CSS file or inline styles, use the custom properties:

```css
/* Background */
background-color: var(--color-bg-primary);
background-color: var(--color-bg-secondary);
background-color: var(--color-bg-elevated);

/* Text Colors */
color: var(--color-text-primary);
color: var(--color-text-secondary);
color: var(--color-text-muted);

/* Borders */
border: var(--card-border);
border: 1px solid var(--color-border-primary);

/* Shadows */
box-shadow: var(--shadow-md);

/* Motion */
transition: all var(--duration-base) var(--ease-default);
```

### 2️⃣ Tailwind Classes

If you prefer Tailwind's utility-first approach:

```jsx
<div className="bg-bg-primary text-text-primary">
  <h1 className="text-h1 font-bold text-primary">Welcome</h1>
  <p className="text-body-md text-secondary">Hello world</p>
  <button className="px-6 py-3 border border-primary transition-base hover:bg-white hover:text-black">
    Click Me
  </button>
</div>
```

### 3️⃣ Hybrid Approach (Best)

Use Tailwind for layout & spacing, CSS variables for colors & motion:

```jsx
<div className="flex gap-4 p-6 bg-bg-secondary">
  <div
    className="flex-1 p-6 border transition-smooth"
    style={{
      borderColor: "var(--color-border-primary)",
      backgroundColor: "var(--color-bg-tertiary)",
      boxShadow: "var(--shadow-sm)",
    }}
  >
    Content
  </div>
</div>
```

---

## Theme Variables Reference

### Color System

#### Primary

```css
/* Use in most scenarios */
color: var(--color-text-primary); /* #ffffff */
background: var(--color-bg-primary); /* #0a0a0a */
border: 1px solid var(--color-border-primary); /* rgba(255,255,255,0.18) */
```

#### Secondary (Accents)

```css
/* Use for secondary information */
color: var(--color-text-secondary); /* #a1a1aa */
background: var(--color-bg-secondary); /* #0f0f0f */
border: 1px solid var(--color-border-secondary); /* rgba(255,255,255,0.12) */
```

#### Status Colors

```css
/* Errors */
color: var(--color-error);
background: var(--color-error-subtle);

/* Success */
color: var(--color-success);
background: var(--color-success-subtle);

/* Warning, Info (similar pattern) */
```

### Typography

#### Display Text (Hero)

```css
font-size: var(--type-display-xl); /* clamp(3.6rem, 10vw, 5.5rem) */
line-height: var(--line-height-tight); /* 1.2 */
font-weight: 700;
letter-spacing: var(--letter-spacing-tight); /* -0.02em */
```

#### Body Text

```css
font-size: var(--type-body-md); /* 14px */
line-height: var(--line-height-normal); /* 1.5 */
font-weight: 400;
```

#### Uppercase Labels

```css
font-size: 11px;
text-transform: uppercase;
letter-spacing: var(--letter-spacing-uppercase); /* 0.22em */
font-weight: 700;
```

### Motion

#### Quick Interaction

```javascript
transition: all 0.3s var(--ease-default);
// OR
transition: all var(--duration-base) var(--ease-default);
```

#### Section Reveal

```javascript
animate={{ y: "0%", opacity: 1 }}
transition={{
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],  // var(--ease-default)
  delay: 0
}}
```

#### Cinematic 3D

```javascript
animate={{ rotateX: 90 }}
transition={{
  duration: 1.4,
  ease: [0.65, 0, 0.35, 1]  // var(--ease-snappy)
}}
```

---

## Component Implementation Examples

### Button Component

```jsx
// components/Button.jsx
import React from "react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  ...props
}) {
  const baseStyles = {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    border: "none",
    borderRadius: 0,
    cursor: "pointer",
    transition: "all var(--duration-base) var(--ease-default)",
    fontFamily: '"MainFont", sans-serif',
  };

  const variants = {
    primary: {
      color: "var(--btn-primary-color)",
      backgroundColor: "var(--btn-primary-bg)",
      border: "var(--btn-primary-border)",
    },
    secondary: {
      color: "var(--btn-secondary-color)",
      backgroundColor: "var(--btn-secondary-bg)",
      border: "var(--btn-secondary-border)",
    },
    danger: {
      color: "var(--btn-danger-color)",
      backgroundColor: "var(--btn-danger-bg)",
      border: "var(--btn-danger-border)",
    },
  };

  const sizes = {
    sm: { padding: "8px 16px", fontSize: "10px" },
    md: { padding: "11px 26px", fontSize: "11px" },
    lg: { padding: "14px 32px", fontSize: "12px" },
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
      }}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Card Component

```jsx
// components/Card.jsx
import React from "react";

export function Card({ children, variant = "minimal" }) {
  const styles = {
    minimal: {
      background: "transparent",
      border: "1px solid var(--color-border-primary)",
      padding: "20px",
    },
    elevated: {
      background: "var(--color-bg-secondary)",
      border: "1px solid var(--color-border-primary)",
      padding: "24px",
      boxShadow: "var(--shadow-md)",
    },
    overlay: {
      background: "var(--color-bg-elevated)",
      border: "1px solid var(--color-border-primary)",
      padding: "28px",
      boxShadow: "var(--shadow-lg)",
    },
  };

  return <div style={styles[variant]}>{children}</div>;
}
```

### Divider Component

```jsx
// components/Divider.jsx
export function Divider({ size = "md" }) {
  const sizeMap = {
    sm: "var(--space-3)",
    md: "var(--space-6)",
    lg: "var(--space-16)",
  };

  return (
    <div
      style={{
        height: "1px",
        background: "var(--color-border-secondary)",
        margin: `${sizeMap[size]} 0`,
      }}
    />
  );
}
```

### Text Component

```jsx
// components/Text.jsx
export function Heading({ as = "h1", children, size = "md" }) {
  const Tag = as;
  const sizes = {
    sm: { fontSize: "var(--type-h4)", fontWeight: 700 },
    md: { fontSize: "var(--type-h2)", fontWeight: 700 },
    lg: { fontSize: "var(--type-display-lg)", fontWeight: 700 },
  };

  return (
    <Tag
      style={{
        color: "var(--color-text-primary)",
        fontFamily: '"MainFont", sans-serif',
        ...sizes[size],
      }}
    >
      {children}
    </Tag>
  );
}

export function Body({ children, muted = false }) {
  return (
    <p
      style={{
        fontSize: "var(--type-body-md)",
        lineHeight: "var(--line-height-normal)",
        color: muted ? "var(--color-text-muted)" : "var(--color-text-primary)",
        fontFamily: '"MainFont", sans-serif',
      }}
    >
      {children}
    </p>
  );
}
```

---

## Motion Implementation Patterns

### Slide-Up Reveal (Hero, Section Intros)

```jsx
import { motion } from "framer-motion";

<motion.div
  initial={{ y: "105%", opacity: 0 }}
  animate={{ y: "0%", opacity: 1 }}
  transition={{
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
    delay: 0,
  }}
>
  Reveal Content
</motion.div>;
```

### Staggered Children

```jsx
<motion.div>
  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ y: "105%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.08, // 80ms stagger
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Hover Effects

```jsx
<motion.button
  whileHover={{
    scale: 1.02,
    boxShadow: "var(--shadow-md)",
  }}
  whileTap={{
    scale: 0.98,
  }}
  transition={{
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1],
  }}
>
  Hover Me
</motion.button>
```

### 3D Flip (Display Fonts)

```jsx
<motion.div
  animate={{ rotateX: angle }}
  transition={{
    duration: 1.4,
    ease: [0.65, 0, 0.35, 1],
  }}
  style={{
    transformStyle: "preserve-3d",
  }}
>
  {/* Content */}
</motion.div>
```

---

## Common Use Cases

### 1. Dark Mode Navigation

```jsx
<nav
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "64px",
    background: "var(--color-bg-primary)",
    borderBottom: "1px solid var(--color-border-secondary)",
    zIndex: "100",
  }}
>
  {/* Navigation items */}
</nav>
```

### 2. Hero Section

```jsx
<section
  style={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--color-bg-primary)",
    backgroundImage:
      "radial-gradient(circle, rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
    padding: "120px 40px 80px",
  }}
>
  <h1
    style={{
      fontSize: "var(--type-display-xl)",
      color: "var(--color-text-primary)",
    }}
  >
    Welcome
  </h1>
</section>
```

### 3. Project Card Grid

```jsx
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "var(--space-6)",
    padding: "var(--space-8)",
  }}
>
  {projects.map((project) => (
    <div
      key={project.id}
      style={{
        background: "var(--color-bg-secondary)",
        border: "var(--card-border)",
        padding: "var(--card-padding)",
        boxShadow: "var(--shadow-sm)",
        transition: "all var(--duration-base) var(--ease-default)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.borderColor = "var(--color-border-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.borderColor = "var(--color-border-secondary)";
      }}
    >
      {/* Project content */}
    </div>
  ))}
</div>
```

### 4. Input Field with Focus

```jsx
<input
  type="text"
  placeholder="Enter text..."
  style={{
    background: "var(--input-bg)",
    border: "var(--input-border)",
    color: "var(--input-color)",
    padding: "var(--input-padding)",
    fontSize: "var(--input-font-size)",
    fontFamily: '"MainFont", sans-serif',
    transition: "all var(--duration-base) var(--ease-default)",
    outline: "none",
  }}
  onFocus={(e) => {
    e.target.style.borderColor = "var(--color-accent-hover)";
    e.target.style.boxShadow = "inset 0 0 0 2px rgba(255, 255, 255, 0.05)";
  }}
  onBlur={(e) => {
    e.target.style.borderColor = "var(--color-border-secondary)";
    e.target.style.boxShadow = "none";
  }}
/>
```

---

## Performance Optimization Tips

### 1. Minimize Recomputes

```javascript
// ❌ BAD: Recomputes on every render
<div style={{ backgroundColor: 'var(--color-bg-primary)' }} />

// ✅ GOOD: Use CSS classes
<div className="bg-bg-primary" />
```

### 2. Use CSS for Motion (Not JS)

```css
/* ✅ GOOD: GPU-accelerated */
.button {
  transition: transform 0.3s var(--ease-default);
}
.button:hover {
  transform: scale(1.02);
}

/* ❌ AVOID: Janky, JS-driven */
onMouseEnter={() => setScale(1.02)}
```

### 3. Lazy Motion for Large Lists

```javascript
// Only animate items in viewport
import { useInView } from "react-intersection-observer";

export function LazyRevealItem({ item }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.45 }}
    >
      {item}
    </motion.div>
  );
}
```

---

## Troubleshooting

### Q: Variables not working in some components?

**A:** Make sure `theme-tokens.css` is imported FIRST in `index.css`, before Tailwind directives.

### Q: Colors look different on different pages?

**A:** Check if any component or page CSS is overriding the theme variables. Search for hardcoded colors and replace with variables.

### Q: Motion feels slow/sluggish?

**A:** Check browser DevTools Performance tab. If FPS drops during transitions:

- Reduce number of animated elements
- Use `will-change: transform` for GPU acceleration
- Simplify animation keyframes

### Q: Tailwind classes not applying?

**A:** Restart dev server after updating `tailwind.config.js`. Tailwind rebuild can be slow.

---

## Next Steps

1. **Test in Dev**: `npm run dev` and navigate through sections
2. **Visual Audit**: Compare against existing portfolio—do colors/spacing match?
3. **Performance**: Run `npm run build` and check bundle size
4. **Mobile Test**: Test on mobile (768px breakpoint)
5. **Browser Testing**: Test in Chrome, Firefox, Safari

---

## Support & Reference

- **Design System**: See `THEME_SYSTEM.md` for complete design rules
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion
- **CSS Variables**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*

---

Generated: 2026-04-19  
Theme Version: 1.0  
Portfolio: Premium Dark • Precision-Based • Cinematic
