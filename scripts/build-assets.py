"""One-off: turns refs/ into the files under public/. Re-run after replacing a ref."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
REFS = ROOT / 'refs'
PUB = ROOT / 'public'
CREAM = (247, 240, 230)

source = Image.open(REFS / 'ANI Flower Botanical Logo.png').convert('RGBA')
logo = source.crop(source.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox())
print('logo trimmed', logo.size)
logo.resize((600, round(logo.height * 600 / logo.width)), Image.LANCZOS).save(PUB / 'img' / 'logo.png', optimize=True)
w = 960
logo.resize((w, round(logo.height * w / logo.width)), Image.LANCZOS).save(PUB / 'img' / 'logo.webp', quality=90, method=6)

# The flower alone is the mark: the wordmark is unreadable at favicon size.
# Box is in source-file pixels and stops above the cap height of "ANI",
# whose last stroke the stem grows out of.
flower = source.crop((990, 30, 1570, 392))
flower = flower.crop(flower.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox())

def icon(size: int, pad: float, bg=CREAM) -> Image.Image:
    canvas = Image.new('RGBA', (size, size), bg + (255,))
    box = round(size * (1 - 2 * pad))
    f = flower.copy()
    f.thumbnail((box, box), Image.LANCZOS)
    canvas.alpha_composite(f, ((size - f.width) // 2, (size - f.height) // 2))
    return canvas

icon(512, 0.08).save(PUB / 'icon-512.png', optimize=True)
icon(192, 0.08).save(PUB / 'icon-192.png', optimize=True)
icon(180, 0.1).convert('RGB').save(PUB / 'apple-touch-icon.png', optimize=True)
icon(256, 0.04).save(PUB / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])

# Named by what is in them: the names end up in alt-adjacent places and in the sitemap.
photos = {
    'photo_2026-10-18_16-18-49.jpg': 'green-bell-bouquet',
    'photo_2026-10-18_16-18-53.jpg': 'carnations-in-lace',
    'photo_2026-10-18_16-18-58.jpg': 'chamomile-by-the-window',
    'photo_2026-10-18_16-19-02.jpg': 'red-roses',
    'photo_2026-10-18_16-19-05.jpg': 'pink-spray-roses',
}
for src, name in photos.items():
    im = Image.open(REFS / 'flowers' / src).convert('RGB')
    im.save(PUB / 'img' / 'gallery' / f'{name}.jpg', quality=88, optimize=True, progressive=True)
    print(name, im.size)

# OG card: logo on cream, one bouquet in an arch on the right.
og = Image.new('RGBA', (1200, 630), CREAM + (255,))
photo = Image.open(PUB / 'img' / 'gallery' / 'carnations-in-lace.jpg').convert('RGBA')
aw, ah = 400, 540
scale = max(aw / photo.width, ah / photo.height)
photo = photo.resize((round(photo.width * scale), round(photo.height * scale)), Image.LANCZOS)
left, top = (photo.width - aw) // 2, (photo.height - ah) // 2
photo = photo.crop((left, top, left + aw, top + ah))
mask = Image.new('L', (aw, ah), 0)
d = ImageDraw.Draw(mask)
d.rectangle((0, aw // 2, aw, ah), fill=255)
d.ellipse((0, 0, aw, aw), fill=255)
shadow = Image.new('RGBA', (aw + 80, ah + 80), (0, 0, 0, 0))
shadow.paste((120, 90, 60, 60), (40, 50), mask)
shadow = shadow.filter(ImageFilter.GaussianBlur(18))
og.alpha_composite(shadow, (1200 - aw - 85, (630 - ah) // 2 - 40))
og.paste(photo, (1200 - aw - 45, (630 - ah) // 2), mask)
lw = 620
l = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
og.alpha_composite(l, (60, (630 - l.height) // 2))
og.convert('RGB').save(PUB / 'og.jpg', quality=88, optimize=True)
print('og done')
