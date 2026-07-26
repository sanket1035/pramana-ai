---
name: Pramāṇa Research OS
colors:
  surface: '#151310'
  surface-dim: '#151310'
  surface-bright: '#3c3836'
  surface-container-lowest: '#100e0b'
  surface-container-low: '#1e1b19'
  surface-container: '#221f1c'
  surface-container-high: '#2d2927'
  surface-container-highest: '#383431'
  on-surface: '#e8e1dd'
  on-surface-variant: '#dbc2b0'
  inverse-surface: '#e8e1dd'
  inverse-on-surface: '#33302d'
  outline: '#a38c7c'
  outline-variant: '#554336'
  surface-tint: '#ffb77d'
  primary: '#ffb77d'
  on-primary: '#4d2600'
  primary-container: '#d97707'
  on-primary-container: '#432100'
  inverse-primary: '#904d00'
  secondary: '#cac6c1'
  on-secondary: '#32302d'
  secondary-container: '#484743'
  on-secondary-container: '#b8b4b0'
  tertiary: '#96ccff'
  on-tertiary: '#003353'
  tertiary-container: '#0297e8'
  on-tertiary-container: '#002c48'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcc3'
  primary-fixed-dim: '#ffb77d'
  on-primary-fixed: '#2f1500'
  on-primary-fixed-variant: '#6e3900'
  secondary-fixed: '#e6e2dc'
  secondary-fixed-dim: '#cac6c1'
  on-secondary-fixed: '#1d1b18'
  on-secondary-fixed-variant: '#484743'
  tertiary-fixed: '#cee5ff'
  tertiary-fixed-dim: '#96ccff'
  on-tertiary-fixed: '#001d32'
  on-tertiary-fixed-variant: '#004a75'
  background: '#151310'
  on-background: '#e8e1dd'
  surface-variant: '#383431'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md-mobile:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-reading:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-ui:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-mono:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  sidebar-width: 260px
  max-content-width: 1200px
  report-width: 720px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system is built on the philosophy of "Absolute Clarity." It serves as a professional operating system for multi-agent research, where the UI acts as a silent, sophisticated scaffold for dense information. The aesthetic is **Editorial Minimalism**—a blend of high-end Swiss typography and modern functionalism.

The emotional response should be one of "quiet authority" and "unwavering focus." By stripping away unnecessary ornamentation and avoiding the typical "AI neon" tropes, the design system establishes a sense of timelessness and academic rigor suitable for high-stakes enterprise fact-verification.

- **Minimalism:** Aggressive use of white space to separate complex data streams.
- **Precision:** Fine lines (0.5pt to 1pt) and monospaced accents for technical metadata.
- **Editorial:** Large serif headers for long-form reports to reduce eye strain and signal credibility.

## Colors
The palette is rooted in high-contrast "Ink and Paper" logic, utilizing warm neutrals to avoid the clinical coldness of pure black/white.

- **Backgrounds:** The primary experience uses a "Graphite" (#1B1A17) base for focus. The "Paper" (#FAF9F6) mode is used for exporting reports or reading long-form generated content.
- **Accent:** Amber (#D97706) is the only chromatic driver. It is reserved strictly for active interactive states, primary CTAs, and pinpointing critical verified data.
- **Status:** We depart from the traffic-light system. Confidence is communicated through opacity and stroke weight:
    - *High Confidence:* Solid strokes / opaque icons.
    - *Low Confidence:* Dashed strokes / 40% opacity icons.
- **Borders:** Use a subtle "Stone" tint (#2E2C29 for dark, #E7E5E4 for light) to define structure without visual noise.

## Typography
This design system employs a dual-type strategy: **Source Serif 4** for the "Knowledge Layer" (reports, citations, findings) and **Inter/Geist** for the "Action Layer" (sidebar, tools, settings).

- **Reading Experience:** For long-form report text, the line length must be constrained to 650px (approx. 60-75 characters) and centered or left-aligned with generous margins to mimic an academic journal.
- **Technical Accents:** Use **Geist** for agent logs, timestamps, and confidence scores to provide a modern, developer-adjacent feel.
- **Scale:** Maintain high contrast between headlines and body. All UI labels should use Inter to ensure legibility at small sizes.

## Layout & Spacing
The layout follows a **Fixed-Fluid hybrid** model. The sidebar and utility panels are fixed, while the central research canvas is fluid up to a maximum legible width.

- **Grid:** A 12-column grid is used for the dashboard view. For the "Research View," a single-column layout with a 720px container is enforced to maintain focus.
- **Vertical Rhythm:** Spacing follows a 4px baseline. Components use 8px, 16px, or 24px increments for padding.
- **Responsive Behavior:** 
    - **Desktop:** 3-pane layout (Sidebar | Main Content | Inspector).
    - **Tablet:** Sidebar collapses to an icon-only rail; Inspector moves to a bottom sheet.
    - **Mobile:** Single-stack view. Sidebar becomes a full-screen drawer triggered by a command icon.

## Elevation & Depth
This design system rejects heavy shadows in favor of **Tonal Layering** and **Fine Outlines**.

- **Surfaces:** Depth is achieved by varying the background brightness. Level 0 is the base (#1B1A17). Level 1 (Cards/Sidebar) uses a slightly lighter charcoal.
- **Borders:** Use 1px solid borders for all container divisions. This creates a "blueprint" feel that suggests precision.
- **Glassmorphism:** Only used for the Top Bar/Command Palette background with a subtle blur (12px) to provide context of the content scrolling beneath it, without creating "floaty" UI.
- **Focus:** When an agent is active or a citation is selected, use a subtle Amber glow (bloom) or a high-contrast border rather than a large drop shadow.

## Shapes
The shape language is "Soft-Technical." We avoid fully organic roundness to maintain a professional, architectural feel.

- **Containers:** Cards and primary UI panels use a 4px (Soft) radius.
- **Interactive Elements:** Buttons and Input fields also use 4px.
- **Badges:** Confidence indicators and tags use a slightly larger 6px radius to distinguish them from structural blocks.
- **Icons:** Use sharp or slightly rounded (2px) stroke icons. Avoid "bubbly" or filled icon sets.

## Components
- **Buttons:** Primary buttons are Solid Amber with black text. Secondary buttons are Ghost-style with a fine border. Use `label-mono` for button text to emphasize the OS nature.
- **Confidence Badges:** Instead of colors, use geometric icons (e.g., a solid diamond for "Verified," a hollow circle for "Unverified," and a slashed square for "Contradicted").
- **Sidebar:** Collapsible with a "List-Detail" hierarchy. Use low-contrast text for inactive states, shifting to high-contrast white for active research threads.
- **Command Palette:** The central hub for research. It should feature a translucent background, monospaced shortcuts (e.g., `⌘+K`), and instantaneous filtering.
- **Citations:** Styled like academic footnotes but interactive. On hover, they reveal a mini-card with the source snippet and confidence score.
- **Skeleton Loaders:** Use a subtle pulse animation on "Graphite" containers to represent agents "thinking" or "verifying."
- **Tables:** No vertical lines. Use horizontal rules only. First column is always pinned for data-heavy research grids.