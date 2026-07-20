"""Regenerate the social share card at client/public/og-image.png.

Usage:
    python scripts/make-og-image.py

Requires Pillow (`pip install Pillow`). Fonts are downloaded once from
the Google Fonts repo into scripts/.font-cache/ and reused after that.

Why this exists: the logo must be Playfair Display on every surface per
CLAUDE.md, and Playfair is far wider than a geometric sans at the same
point size. The layout is therefore measurement-driven -- everything is
positioned off measured bounding boxes, so editing the copy below cannot
silently push text out of frame.

IMPORTANT -- the safe zone. LinkedIn and Facebook show the full 1200x630,
but WhatsApp, Telegram and iMessage crop to a centered SQUARE thumbnail,
keeping only x=285..915 and discarding both edges. So the composition is
centered and constrained to that square: a wide left-to-right split
renders as unreadable fragments in every chat app. The script asserts
this at the end and fails if content escapes the safe zone.

Colors are literal brand hex values because image files cannot use the
CSS tokens (CLAUDE.md rule 7). Keep them in sync with index.css.
"""
import os
import urllib.request

from PIL import Image, ImageDraw, ImageFont

# --- Brand palette (mirrors :root in client/src/index.css) ---
BG = "#f2efe8"        # --background
INK = "#1A1A1A"       # --foreground
MUTED = "#232323"     # --primary

# --- Content ---
LOGO = "signal."
KICKER = "LIFECYCLE EMAIL"
TAGLINE = [
    "TURN BEHAVIORAL SIGNALS INTO",
    "EMAILS THAT PUSH USERS TO THEIR",
    "NEXT “HELL YES” MOMENT!",
]

# --- Canvas ---
W, H = 1200, 630      # standard OG dimensions; don't change casually
LOGO_TARGET_W = 340   # must leave room inside the safe zone

# Chat apps crop to a centered square. Content must stay inside it.
SAFE_W = H            # 630px wide, centered
SAFE_PAD = 24         # breathing room inside the crop edge

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, ".font-cache")
OUT = os.path.join(HERE, "..", "client", "public", "og-image.png")

FONTS = {
    "playfair.ttf": "https://github.com/google/fonts/raw/main/ofl/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf",
    "dmsans.ttf": "https://github.com/google/fonts/raw/main/ofl/dmsans/DMSans%5Bopsz%2Cwght%5D.ttf",
}


def font_path(name):
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, name)
    if not os.path.exists(path):
        print(f"Downloading {name}...")
        urllib.request.urlretrieve(FONTS[name], path)
    return path


def font(name, size, weight, opsz=None):
    f = ImageFont.truetype(font_path(name), size)
    f.set_variation_by_axes([weight] if opsz is None else [opsz, weight])
    return f


def draw_tracked(d, xy, text, f, fill, tracking):
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=f, fill=fill)
        x += d.textlength(ch, font=f) + tracking


def tracked_width(d, text, f, tracking):
    if not text:
        return 0
    return sum(d.textlength(c, font=f) for c in text) + tracking * (len(text) - 1)


def sparkle(d, cx, cy, r, fill):
    """Four-pointed star with concave sides."""
    w = r * 0.28
    d.polygon(
        [
            (cx, cy - r), (cx + w, cy - w), (cx + r, cy),
            (cx + w, cy + w), (cx, cy + r), (cx - w, cy + w),
            (cx - r, cy), (cx - w, cy - w),
        ],
        fill=fill,
    )


def fit_logo(d, target_w):
    """Binary-ish fit of the logo point size to a target pixel width."""
    size = 150
    f = font("playfair.ttf", size, 800)
    for _ in range(40):
        x0, _, x1, _ = d.textbbox((0, 0), LOGO, font=f)
        w = x1 - x0
        if abs(w - target_w) <= 2:
            break
        size = max(20, int(round(size * target_w / w)))
        f = font("playfair.ttf", size, 800)
    return f, size


def draw_centered(d, cx, y, text, f, fill, tracking):
    """Draw tracked text horizontally centered on cx. Returns (left, right)."""
    w = tracked_width(d, text, f, tracking)
    x = cx - w / 2
    draw_tracked(d, (x, y), text, f, fill, tracking)
    return x, x + w


def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    cx = W / 2

    logo_f, size = fit_logo(d, LOGO_TARGET_W)
    kicker_f = font("dmsans.ttf", 22, 700, 40)
    tag_f = font("dmsans.ttf", 25, 500, 40)
    kicker_track, tag_track = 6.0, 1.5
    line_h = 34

    # Measure every row first so the whole stack can be centered as a unit.
    lx0, ly0, lx1, ly1 = d.textbbox((0, 0), LOGO, font=logo_f)
    _, ky0, _, ky1 = d.textbbox((0, 0), KICKER, font=kicker_f)
    logo_h, kicker_h = ly1 - ly0, ky1 - ky0

    gap_logo_kicker = 22
    gap_kicker_rule = 40
    gap_rule_tag = 40
    tag_h = line_h * len(TAGLINE)

    stack_h = logo_h + gap_logo_kicker + kicker_h + gap_kicker_rule + gap_rule_tag + tag_h
    y = (H - stack_h) / 2

    # Logo, offset by its bbox origin so the ink lands where intended.
    d.text((cx - (lx1 - lx0) / 2 - lx0, y - ly0), LOGO, font=logo_f, fill=INK)
    logo_l, logo_r = cx - (lx1 - lx0) / 2, cx + (lx1 - lx0) / 2
    y += logo_h + gap_logo_kicker

    kick_l, kick_r = draw_centered(d, cx, y - ky0, KICKER, kicker_f, INK, kicker_track)
    y += kicker_h + gap_kicker_rule

    # Sparkle divider: a hairline rule with a sparkle centered on it.
    sp_r = 13
    rule_half = 150
    d.line([(cx - rule_half, y), (cx - sp_r - 14, y)], fill=MUTED, width=1)
    d.line([(cx + sp_r + 14, y), (cx + rule_half, y)], fill=MUTED, width=1)
    sparkle(d, cx, y, sp_r, INK)
    y += gap_rule_tag

    tag_edges = [
        draw_centered(d, cx, y + i * line_h, line, tag_f, MUTED, tag_track)
        for i, line in enumerate(TAGLINE)
    ]

    # --- Safe-zone assertion: everything must survive a centered square crop ---
    left = min([logo_l, kick_l, cx - rule_half] + [e[0] for e in tag_edges])
    right = max([logo_r, kick_r, cx + rule_half] + [e[1] for e in tag_edges])
    safe_l, safe_r = (W - SAFE_W) / 2 + SAFE_PAD, (W + SAFE_W) / 2 - SAFE_PAD
    if left < safe_l or right > safe_r:
        raise SystemExit(
            f"Content escapes the square-crop safe zone.\n"
            f"  content: {left:.0f}..{right:.0f}\n"
            f"  safe:    {safe_l:.0f}..{safe_r:.0f}\n"
            "Shorten a tagline line or reduce LOGO_TARGET_W."
        )

    out = os.path.normpath(OUT)
    img.save(out)
    print(f"Logo fitted at {size}px")
    print(f"Content spans {left:.0f}..{right:.0f}  (safe zone {safe_l:.0f}..{safe_r:.0f}) OK")
    print(f"Stack height {stack_h:.0f} of {H}")
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
