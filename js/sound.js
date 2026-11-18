
(function () {
  "use strict";

  var ctx = null;
  var master = null;
  var enabled = false;

  function init() {
    if (ctx) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.35;
    master.connect(ctx.destination);
  }


  function tone(freq, start, dur, type, vol, slideTo) {
    var t0 = ctx.currentTime + start;
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = type || "square";
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.4, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }


  function noise(start, dur, vol, f0, f1, q) {
    var t0 = ctx.currentTime + start;
    var len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    var src = ctx.createBufferSource();
    src.buffer = buf;
    var fil = ctx.createBiquadFilter();
    fil.type = "bandpass";
    fil.Q.value = q || 1;
    fil.frequency.setValueAtTime(f0, t0);
    if (f1) fil.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
    var g = ctx.createGain();
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(fil); fil.connect(g); g.connect(master);
    src.start(t0); src.stop(t0 + dur + 0.05);
  }

  var sounds = {
    
    key: function () { noise(0, 0.05, 0.9, 2600, 1200, 3); tone(180, 0, 0.05, "square", 0.12, 90); },
  
    check: function () { noise(0, 0.09, 0.7, 3500, 900, 2); tone(520, 0, 0.08, "triangle", 0.25, 260); },
    pop: function () { tone(420, 0, 0.11, "sine", 0.45, 880); },
    pin: function () { tone(660, 0, 0.07, "square", 0.2); tone(990, 0.07, 0.1, "square", 0.2); },
    whoosh: function () { noise(0, 0.35, 0.8, 300, 3800, 0.8); },
    tick: function () { tone(1200, 0, 0.03, "square", 0.15); },
   alarm: function () {
      for (var i = 0; i < 4; i++) tone(i % 2 ? 640 : 880, i * 0.16, 0.15, "sawtooth", 0.28);
    },
  
    sad: function () {
      tone(392, 0.00, 0.3, "sawtooth", 0.3, 370);
      tone(370, 0.34, 0.3, "sawtooth", 0.3, 349);
      tone(349, 0.68, 0.3, "sawtooth", 0.3, 330);
      tone(330, 1.02, 0.9, "sawtooth", 0.3, 220);
    },
    
    heart: function () {
      tone(70, 0, 0.14, "sine", 0.8, 45);
      tone(60, 0.2, 0.18, "sine", 0.7, 40);
    },
    
    drop: function () { noise(0, 0.12, 0.8, 800, 200, 1); tone(140, 0, 0.12, "triangle", 0.4, 70); },
    
    fanfare: function () {
      var n = [523, 659, 784, 1047, 784, 1047, 1319];
      for (var i = 0; i < n.length; i++) tone(n[i], i * 0.11, i === n.length - 1 ? 0.6 : 0.16, "square", 0.25);
      tone(262, 0, 0.9, "triangle", 0.3);
    }
  };

  
  var files = { alarm: "audio/alarma.wav", sad: "audio/trombon-triste.wav", fanfare: "audio/vacaciones.wav" };
  var cache = {};
  function playFile(name) {
    try {
      var a = cache[name] || (cache[name] = new Audio(files[name]));
      a.currentTime = 0;
      var p = a.play();
      if (p && p.catch) p.catch(function () { sounds[name](); });
      return true;
    } catch (e) { return false; }
  }

  window.Sound = {
    isOn: function () { return enabled; },
    set: function (on) {
      enabled = !!on;
      if (enabled) { init(); if (ctx && ctx.state === "suspended") ctx.resume(); }
      return enabled;
    },
    toggle: function () { return this.set(!enabled); },
    play: function (name) {
      if (!enabled || !ctx) return;
      if (ctx.state === "suspended") ctx.resume();
      if (files[name] && playFile(name)) return;
      var s = sounds[name];
      if (s) { try { s(); } catch (e) { } }
    }
  };
})();
