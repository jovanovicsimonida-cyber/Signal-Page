"""Regenerate the social share card at client/public/og-image.png.

Usage:
    python scripts/make-og-image.py

Requires Pillow (`pip install Pillow`). Fonts are downloaded once from
the Google Fonts repo into scripts/.font-cache/ and reused after that.

Why this exists: the logo must be Playfair Display on every surface per
CLAUDE.md, and Playfair is far wider than a geometric sans at the same
point size. The layout is therefore measurement-driven -- the logo is
fitted to a target width and everything else is positioned off its
measured bounding box, so editing the tagline below cannot silently
push text into the sparkle divider.

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
    "TURN BEHAVIORAL",
    "SIGNALS INTO EMAILS",
    "THAT PUSH USERS TO",
    "THEIR NEXT “HELL YES”",
    "MOMENT!",
]

# --- Canvas ---
W, H = 1200, 630      # standard OG dimensions; don't change casually
MARGIN_X = 78
LOGO_TARGET_W = 470   # keeps the logo clear of the tagline column

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


def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    logo_f, size = fit_logo(d, LOGO_TARGET_W)
    kicker_f = font("dmsans.ttf", 30, 700, 40)
    kicker_track = 5.0
    gap = 26  # between logo descender and kicker cap

    # Measure the left block so it can be centered as a unit.
    lx0, ly0, lx1, ly1 = d.textbbox((0, 0), LOGO, font=logo_f)
    kx0, ky0, _, ky1 = d.textbbox((0, 0), KICKER, font=kicker_f)
    block_h = (ly1 - ly0) + gap + (ky1 - ky0)
    block_top = (H - block_h) / 2

    # Offset by the bbox origin so ink lands where intended.
    d.text((MARGIN_X - lx0, block_top - ly0), LOGO, font=logo_f, fill=INK)
    logo_right = MARGIN_X + (lx1 - lx0)

    kicker_y = block_top + (ly1 - ly0) + gap - ky0
    draw_tracked(d, (MARGIN_X, kicker_y), KICKER, kicker_f, INK, kicker_track)

    # Tagline block, centered on the same axis as the left block.
    tag_f = font("dmsans.ttf", 26, 600, 40)
    tag_track, line_h = 3.0, 29
    tag_w = max(tracked_width(d, l, tag_f, tag_track) for l in TAGLINE)

    sp_r, sp_gap = 16, 34
    tag_x = logo_right + sp_gap + sp_r * 2 + sp_gap
    tag_block_h = line_h * len(TAGLINE)
    tag_y = (H - tag_block_h) / 2

    for i, line in enumerate(TAGLINE):
        draw_tracked(d, (tag_x, tag_y + i * line_h), line, tag_f, MUTED, tag_track)

    mid_y = tag_y + tag_block_h / 2
    sparkle(d, logo_right + sp_gap + sp_r, mid_y, sp_r, INK)
    sparkle(d, tag_x + tag_w + sp_gap + sp_r, mid_y, sp_r, INK)

    right_edge = tag_x + tag_w + sp_gap + sp_r * 2
    if right_edge > W - 20:
        raise SystemExit(
            f"Tagline overflows the canvas (right edge {right_edge:.0f} of {W}). "
            "Shorten a line or reduce LOGO_TARGET_W."
        )

    out = os.path.normpath(OUT)
    img.save(out)
    print(f"Logo fitted at {size}px, x:{MARGIN_X}-{logo_right:.0f}")
    print(f"Tagline right edge: {right_edge:.0f} of {W}")
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
