

import math, random, struct, wave

SR = 22050

def write(name, samples):
    peak = max(1e-9, max(abs(s) for s in samples))
    with wave.open(f"audio/{name}", "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(b"".join(struct.pack("<h", int(max(-1, min(1, s / peak * 0.9)) * 32767)) for s in samples))
    print("ok", name, round(len(samples) / SR, 1), "s")

def env(i, n, a=0.01, r=0.15):
    t = i / SR; d = n / SR
    return min(1, t / a) * min(1, max(0, (d - t) / r))

def tone(freq, dur, kind="sine", vol=1.0, slide=None):
    n = int(SR * dur); out = []; ph = 0
    for i in range(n):
        f = freq if slide is None else freq + (slide - freq) * i / n
        ph += 2 * math.pi * f / SR
        if kind == "sine": v = math.sin(ph)
        elif kind == "saw": v = 2 * ((ph / (2 * math.pi)) % 1) - 1
        else: v = 1 if math.sin(ph) > 0 else -1
        out.append(v * vol * env(i, n))
    return out

def silence(dur): return [0.0] * int(SR * dur)
def mix(a, b):
    n = max(len(a), len(b)); a = a + [0] * (n - len(a)); b = b + [0] * (n - len(b))
    return [x + y for x, y in zip(a, b)]


alarm = []
for k in range(6):
    alarm += tone(880 if k % 2 == 0 else 660, 0.18, "saw", 0.8) + silence(0.02)
write("alarma.wav", alarm)

sad = []
for f, d, s in ((392, .38, 370), (370, .38, 349), (349, .38, 330), (330, 1.1, 215)):
    sad += tone(f, d, "saw", 0.7, s) + silence(0.03)
write("trombon-triste.wav", sad)


fan = []
for f, d in ((523, .12), (659, .12), (784, .12), (1047, .2), (784, .12), (1047, .12), (1319, .8)):
    fan += tone(f, d, "square", 0.5) + silence(0.01)
fan = mix(fan, tone(262, 1.6, "sine", 0.6))
write("vacaciones.wav", fan)


random.seed(16)
BPM = 76; beat = 60 / BPM
chords = [(220.0, 261.6, 329.6, 392.0), (174.6, 220.0, 261.6, 329.6), (196.0, 246.9, 293.7, 392.0), (164.8, 207.7, 246.9, 311.1)]
total = int(SR * beat * 4 * len(chords) * 1.0)
track = [0.0] * total
def add(buf, start, samples):
    s = int(start * SR)
    for i, v in enumerate(samples):
        if s + i < len(buf): buf[s + i] += v
for ci, ch in enumerate(chords):
    t0 = ci * beat * 4
    for f in ch:
        add(track, t0, tone(f, beat * 4, "sine", 0.18))
        add(track, t0 + beat * 2, tone(f * 2, beat * 2, "sine", 0.06))
    add(track, t0, tone(ch[0] / 2, beat * 2, "sine", 0.5))
    for b in range(4):
        add(track, t0 + b * beat, tone(90, 0.16, "sine", 0.7, 45))              # bombo
        for h in (0.5, 1.0):
            add(track, t0 + (b + h * 0.5) * beat, [ (random.random() * 2 - 1) * 0.05 * env(i, int(SR * .04), .002, .03) for i in range(int(SR * .04))])  
    
    mel = [ch[2] * 2, ch[1] * 2, ch[3] * 2, ch[2] * 2]
    for b in range(4):
        if random.random() > 0.3: add(track, t0 + b * beat + 0.02, tone(mel[b], beat * 0.9, "sine", 0.16))
write("lofi-colapso.wav", track)
