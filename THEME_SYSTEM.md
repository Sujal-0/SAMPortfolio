# Premium Portfolio Theme System

> A complete design system for a dark luxury, precision-based, cinematic portfolio. Built from the visual identity of an elite developer/designer portfolio with terminal heritage and minimal excellence.

## 1️⃣ THEME FOUNDATION

### 1.1 Color Palette

#### Primary Colors (Surfaces & Backgrounds)

```css
--color-bg-primary: #0a0a0a; /* Deep black, primary background */
--color-bg-secondary: #0f0f0f; /* Slightly lighter, card backgrounds */
--color-bg-tertiary: #121212; /* Subtle contrast, hover states */
--color-bg-elevated: #1a1a1a; /* Highest elevation, modals/overlays */
--color-surface-subtle: #141414; /* Dividers, faint backgrounds */
```

#### Text & Typography Colors

```css
--color-text-primary: #ffffff; /* Primary text, high contrast */
--color-text-secondary: #a1a1aa; /* Secondary text, accent color */
--color-text-tertiary: #71717a; /* Tertiary text, labels, metadata */
--color-text-muted: #52525b; /* Very muted, disabled, helper text */
--color-text-faded: #3f3f46; /* Extremely muted, low priority */
```

#### Border & Line Colors

```css
--color-border-primary: rgba(255, 255, 255, 0.18); /* Primary ruler/borders */
--color-border-secondary: rgba(255, 255, 255, 0.12); /* Subtle dividers */
--color-border-tertiary: rgba(255, 255, 255, 0.08); /* Very faint, grid lines */
--color-border-major: rgba(255, 255, 255, 0.5); /* Ruler major ticks */
--color-border-mid: rgba(255, 255, 255, 0.28); /* Ruler mid ticks */
--color-border-minor: rgba(255, 255, 255, 0.16); /* Ruler minor ticks */
```

#### Accent & Interactive Colors

```css
--color-accent-primary: #a1a1aa; /* Primary accent (zinc) */
--color-accent-secondary: #71717a; /* Secondary accent (darker zinc) */
--color-accent-hover: #ffffff; /* Hover/focus state */
--color-accent-active: #d4d4d8; /* Active/pressed state */
--color-accent-disabled: #52525b; /* Disabled state */
```

#### Status & Semantic Colors

```css
--color-error: #ef4444; /* Error/danger states */
--color-error-subtle: rgba(239, 68, 68, 0.1); /* Error background */
--color-error-hover: #dc2626; /* Error hover state */
--color-success: #10b981; /* Success states */
--color-success-subtle: rgba(16, 185, 129, 0.1); /* Success background */
--color-warning: #f59e0b; /* Warning states */
--color-warning-subtle: rgba(245, 158, 11, 0.1); /* Warning background */
--color-info: #06b6d4; /* Info states */
--color-info-subtle: rgba(6, 182, 212, 0.1); /* Info background */
```

### 1.2 Background & Pattern Treatment

#### Primary Background

- **Color**: `#0a0a0a`
- **Pattern**: Dot grid overlay
  - `radial-gradient(circle, rgba(255, 255, 255, 0.12) 1px, transparent 1px)`
  - `background-size: 28px 28px`
- **Noise**: Subtle animated noise filter (12% alpha, refresh every 3 frames)
- **Depth**: Flat design—no gradients except transitions

#### Secondary Surface Treatment

```css
/* Scrollbar styling */
::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}
```

### 1.3 Shadow & Glow Language

#### Elevation System

```css
--shadow-none: none;
--shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.4);
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.6);
--shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.8);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.9);
--shadow-focus: 2px solid #ffffff; /* For focus rings */
--shadow-focus-offset: 2px;
```

#### Glow Effects (use sparingly)

```css
--glow-subtle: 0 0 8px rgba(255, 255, 255, 0.08);
--glow-accent: 0 0 12px rgba(161, 161, 170, 0.15);
--glow-active: 0 0 16px rgba(255, 255, 255, 0.2);
```

### 1.4 Ruler & Precision Language

#### Ruler Styling

- **Rail width**: 1px solid `rgba(255, 255, 255, 0.18)`
- **Total ruler height**: 28px (top/bottom strips)
- **Tick system**:
  - Major ticks: `rgba(255, 255, 255, 0.50)`, 5px height
  - Mid ticks: `rgba(255, 255, 255, 0.28)`, 3px height
  - Minor ticks: `rgba(255, 255, 255, 0.16)`, 2px height
- **Spacing**: 10 segments per ruler, ticks point inward
- **Ticks inward rule**:
  - Top ruler: ticks point downward
  - Bottom ruler: ticks point upward
  - Left ruler: ticks point right
  - Right ruler: ticks point left

#### Corner Brackets

```css
/* Corner border helpers */
.corner-bracket {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.corner-tl {
  top: -1px;
  left: -1px;
  border-right: none;
  border-bottom: none;
}
.corner-tr {
  top: -1px;
  right: -1px;
  border-left: none;
  border-bottom: none;
}
.corner-bl {
  bottom: -1px;
  left: -1px;
  border-right: none;
  border-top: none;
}
.corner-br {
  bottom: -1px;
  right: -1px;
  border-left: none;
  border-top: none;
}
```

### 1.5 Card & Panel Styling

#### Card Base

```css
--card-bg: #0f0f0f;
--card-border: 1px solid rgba(255, 255, 255, 0.12);
--card-padding: 24px;
--card-border-radius: 0; /* Sharp corners, precision language */
--card-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
```

#### Panel Variants

```css
/* Minimal panel (borders only) */
.panel-minimal {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 20px;
}

/* Elevated panel (subtle bg) */
.panel-elevated {
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

/* Overlay panel (highest elevation) */
.panel-overlay {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 28px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.8);
}

/* Premium panel (ruled border) */
.panel-premium {
  background: #0f0f0f;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  padding: 24px;
  position: relative;
}
```

### 1.6 Button Styling

#### Primary Button (Inverse Outline)

```css
--btn-primary-color: #ffffff;
--btn-primary-bg: transparent;
--btn-primary-border: 1px solid #ffffff;
--btn-primary-hover-color: #000000;
--btn-primary-hover-bg: #ffffff;
--btn-primary-hover-border: 1px solid #ffffff;
--btn-primary-active-color: #000000;
--btn-primary-active-bg: #d4d4d8;
--btn-primary-active-border: 1px solid #d4d4d8;
--btn-primary-disabled-color: #52525b;
--btn-primary-disabled-bg: transparent;
--btn-primary-disabled-border: 1px solid #52525b;

/* Implementation */
.btn-primary {
  padding: 11px 26px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--btn-primary-color);
  background: var(--btn-primary-bg);
  border: var(--btn-primary-border);
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  color: var(--btn-primary-hover-color);
  background: var(--btn-primary-hover-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.btn-primary:active {
  color: var(--btn-primary-active-color);
  background: var(--btn-primary-active-bg);
  border: var(--btn-primary-active-border);
}

.btn-primary:disabled {
  color: var(--btn-primary-disabled-color);
  background: var(--btn-primary-disabled-bg);
  border: var(--btn-primary-disabled-border);
  cursor: not-allowed;
  opacity: 0.5;
}
```

#### Secondary Button (Accent)

```css
--btn-secondary-color: #a1a1aa;
--btn-secondary-bg: transparent;
--btn-secondary-border: 1px solid #a1a1aa;
--btn-secondary-hover-color: #ffffff;
--btn-secondary-hover-bg: rgba(161, 161, 170, 0.1);
--btn-secondary-hover-border: 1px solid #ffffff;
```

#### Danger Button

```css
--btn-danger-color: #ef4444;
--btn-danger-bg: transparent;
--btn-danger-border: 1px solid #ef4444;
--btn-danger-hover-color: #ffffff;
--btn-danger-hover-bg: #ef4444;
--btn-danger-hover-border: 1px solid #ef4444;
```

### 1.7 Input & Form Styling

#### Input Base

```css
--input-bg: #0f0f0f;
--input-border: 1px solid rgba(255, 255, 255, 0.12);
--input-border-focus: 1px solid #ffffff;
--input-color: #ffffff;
--input-placeholder: #71717a;
--input-padding: 11px 16px;
--input-border-radius: 0;
--input-font-size: 14px;
--input-transition: border-color 0.3s ease;
```

#### Input Implementation

```css
input,
textarea {
  background: var(--input-bg);
  border: var(--input-border);
  color: var(--input-color);
  padding: var(--input-padding);
  border-radius: var(--input-border-radius);
  font-size: var(--input-font-size);
  transition: var(--input-transition);
  font-family: "MainFont", sans-serif;
}

input::placeholder,
textarea::placeholder {
  color: var(--input-placeholder);
}

input:focus,
textarea:focus {
  outline: none;
  border: var(--input-border-focus);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.05);
}

input:disabled,
textarea:disabled {
  background: #0a0a0a;
  color: #52525b;
  cursor: not-allowed;
  opacity: 0.6;
}
```

### 1.8 Divider & Ruler Styling

#### Horizontal Divider (Simple)

```css
.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin: 24px 0;
}

.divider-lg {
  margin: 48px 0;
}

.divider-sm {
  margin: 12px 0;
}
```

#### Horizontal Ruler (Precision)

```css
.ruler-horizontal {
  position: relative;
  width: 100%;
  height: 28px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.ruler-horizontal::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.18);
}

.ruler-tick {
  position: absolute;
  width: 1px;
  background: currentColor;
}

.ruler-tick-major {
  height: 5px;
  color: rgba(255, 255, 255, 0.5);
}
.ruler-tick-mid {
  height: 3px;
  color: rgba(255, 255, 255, 0.28);
}
.ruler-tick-minor {
  height: 2px;
  color: rgba(255, 255, 255, 0.16);
}
```

---

## 2️⃣ TYPOGRAPHY SYSTEM

### 2.1 Font Stack & Usage

#### Primary Font: MainFont (Dune)

- **Usage**: Body text, navigation, UI labels
- **Weight**: 400 (normal)
- **Fallback**: `"MainFont", sans-serif`
- **HTML**: `font-family: "MainFont", sans-serif;`

#### Display Fonts (Font1-5)

- **Font1** (indiasnake): Dramatic hero moments
- **Font2** (sdboo): Accent headings
- **Font3** (vmf): Section titles
- **Font4** (eryx): Project names
- **Font5** (roblox): Special emphasis
- **Usage**: Rotate for typewriter/flip effects; use sparingly for impact
- **Fallback**: Each should have `sans-serif` fallback

### 2.2 Type Scale & Sizing

#### Display Sizes

```css
--type-display-xl: clamp(3.6rem, 10vw, 5.5rem); /* Hero main text */
--type-display-lg: clamp(2.4rem, 8vw, 4rem); /* Section heroes */
--type-display-md: clamp(1.8rem, 6vw, 3rem); /* Major headings */
```

#### Heading Sizes

```css
--type-h1: clamp(1.8rem, 6vw, 3rem); /* Page title */
--type-h2: clamp(1.6rem, 5.5vw, 2.8rem); /* Section heading */
--type-h3: 1.6rem; /* Subsection */
--type-h4: 1.3rem; /* Card title */
--type-h5: 1.1rem; /* Small heading */
```

#### Body Text Sizes

```css
--type-body-lg: 16px; /* Primary body */
--type-body-md: 14px; /* Default body */
--type-body-sm: 13px; /* Secondary text */
--type-body-xs: 12px; /* Tertiary text */
```

#### Mono / Terminal Sizes

```css
--type-mono-lg: 14px; /* Code blocks */
--type-mono-md: 12px; /* Inline code */
--type-mono-sm: 11px; /* Terminal style */
```

### 2.3 Line Height & Spacing Rules

#### Line Height Scale

```css
--line-height-tight: 1.2; /* Display text */
--line-height-snug: 1.375; /* Headings */
--line-height-normal: 1.5; /* Body text */
--line-height-relaxed: 1.75; /* Long-form content */
```

#### Letter Spacing Rules

```css
--letter-spacing-tight: -0.02em; /* Dense display */
--letter-spacing-normal: 0em; /* Standard */
--letter-spacing-wide: 0.04em; /* Emphasis */
--letter-spacing-uppercase: 0.22em; /* All uppercase text */
--letter-spacing-mono: 0.1em; /* Terminal/code */
```

#### Font Weight Distribution

```css
--font-weight-normal: 400; /* Body, regular */
--font-weight-semibold: 600; /* Emphasis */
--font-weight-bold: 700; /* Strong emphasis, labels */
```

### 2.4 Typography Utility Classes

```css
/* Display */
.text-display-xl {
  font-size: var(--type-display-xl);
  line-height: var(--line-height-tight);
  font-weight: 700;
  letter-spacing: var(--letter-spacing-tight);
  font-family: "MainFont", sans-serif;
}

/* Heading */
.text-h1 {
  font-size: var(--type-h1);
  line-height: var(--line-height-snug);
  font-weight: 700;
  letter-spacing: var(--letter-spacing-normal);
  font-family: "MainFont", sans-serif;
}

/* Body */
.text-body {
  font-size: var(--type-body-md);
  line-height: var(--line-height-normal);
  font-weight: 400;
  color: var(--color-text-primary);
  font-family: "MainFont", sans-serif;
}

/* Mono / Terminal */
.text-mono {
  font-family: "Courier New", monospace;
  font-size: var(--type-mono-md);
  letter-spacing: var(--letter-spacing-mono);
  line-height: 1.6;
}

/* Uppercase */
.text-uppercase {
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-uppercase);
  font-weight: 700;
  font-size: 11px;
}

/* Muted text */
.text-muted {
  color: var(--color-text-muted);
  font-size: var(--type-body-sm);
}

.text-faded {
  color: var(--color-text-faded);
  font-size: var(--type-body-xs);
}
```

---

## 3️⃣ MOTION LANGUAGE

### 3.1 Transition Duration Scale

```css
--duration-instant: 0ms; /* Immediate (state changes) */
--duration-fast: 150ms; /* Quick interactions */
--duration-base: 300ms; /* Standard transitions */
--duration-medium: 450ms; /* Reveal animations */
--duration-slow: 600ms; /* Cinematic reveals */
--duration-slower: 900ms; /* Dramatic transitions */
--duration-cinematic: 1400ms; /* 3D flips, complex motion */
```

### 3.2 Easing Curves

#### Primary Easing (Smooth & Snappy)

```css
/* Modern smooth easing: bouncy but controlled */
--ease-default: cubic-bezier(0.22, 1, 0.36, 1);

/* Ease-in: acceleration into animation */
--ease-in: cubic-bezier(0.13, 0, 0.87, 1);

/* Ease-out: deceleration from animation */
--ease-out: cubic-bezier(0.87, 0, 0.13, 1);

/* Ease-in-out: smooth both ways */
--ease-inout: cubic-bezier(0.42, 0, 0.58, 1);

/* Linear: for consistent speed */
--ease-linear: linear;

/* Snappy: immediate then decelerate */
--ease-snappy: cubic-bezier(0.65, 0, 0.35, 1);

/* Dramatic: slow start, fast end */
--ease-dramatic: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### 3.3 Hover & Focus Motion

#### Button Hover

```javascript
// Duration: 300ms
// Easing: cubic-bezier(0.22, 1, 0.36, 1)
// Properties: color, background, box-shadow, border-color
transition: color 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1);
```

#### Link Underline Animation

```css
/* Animate width from 0% to 100% on hover */
transition: width 0.3s ease;

/* Example: underline bar */
.link-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  width: 0%;
  background: #ffffff;
  transition: width 0.3s ease;
}

.link:hover .link-underline {
  width: 100%;
}
```

#### Focus Ring Motion

```css
input:focus,
button:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
  transition:
    outline 0.2s ease,
    outline-offset 0.2s ease;
}
```

### 3.4 Section Reveal Behavior

#### Slide-Up Reveal (Hero & Major Sections)

```javascript
{
  initial: { y: "105%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  transition: {
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
    delay: 0                        // Stagger with delay
  }
}

/* Stagger pattern: 0.08s between items */
/* Item 0: delay 0s, Item 1: delay 0.08s, Item 2: delay 0.16s, etc. */
```

#### Fade-In Reveal (Subtle Sections)

```javascript
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1]
  }
}
```

#### Scale Reveal (Cards & Components)

```javascript
{
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1]
  }
}
```

### 3.5 Scroll Feel & Behavior

#### Smooth Scroll

```css
html {
  scroll-behavior: smooth;
}
```

#### Scroll Parallax (Hero to Section Transitions)

```javascript
// Use Lenis for smooth, physics-based scroll
import Lenis from "lenis";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
```

### 3.6 Interaction Polish Rules

#### Rule: Immediate Visual Feedback

- All buttons/clickable elements should show **instant** feedback (cursor change, color change)
- Never make users wait for motion before seeing a response

#### Rule: Motion Completes Before New Action

- Don't queue animations; let them finish before allowing new interactions
- Lock mechanism: ~900ms after scroll lock

#### Rule: Transitions Should Feel Premium

- Use `cubic-bezier(0.22, 1, 0.36, 1)` as default easing (smooth + slightly bouncy)
- Avoid linear easing; always add natural acceleration/deceleration

#### Rule: Motion Purpose

- Motion should clarify, not confuse
- Use motion to guide attention to important elements
- Avoid motion for motion's sake

### 3.7 Advanced Motion Techniques

#### Blur, Opacity, Glow Usage

```javascript
// Blur: Use for depth, background elements losing focus
opacity: 0.3,
filter: 'blur(8px)',
transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)'

// Glow: Use for accent focus, highlighting interactive elements
boxShadow: '0 0 16px rgba(255, 255, 255, 0.20)',
transition: 'box-shadow 0.3s ease'

// Opacity: Use for progressive disclosure
opacity: [0, 0.5, 1],
transition: { duration: 0.6 }

// Scale: Use for attention-drawing, entrance animations
scale: [0.95, 1],
transition: { duration: 0.45 }
```

#### 3D Flip Animation (Display Fonts)

```javascript
{
  animate: { rotateX: flipCount * 90 },
  transition: {
    duration: 1.4,
    ease: [0.65, 0, 0.35, 1]
  },
  style: {
    transformStyle: "preserve-3d"
  }
}
```

#### Typewriter/Shuffle Effect

```javascript
// Shuffle title on hover or on load
// Iterate through character set at 0.5 character per frame
// Duration: ~300ms for full text
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
for (let i = 0; i < text.length; i++) {
  setTimeout(() => {
    // Replace character with random char, then reveal
  }, i * 28); // 28ms per character = ~35 chars/second
}
```

---

## 4️⃣ COMPONENT THEME RULES

### 4.1 Navbar Styling

#### Layout

- **Position**: Fixed top, full width
- **Height**: 64px (with padding adjustments)
- **Background**: `#0a0a0a` with dot-grid pattern
- **Z-Index**: 100

#### Navigation Button

```css
.nav-button {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #71717a; /* Default: muted */
  background: none;
  border: none;
  padding: 0 0 3px 0;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
}

.nav-button:hover {
  color: #ffffff; /* Hover: bright white */
}

.nav-button::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  width: 0%;
  background: #ffffff;
  transition: width 0.3s ease;
}

.nav-button:hover::after {
  width: 100%;
}
```

#### Navbar Hide Animation

```javascript
// Hide navbar when scrolled past hero (section > 0)
animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
```

### 4.2 Hero Section Styling

#### Layout

- **Min Height**: 100vh
- **Background**: `#0a0a0a` with dot-grid
- **Padding**: 120px 40px 80px (top, left/right, bottom)
- **Alignment**: Center content vertically & horizontally

#### Hero Typography

```css
.hero-title {
  font-size: var(--type-display-xl);
  line-height: var(--line-height-tight);
  font-weight: 700;
  letter-spacing: var(--letter-spacing-tight);
  font-family: "MainFont", sans-serif;
  color: #ffffff;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: var(--type-body-lg);
  line-height: var(--line-height-normal);
  color: #a1a1aa;
  font-weight: 400;
  margin-bottom: 32px;
}
```

#### Hero Motion

```javascript
// Main title: Slide-up reveal
initial: { y: "105%", opacity: 0 }
animate: { y: "0%", opacity: 1 }
transition: {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
  delay: 0
}

// Auto-flip words: 3D rotation every 3000ms
// Font rotates through Font1, Font4, Font5
```

### 4.3 Project Card & Section Styling

#### Card Layout

```css
.project-card {
  background: #0f0f0f;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding: 32px 0;
  margin-bottom: 24px;
  position: relative;
}
```

#### Project Grid (Ruler-Based)

```css
.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 0; /* Cards butt against each other */
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  border-right: 1px solid rgba(255, 255, 255, 0.12);
}
```

#### Title & Shuffle Animation

```javascript
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 }
}

// On hover: ShuffleTitle effect
// Iterate through alphabet + numbers for ~300ms
// Reveals target text character-by-character
```

#### Description Typewriter

```javascript
// TypeDesc component: letter-by-letter reveal
// 28ms per character = natural typing speed
// Includes blinking cursor that fades on complete
```

#### Project Tags

```css
.project-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: #71717a;
  font-family: "MainFont", sans-serif;
  letter-spacing: 0.08em;
}

.tag {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 6px 12px;
  border-radius: 0;
  transition: all 0.3s ease;
}

.tag:hover {
  border-color: #ffffff;
  color: #ffffff;
}
```

### 4.4 About Section Styling

#### Layout

```css
.about-section {
  padding: 64px 40px;
  background: #0a0a0a;
  max-width: 900px;
  margin: 0 auto;
}
```

#### Typography

```css
.about-heading {
  font-size: var(--type-h2);
  font-weight: 700;
  margin-bottom: 24px;
  color: #ffffff;
}

.about-text {
  font-size: var(--type-body-md);
  line-height: var(--line-height-relaxed);
  color: #a1a1aa;
  margin-bottom: 20px;
}
```

### 4.5 Skills Section Styling

#### Skill Grid

```css
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  padding: 40px 20px;
}
```

#### Skill Logo

```css
.skill-logo {
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.skill-logo:hover {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.1);
}
```

#### Logo Loop Animation

```css
/* Infinite rotation for looping skill section */
animation: rotate 8s linear infinite;

@keyframes rotate {
  from {
    transform: translateZ(0) rotateY(0deg);
  }
  to {
    transform: translateZ(0) rotateY(360deg);
  }
}
```

### 4.6 Resume Section Styling

#### Timeline Layout

```css
.resume-timeline {
  position: relative;
  padding-left: 40px;
}

.resume-timeline::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.18),
    transparent
  );
}

.resume-item {
  margin-bottom: 32px;
  position: relative;
}

.resume-item::before {
  content: "";
  position: absolute;
  left: -45px;
  top: 8px;
  width: 8px;
  height: 8px;
  background: #a1a1aa;
  border: 2px solid #0a0a0a;
  border-radius: 50%;
}
```

#### Resume Typography

```css
.resume-title {
  font-size: var(--type-h4);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
}

.resume-subtitle {
  font-size: 13px;
  color: #71717a;
  font-weight: 400;
  margin-bottom: 8px;
}

.resume-description {
  font-size: var(--type-body-sm);
  line-height: var(--line-height-normal);
  color: #a1a1aa;
}
```

### 4.7 Contact Page / Terminal UI

#### Terminal Container

```css
.terminal-container {
  font-family: "Courier New", monospace;
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 24px;
  min-height: 400px;
  max-width: 600px;
  margin: 0 auto;
}
```

#### Terminal Prompt

```css
.terminal-prompt {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #a1a1aa;
}

.terminal-prompt-user {
  color: #10b981;
  font-weight: 700;
}

.terminal-prompt-path {
  color: #06b6d4;
}

.terminal-prompt-symbol {
  color: #a1a1aa;
}
```

#### Terminal Input

```css
.terminal-input {
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: #ffffff;
  font-family: "Courier New", monospace;
}

.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 1em;
  background: #ffffff;
  animation: blink 0.53s infinite;
}

@keyframes blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}
```

### 4.8 Button & Interactive Component Rules

#### Button Sizing

```css
--btn-height-sm: 36px;
--btn-height-md: 44px;
--btn-height-lg: 52px;
--btn-padding-x-sm: 16px;
--btn-padding-x-md: 26px;
--btn-padding-x-lg: 32px;
```

#### Button States

```css
/* Default */
.btn {
  /* defined in button styling */
}

/* Hover */
.btn:hover {
  /* background fill, shadow */
}

/* Active/Pressed */
.btn:active {
  /* darker background, no shadow */
}

/* Disabled */
.btn:disabled {
  /* muted colors, no pointer */
}

/* Focus (Keyboard Navigation) */
.btn:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}
```

### 4.9 Rulers & Corner Borders

#### Ruler Component

```javascript
// HRuler (horizontal)
// Build tick list: N segments × (major + 9 minor) + final major
// Render rail line + individual tick div elements
// Rail: 1px at top or bottom
// Total height: 28px

// VRuler (vertical)
// Similar structure, rotated 90 degrees
// Left/right positioning handled via CSS
```

#### Corner Bracket Component

```css
.corner-bracket {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.corner-tl {
  top: -1px;
  left: -1px;
  border-right: none;
  border-bottom: none;
}
.corner-tr {
  top: -1px;
  right: -1px;
  border-left: none;
  border-bottom: none;
}
.corner-bl {
  bottom: -1px;
  left: -1px;
  border-right: none;
  border-top: none;
}
.corner-br {
  bottom: -1px;
  right: -1px;
  border-left: none;
  border-top: none;
}
```

---

## 5️⃣ DESIGN TOKENS (Implementation-Ready)

### 5.1 CSS Variables (Root)

Save as `src/theme-tokens.css`:

```css
:root {
  /* ─────────────── COLORS ─────────────── */

  /* Backgrounds */
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #0f0f0f;
  --color-bg-tertiary: #121212;
  --color-bg-elevated: #1a1a1a;
  --color-surface-subtle: #141414;

  /* Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: #a1a1aa;
  --color-text-tertiary: #71717a;
  --color-text-muted: #52525b;
  --color-text-faded: #3f3f46;

  /* Borders */
  --color-border-primary: rgba(255, 255, 255, 0.18);
  --color-border-secondary: rgba(255, 255, 255, 0.12);
  --color-border-tertiary: rgba(255, 255, 255, 0.08);
  --color-border-major: rgba(255, 255, 255, 0.5);
  --color-border-mid: rgba(255, 255, 255, 0.28);
  --color-border-minor: rgba(255, 255, 255, 0.16);

  /* Accents */
  --color-accent-primary: #a1a1aa;
  --color-accent-secondary: #71717a;
  --color-accent-hover: #ffffff;
  --color-accent-active: #d4d4d8;
  --color-accent-disabled: #52525b;

  /* Status */
  --color-error: #ef4444;
  --color-error-subtle: rgba(239, 68, 68, 0.1);
  --color-error-hover: #dc2626;
  --color-success: #10b981;
  --color-success-subtle: rgba(16, 185, 129, 0.1);
  --color-warning: #f59e0b;
  --color-warning-subtle: rgba(245, 158, 11, 0.1);
  --color-info: #06b6d4;
  --color-info-subtle: rgba(6, 182, 212, 0.1);

  /* ─────────────── SHADOWS ─────────────── */
  --shadow-none: none;
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.6);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.8);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.9);
  --shadow-focus: 2px solid #ffffff;
  --shadow-focus-offset: 2px;
  --glow-subtle: 0 0 8px rgba(255, 255, 255, 0.08);
  --glow-accent: 0 0 12px rgba(161, 161, 170, 0.15);
  --glow-active: 0 0 16px rgba(255, 255, 255, 0.2);

  /* ─────────────── TYPOGRAPHY ─────────────── */

  /* Display */
  --type-display-xl: clamp(3.6rem, 10vw, 5.5rem);
  --type-display-lg: clamp(2.4rem, 8vw, 4rem);
  --type-display-md: clamp(1.8rem, 6vw, 3rem);

  /* Headings */
  --type-h1: clamp(1.8rem, 6vw, 3rem);
  --type-h2: clamp(1.6rem, 5.5vw, 2.8rem);
  --type-h3: 1.6rem;
  --type-h4: 1.3rem;
  --type-h5: 1.1rem;

  /* Body */
  --type-body-lg: 16px;
  --type-body-md: 14px;
  --type-body-sm: 13px;
  --type-body-xs: 12px;

  /* Mono */
  --type-mono-lg: 14px;
  --type-mono-md: 12px;
  --type-mono-sm: 11px;

  /* Line Height */
  --line-height-tight: 1.2;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Letter Spacing */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide: 0.04em;
  --letter-spacing-uppercase: 0.22em;
  --letter-spacing-mono: 0.1em;

  /* Font Weight */
  --font-weight-normal: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* ─────────────── MOTION ─────────────── */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-medium: 450ms;
  --duration-slow: 600ms;
  --duration-slower: 900ms;
  --duration-cinematic: 1400ms;

  --ease-default: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in: cubic-bezier(0.13, 0, 0.87, 1);
  --ease-out: cubic-bezier(0.87, 0, 0.13, 1);
  --ease-inout: cubic-bezier(0.42, 0, 0.58, 1);
  --ease-linear: linear;
  --ease-snappy: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-dramatic: cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* ─────────────── COMPONENTS ─────────────── */

  /* Cards */
  --card-bg: #0f0f0f;
  --card-border: 1px solid rgba(255, 255, 255, 0.12);
  --card-padding: 24px;
  --card-border-radius: 0;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  /* Inputs */
  --input-bg: #0f0f0f;
  --input-border: 1px solid rgba(255, 255, 255, 0.12);
  --input-border-focus: 1px solid #ffffff;
  --input-color: #ffffff;
  --input-placeholder: #71717a;
  --input-padding: 11px 16px;
  --input-border-radius: 0;
  --input-font-size: 14px;

  /* Buttons */
  --btn-primary-color: #ffffff;
  --btn-primary-bg: transparent;
  --btn-primary-border: 1px solid #ffffff;
  --btn-primary-hover-color: #000000;
  --btn-primary-hover-bg: #ffffff;
  --btn-primary-active-color: #000000;
  --btn-primary-active-bg: #d4d4d8;
  --btn-secondary-color: #a1a1aa;
  --btn-secondary-bg: transparent;
  --btn-secondary-border: 1px solid #a1a1aa;
  --btn-danger-color: #ef4444;
  --btn-danger-hover-bg: #ef4444;

  /* Sizing */
  --btn-height-sm: 36px;
  --btn-height-md: 44px;
  --btn-height-lg: 52px;
  --btn-padding-x-sm: 16px;
  --btn-padding-x-md: 26px;
  --btn-padding-x-lg: 32px;
}
```

### 5.2 Tailwind Configuration Extension

Update `tailwind.config.js`:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0a0a0a",
          secondary: "#0f0f0f",
          tertiary: "#121212",
          elevated: "#1a1a1a",
          subtle: "#141414",
        },
        text: {
          primary: "#ffffff",
          secondary: "#a1a1aa",
          tertiary: "#71717a",
          muted: "#52525b",
          faded: "#3f3f46",
        },
        border: {
          primary: "rgba(255, 255, 255, 0.18)",
          secondary: "rgba(255, 255, 255, 0.12)",
          tertiary: "rgba(255, 255, 255, 0.08)",
        },
        accent: "#a1a1aa",
        error: "#ef4444",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#06b6d4",
      },
      fontSize: {
        display: ["clamp(3.6rem, 10vw, 5.5rem)", { lineHeight: "1.2" }],
        h1: ["clamp(1.8rem, 6vw, 3rem)", { lineHeight: "1.375" }],
        h2: ["clamp(1.6rem, 5.5vw, 2.8rem)", { lineHeight: "1.375" }],
        h3: ["1.6rem", { lineHeight: "1.375" }],
        h4: ["1.3rem", { lineHeight: "1.5" }],
        body: ["14px", { lineHeight: "1.5" }],
        mono: ["12px", { lineHeight: "1.6" }],
      },
      letterSpacing: {
        tight: "-0.02em",
        uppercase: "0.22em",
        mono: "0.1em",
      },
      boxShadow: {
        sm: "0 4px 12px rgba(0, 0, 0, 0.4)",
        md: "0 8px 24px rgba(0, 0, 0, 0.6)",
        lg: "0 12px 32px rgba(0, 0, 0, 0.8)",
        xl: "0 16px 48px rgba(0, 0, 0, 0.9)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        medium: "450ms",
        slow: "600ms",
        slower: "900ms",
        cinematic: "1400ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        snappy: "cubic-bezier(0.65, 0, 0.35, 1)",
        dramatic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      fontFamily: {
        main: ["MainFont", "sans-serif"],
        font1: ["Font1", "sans-serif"],
        font2: ["Font2", "sans-serif"],
        font3: ["Font3", "sans-serif"],
        font4: ["Font4", "sans-serif"],
        font5: ["Font5", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
    },
  },
};
```

### 5.3 Naming Conventions

#### Color Naming

```
--color-{category}-{intensity}
  --color-bg-primary
  --color-text-muted
  --color-border-tertiary
  --color-accent-hover
```

#### Typography Naming

```
--type-{size-category}
  --type-display-xl
  --type-h1
  --type-body-md
  --type-mono-sm
```

#### Motion Naming

```
--duration-{pace}
--ease-{style}
  --duration-fast
  --ease-default
```

#### Component Naming

```
--{component}-{property}-{state}
  --btn-primary-color
  --input-border-focus
  --card-shadow
```

---

## 6️⃣ WHY THIS THEME MATCHES YOUR PORTFOLIO

### Visual Identity Continuity

1. **Dark Luxury Preserved**
   - Your `#0a0a0a` background is the foundation
   - All colors maintain surgical precision and minimal saturation
   - No gradients or glassmorphism—clean, flat, intentional

2. **Precision/Ruler Language Amplified**
   - Ruler components with major/mid/minor ticks (already in Hero)
   - Sharp corners (0 border-radius)
   - Grid-based layout
   - Measurement-focused spacing

3. **Terminal Heritage Honored**
   - Monospace options for code display
   - Typewriter cursor effects (from your ProjectsSection)
   - Shuffle animations for dramatic reveals
   - Technical aesthetic maintained

4. **Cinematic Motion Extended**
   - Default easing `[0.22, 1, 0.36, 1]` (your existing EASE)
   - Slide-up reveals matching your RevealLine component
   - 3D flips for display fonts
   - Smooth scroll with Lenis

5. **Font System Organized**
   - MainFont for all primary UI
   - Font1-5 reserved for dramatic moments
   - Prevents visual chaos, maintains elegance

6. **Component Consistency**
   - Button styling matches InverseOutlineButton
   - Navigation matches your existing navbar
   - Cards maintain your ruled-border aesthetic
   - All components feel like siblings

### Design Philosophy Alignment

- **Premium**: No budget colors, no trendy gradients
- **Minimal**: Every element has purpose
- **Cinematic**: Motion tells story, reveals truth
- **Precision**: Metrics-driven, grid-aligned
- **Developer Quality**: Technical, clean, intentional
- **Timeless**: Won't look dated in 6 months

---

## Implementation Checklist

- [ ] Import `theme-tokens.css` in `src/index.css`
- [ ] Update `tailwind.config.js` with theme extension
- [ ] Use CSS variables in existing components
- [ ] Apply typography utility classes to headings
- [ ] Test motion durations on all transitions
- [ ] Verify dark mode consistency on all pages
- [ ] Test responsive scaling on mobile
- [ ] Audit accessibility (color contrast, focus states)
- [ ] Performance test: noise animation, animations, scroll

---

Generated for: Premium Dark Portfolio with Precision & Cinema  
Version: 1.0  
Last Updated: 2026-04-19
