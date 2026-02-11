# Email MVP Design System — Executive Dashboard

## Project Context
Next.js 16 + Tailwind CSS v4 project. Professional executive dashboard for morning email digest — Linear/Notion-inspired aesthetic.

**CRITICAL: Newspaper aesthetic completely removed. This is now a clean, modern dashboard.**

## Typography
- **Single font family**: Inter (sans-serif) for all text
- **Removed fonts**: Playfair Display and Lora (newspaper aesthetic removed)
- **Font smoothing**: -webkit-font-smoothing and -moz-osx-font-smoothing enabled
- **Base size**: 15px with line-height 1.6
- **Hierarchy**: Relies on weight (medium/semibold/bold) and size, not font family

## Color Palette (Dashboard/Slate-based)
- Background: #f8fafc (slate-50)
- Foreground: #0f172a (slate-900)
- Muted: #64748b (slate-500)
- Border: #e2e8f0 (slate-200)
- Card: #ffffff (white)
- Card hover: #f1f5f9 (slate-100)

## Accent Colors (Professional)
- Red: #dc2626 (bg: #fef2f2)
- Amber: #f59e0b (bg: #fffbeb)
- Blue: #3b82f6 (bg: #eff6ff)
- Green: #10b981 (bg: #f0fdf4)
- Gray: #6b7280 (bg: #f9fafb)

## Spacing Scale (Dashboard Rhythm)
- Tighter than editorial layouts
- Vertical gaps: 4, 6, 8, 12, 16, 24
- Card padding: 16px (p-4) standard
- Container: max-w-5xl with px-4/6/8 responsive

## Key Patterns

### Masthead as Dashboard Header
- Horizontal layout with metrics on right
- Clean border-bottom separator
- No ornamental rules or decorative elements

### Executive Summary Card
- Rounded border card with subtle shadow
- Category counts as badge pills with borders
- Contained visual element

### Tab Navigation
- Clean underline pattern (blue accent for active)
- Count badges integrated into tabs (rounded pills)
- Border-bottom on tab container

### Email Items as Cards
- Rounded cards with border
- Hover state: border color change + subtle shadow
- Action badges displayed as colored pills in top-right
- Tags as small background badges (not uppercase text)

### Category Sections
- Minimal headers (no heavy borders or backgrounds)
- Emoji + label + count
- Cards stacked with small gaps (space-y-2)

## Accessibility
- Focus states: 2px solid blue outline with 2px offset
- All interactive elements have visible hover states
- Semantic HTML maintained
- Proper heading hierarchy

## Removed Elements (Critical)
- **Drop-cap CSS class** — completely removed from globals.css
- **Ornamental horizontal rules** — no double rules, no decorative dividers
- **Diamond end marks** — removed from footer
- **Warm cream palette** — replaced with neutral slate
- **Serif typography** — no Playfair Display, no Lora

## Common Dashboard Patterns Used
1. Card-based layouts with borders and hover states
2. Badge/pill components for counts and status
3. Clean tab navigation with active underlines
4. Metric displays (large number + small label)
5. Subtle background fills for sections/callouts
6. Consistent border-radius on interactive elements

## Mobile Considerations
- Responsive padding (px-4 → px-6 → px-8)
- Tab navigation wraps gracefully
- Card layouts stack naturally
- Metrics layout adjusts on small screens
