# Claude Code Guidelines — Signal Page

## Design & Color Rules

**Before making any design change, always check the brand palette defined in:**
`Signal-Page/client/src/index.css` — the `:root` block.

### Brand Palette

| CSS Token | Hex | Use |
|---|---|---|
| `--background` | `#f2efe8` | Page background (warm off-white) |
| `--foreground` | `#1A1A1A` | Body text (near-black) |
| `--primary` | `#232323` | Buttons, CTAs, headings |
| `--primary-foreground` | `#f2efe8` | Text on dark buttons |
| `--secondary` | `#ece9e2` | Card backgrounds |
| `--secondary-foreground` | `#1A1A1A` | Text on cards |
| `--muted` | `#e0ddd6` | Dividers |
| `--muted-foreground` | `#888580` | Muted/secondary text |
| `--accent` | `#ffd231` | Brand yellow — borders and decorative accents only |
| `--accent-foreground` | `#232323` | Text placed on yellow backgrounds |
| `--border` | `#e0ddd6` | Warm gray borders |
| `--ring` | `#ffd231` | Focus rings |

### Rules

1. **Never hardcode hex values, RGB, or RGBA colors.** Always use CSS variable tokens.
2. **In Tailwind classes** use tokens like `text-accent`, `bg-primary`, `border-accent`, `bg-accent/20`, etc.
3. **In inline `style` props** use `hsl(var(--accent))`, `hsl(var(--primary))`, etc.
4. **In Framer Motion `animate` props** (which need resolved values) use the same `hsl(var(--token))` syntax.
5. **The accent yellow (`--accent`)** is for borders, icons, and decorative elements — not for body text, as it is not readable on light backgrounds.
6. **Do not invent new colors.** If a design need cannot be met with the existing palette, flag it to the user and ask before adding anything to `index.css`.

### Fonts

| Token | Family | Use |
|---|---|---|
| `--font-body` | DM Sans | All body/UI text — use `font-sans` |
| `--font-display` | Playfair Display | Headings (h1–h6) — applied globally |

---

## Project Structure

```
Signal-Page/
  client/src/
    index.css              ← Brand tokens (single source of truth)
    components/            ← Reusable section components
    pages/                 ← Route-level pages (Home, About, LeadMagnet, etc.)
```

---

## Git

- Branch: `claude/general-session-KIGZe`
- Always commit and push to this branch; never push to `main`.
