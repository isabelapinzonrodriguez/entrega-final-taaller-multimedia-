
import math, random
from PIL import Image, ImageDraw, ImageFont

W, H = 480, 360
Y = (255, 209, 0)      # amarillo
K = (17, 17, 17)       # negro
R = (181, 68, 46)      # ladrillo
C = (244, 237, 224)    # papel
G = (47, 107, 79)      # verde
B = (31, 78, 140)      # azul
ANTON = "/usr/share/fonts/truetype/google-fonts/ofl/anton/Anton-Regular.ttf"

def f(size):
    return ImageFont.truetype(ANTON, size)

def center(d, text, y, font, fill, w=W, dx=0):
    bb = d.textbbox((0, 0), text, font=font)
    d.text(((w - (bb[2] - bb[0])) / 2 + dx, y), text, font=font, fill=fill)

def save(frames, name, ms=110):
    frames[0].save(f"img/{name}", save_all=True, append_images=frames[1:],
                   duration=ms, loop=0, optimize=True, disposal=2)
    print("ok", name, len(frames))


def cargando():
    fr = []
    seq = list(range(0, 99, 9)) + [99] * 10
    for i, p in enumerate(seq):
        im = Image.new("RGB", (W, H), K); d = ImageDraw.Draw(im)
        center(d, "CARGANDO CORDURA" + "." * (i % 4), 70, f(40), Y)
        d.rectangle([50, 160, 430, 210], outline=Y, width=5)
        d.rectangle([56, 166, 56 + int(368 * p / 100), 204], fill=Y if p < 99 or i % 2 else R)
        center(d, f"{p} %", 225, f(54), C)
        if p == 99:
            center(d, "(no avanza. nunca avanza.)" if i % 2 else "(sigue sin avanzar)", 300, f(24), R if i % 2 else C)
        fr.append(im)
    save(fr, "cargando-99.gif", 130)


def cafe():
    fr = []
    for i in range(14):
        im = Image.new("RGB", (W, H), Y); d = ImageDraw.Draw(im)
        level = 1 - (i % 14) / 14
        x0, y0, x1, y1 = 150, 110, 310, 270
        d.rounded_rectangle([x0, y0, x1, y1], 18, fill=C, outline=K, width=6)
        top = y0 + 14 + int((1 - level) * 130)
        d.rectangle([x0 + 8, top, x1 - 8, y1 - 8], fill=(92, 52, 28))
        d.arc([x1 - 20, 140, x1 + 60, 230], 270, 90, fill=K, width=10)
        for s in range(3):
            sx = 190 + s * 40
            pts = [(sx + 12 * math.sin((i + s * 2 + t / 5) * 0.9), 100 - t) for t in range(0, 70, 5)]
            d.line(pts, fill=K, width=5)
        center(d, f"CAFÉ #{1 + (i * 7) // 14}", 20, f(46), K)
        center(d, "nivel de cordura: bajando", 300, f(26), R)
        fr.append(im)
    save(fr, "cafe.gif", 120)


def ojos():
    fr = []
    lids = [0, 0, 0.1, 0.3, 0.55, 0.8, 0.95, 0.8, 0.5, 0.25, 0.1, 0, 0, 0.9, 0.2, 0]
    for i, lid in enumerate(lids):
        im = Image.new("RGB", (W, H), C); d = ImageDraw.Draw(im)
        for cx in (150, 330):
            d.ellipse([cx - 80, 120, cx + 80, 240], fill=(255, 255, 255), outline=K, width=6)
            px = cx + 12 * math.sin(i * 0.8)
            d.ellipse([px - 26, 150, px + 26, 210], fill=R)
            d.ellipse([px - 12, 165, px + 12, 195], fill=K)
            d.rectangle([cx - 84, 110, cx + 84, 120 + int(lid * 120)], fill=Y, outline=K, width=5)
            d.arc([cx - 90, 205, cx + 90, 275], 20, 160, fill=(88, 60, 110), width=12)
        center(d, "NO DORMÍ", 20, f(60), K)
        center(d, "pero estoy bien :)", 295, f(30), R)
        fr.append(im)
    save(fr, "ojos.gif", 120)


def alerta():
    fr = []
    for i in range(10):
        bg = R if i % 2 == 0 else Y
        fg = C if i % 2 == 0 else K
        im = Image.new("RGB", (W, H), bg); d = ImageDraw.Draw(im)
        dx = random.Random(i).randint(-6, 6)
        center(d, "¡ALERTA!", 40, f(90), fg, dx=dx)
        center(d, "ENTREGA EN 3 HORAS", 170, f(46), fg, dx=-dx)
        center(d, "y el archivo se llama 'final_FINAL_v7'", 260, f(24), fg)
        for k in range(0, W, 40):
            d.polygon([(k + (i * 8) % 40, 0), (k + 20 + (i * 8) % 40, 0), (k + (i * 8) % 40, 18)], fill=K)
        fr.append(im)
    save(fr, "alerta.gif", 100)


def llanto():
    fr = []
    for i in range(12):
        im = Image.new("RGB", (W, H), B); d = ImageDraw.Draw(im)
        d.ellipse([140, 50, 340, 250], fill=Y, outline=K, width=7)
        d.ellipse([190, 120, 220, 160], fill=K); d.ellipse([260, 120, 290, 160], fill=K)
        w = 10 + 6 * math.sin(i)
        d.arc([190, 180 + w / 2, 290, 235], 200, 340, fill=K, width=8)
        for ex in (205, 275):
            for k in range(3):
                t = (i * 24 + k * 60) % 180
                d.ellipse([ex - 7, 165 + t, ex + 7, 187 + t], fill=(120, 190, 255))
        center(d, "TODO BIEN :')", 275, f(50), Y)
        fr.append(im)
    save(fr, "llanto.gif", 110)


def vacaciones():
    fr = []
    rnd = random.Random(7)
    pieces = [(rnd.randint(0, W), rnd.randint(-H, 0), rnd.choice([Y, R, G, B, K]), rnd.randint(8, 16), rnd.randint(10, 26)) for _ in range(70)]
    for i in range(16):
        im = Image.new("RGB", (W, H), C); d = ImageDraw.Draw(im)
        for x, y, c, s, v in pieces:
            yy = (y + i * v * 2.2) % (H + 40) - 20
            d.rectangle([x, yy, x + s, yy + s * 0.6], fill=c)
        d.rectangle([60, 120, 420, 240], fill=Y, outline=K, width=7)
        bounce = int(6 * math.sin(i * 0.8))
        center(d, "¡VACACIONES!", 118 + bounce, f(92), K)
        center(d, "sobreviviste (más o menos)", 285, f(28), R)
        fr.append(im)
    save(fr, "vacaciones.gif", 90)

if __name__ == "__main__":
    cargando(); cafe(); ojos(); alerta(); llanto(); vacaciones()
