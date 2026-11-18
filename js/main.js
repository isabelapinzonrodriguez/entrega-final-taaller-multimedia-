
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var play = function (n) { if (window.Sound) window.Sound.play(n); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  document.documentElement.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!window.gsap) { document.documentElement.classList.remove("js"); return; }
  gsap.registerPlugin(ScrollTrigger, Draggable);
  if (reduce) gsap.globalTimeline.timeScale(100);


  var CREDITS = {
    monserrate: "Edificios de la Universidad de los Andes, tomada desde Monserrate.jpg",
    ml: "Edificio Mario Laserna.jpg",
    franco: "Edificio Roberto Franco.jpg",
    campus: "Uniandes Campus.jpg",
    bloqueq: "Uniandes BloqueQ 9piso.jpg",
    big: "Los Andes University bigbuildings 20121004.jpg",
    uni: "Universidad de los Andes.jpg"
  };

  var credList = $("#credits");
  Object.keys(CREDITS).forEach(function (k) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(CREDITS[k].replace(/ /g, "_")).replace(/%2C/g, ",");
    a.target = "_blank"; a.rel = "noopener";
    a.textContent = CREDITS[k];
    li.appendChild(a);
    credList.appendChild(li);
  });

  $$("img.foto-src").forEach(function (img) {
    img.addEventListener("error", function () {
      var fig = img.closest(".foto");
      if (fig) fig.classList.add("roto");
      else img.style.display = "none";   
    });
  });


  var fill = $("#corduraFill"), num = $("#corduraNum"), lastHeart = 0;
  function updateCordura() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? window.scrollY / max : 0;
    var fin = $("#fin").getBoundingClientRect();
    var v = Math.round(100 - clamp(p, 0, 1) * 98);
    var atEnd = fin.top < window.innerHeight * 0.55;
    if (atEnd) v = 100;
    fill.style.width = v + "%";
    num.textContent = v + "%";
    fill.classList.toggle("low", v <= 25 && !atEnd);
    if (v <= 12 && !atEnd && Date.now() - lastHeart > 2500) { lastHeart = Date.now(); play("heart"); }
  }
  window.addEventListener("scroll", updateCordura, { passive: true });
  window.addEventListener("resize", updateCordura);
  updateCordura();

  /* navegación: capítulo activo */
  var navLinks = $$(".topbar__nav a");
  $$(".cap").forEach(function (sec) {
    ScrollTrigger.create({
      trigger: sec, start: "top 45%", end: "bottom 45%",
      onToggle: function (self) {
        if (!self.isActive) return;
        navLinks.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + sec.id); });
      }
    });
  });

  
  var soundBtn = $("#soundBtn");
  soundBtn.addEventListener("click", function () {
    var on = window.Sound.toggle();
    soundBtn.setAttribute("aria-pressed", on);
    $(".sound-btn__icon", soundBtn).textContent = on ? "🔊" : "🔇";
    $(".sound-btn__text", soundBtn).textContent = on ? "SONIDO: ON" : "SONIDO: OFF";
    play("pop");
  });


  var tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  tl.from(".hero__kicker", { y: -30, opacity: 0, rotate: -8, duration: .7 })
    .from(".hero__title .line", { yPercent: 110, duration: 1, stagger: .15 }, "-=.3")
    .from(".hero__sub", { y: 30, opacity: 0, duration: .8 }, "-=.5")
    .from(".hero__cta .btn", { y: 30, opacity: 0, stagger: .12, duration: .6 }, "-=.5")
    .from(".hero__gif", { scale: .3, rotate: -25, opacity: 0, duration: .9, ease: "back.out(1.8)" }, "-=.6")
    .from(".hero__stamp", { scale: 3, opacity: 0, rotate: -30, duration: .5, ease: "power3.in" }, "-=.4");

  gsap.to(".hero__photo img", {
    yPercent: 14, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.to(".hero__gif", { y: -14, rotate: 1.5, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });

  
  gsap.to(".hero__title .l3", { x: 2, duration: .06, repeat: -1, yoyo: true, repeatDelay: 2.4, ease: "none" });


  function reveal(sel, vars) {
    $$(sel).forEach(function (el, i) {
      gsap.fromTo(el,
        Object.assign({ opacity: 0, y: 50 }, vars && vars.from),
        Object.assign({ opacity: 1, y: 0, duration: .8, ease: "power3.out", delay: (i % 3) * .08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true } }, vars && vars.to));
    });
  }
  reveal(".reveal");
  reveal(".intro__text > *");
  reveal(".intro__stack .foto", { from: { rotate: 12, scale: .85 }, to: { rotate: 0, scale: 1, clearProps: "transform" } });
  reveal(".galeria .foto", { from: { y: 90, scale: .85 } });
  reveal(".card", { from: { y: 80, rotate: 6 }, to: { rotate: 0 } });
  reveal(".traductor li");
  reveal(".aux", { from: { y: 60, scale: .9 } });
  reveal(".llanto__table, .llanto__gif");
  reveal(".fin__inner > *", { from: { y: 40 } });

  gsap.fromTo(".diag__list li", { x: -40, opacity: 0 }, {
    x: 0, opacity: 1, stagger: .07, duration: .6, ease: "power2.out",
    scrollTrigger: { trigger: ".diag__list", start: "top 85%", once: true }
  });


  var verdicts = [
    ["Marca algo. Aunque sea por probar tu cordura.", "img/cargando-99.gif"],
    ["Sospechosamente tranquilo. ¿Seguro que estás en la U?", "img/cargando-99.gif"],
    ["Fase de negación. Muy cómoda, no la sueltes.", "img/cargando-99.gif"],
    ["Ya empezó el estrés, pero todavía te ríes. Qué linda inocencia.", "img/cafe.gif"],
    ["Cafeína en las venas. Te llega el primer correo de 'recordatorio de entrega'.", "img/cafe.gif"],
    ["Mitad del camino al abismo. Hidrátate (con agua, no café).", "img/ojos.gif"],
    ["Diagnóstico: semana 16. Tratamiento: sobrevivir.", "img/ojos.gif"],
    ["Nivel crítico. Tu cama te extraña. Tú a ella también.", "img/alerta.gif"],
    ["Estás en modo supervivencia. Respira, tacha, repite.", "img/alerta.gif"],
    ["Colapso casi total. Es oficial: eres un estudiante universitario.", "img/llanto.gif"],
    ["10/10. Felicidades: estás tan cansado que ya no sientes nada. Eso es paz.", "img/llanto.gif"]
  ];
  var boxes = $$("#diagList input"), dCount = $("#diagCount"), dVerdict = $("#diagVerdict"), dGif = $("#diagGif");
  boxes.forEach(function (b) {
    b.addEventListener("change", function () {
      var n = boxes.filter(function (x) { return x.checked; }).length;
      var v = verdicts[n];
      play(b.checked ? "check" : "tick");
      gsap.fromTo(dCount, { scale: 1.8, color: "#B5442E" }, { scale: 1, color: "#121212", duration: .45, ease: "back.out(3)" });
      dCount.textContent = n;
      dVerdict.textContent = v[0];
      if (dGif.getAttribute("src") !== v[1]) {
        dGif.setAttribute("src", v[1]);
        gsap.fromTo(dGif, { rotate: -4, opacity: .2 }, { rotate: 0, opacity: 1, duration: .4 });
      }
      if (n === 10) { play("sad"); gsap.fromTo("#diagResult", { x: -8 }, { x: 0, duration: .6, ease: "elastic.out(2,.2)" }); }
    });
  });


  var PINS = [
    { tag: "PUNTO 1 · EL ML", t: "Biblioteca General", d: "Santuario de silencio y crisis silenciosas. Conseguir mesa a las 4 p. m. es un deporte extremo.", r: 15, c: 40, l: 85 },
    { tag: "PUNTO 2 · SANTO DOMINGO", t: "Edificio SD", d: "Ascensores con carácter y un parcial de números esperándote en el último piso. Sube con fe.", r: 55, c: 55, l: 60 },
    { tag: "PUNTO 3 · FRANCO", t: "Edificio Franco", d: "Pasillos con ojeras y gente repasando apuntes en voz baja como si fueran rezos.", r: 50, c: 30, l: 70 },
    { tag: "PUNTO 4 · BLOQUE Q", t: "Bloque Q", d: "Piso 9: vista espectacular para contemplar tus malas decisiones académicas.", r: 35, c: 25, l: 55 },
    { tag: "PUNTO 5 · PLAZOLETA", t: "Plazoleta y cafetería", d: "Aquí se consume la empanada de emergencia y se hacen negociaciones de vida o muerte por el último tinto.", r: 90, c: 100, l: 35 },
    { tag: "PUNTO 6 · CANCHA", t: "Cancha", d: "Para 'desconectarse cinco minutos'. Spoiler: son cuarenta, y luego llega la culpa.", r: 75, c: 20, l: 20 }
  ];
  var pins = $$(".pin"), pTag = $("#pinTag"), pTitle = $("#pinTitle"), pText = $("#pinText");
  pins.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      var p = PINS[i];
      pins.forEach(function (x) { x.classList.remove("on"); });
      btn.classList.add("on");
      play("pin");
      pTag.textContent = p.tag; pTitle.textContent = p.t; pText.textContent = p.d;
      gsap.fromTo("#pinInfo", { rotate: -2, y: 8 }, { rotate: 1, y: 0, duration: .5, ease: "back.out(3)" });
      gsap.to("#mRuido", { width: p.r + "%", duration: .7 });
      gsap.to("#mCafe", { width: p.c + "%", duration: .7 });
      gsap.to("#mLlanto", { width: p.l + "%", duration: .7 });
    });
  });
 
  gsap.fromTo(".pin", { scale: 0, rotation: -225 }, { scale: 1, rotation: -45, stagger: .12, duration: .6, ease: "back.out(2.5)",
    clearProps: "transform", scrollTrigger: { trigger: ".mapa", start: "top 75%", once: true } });
  gsap.fromTo("#mapaSvg .bld rect", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: .08, duration: .6, ease: "power3.out",
    scrollTrigger: { trigger: ".mapa", start: "top 80%", once: true } });


  $$(".card").forEach(function (c) {
    c.addEventListener("click", function () { c.classList.toggle("flip"); play("whoosh"); });
  });

  var DAYS = [
    { tag: "LUNES", t: "El optimismo inocente", d: "Abres la agenda, la miras fijamente y concluyes que 'sí se puede'. Hasta haces una lista con colores. Es el último momento de paz de tu vida.", q: "\"Esta semana me organizo bien.\"", e: 25, s: 70, c: 30 },
    { tag: "MARTES", t: "El primer parpadeo de pánico", d: "Descubres que el 'trabajo corto' tiene seis entregables. Haces cuentas de cuántas horas hay en el día. No alcanzan. Nunca alcanzan.", q: "\"Ok, esto se complicó.\"", e: 45, s: 55, c: 45 },
    { tag: "MIÉRCOLES", t: "Se rompió la agenda", d: "El plan de estudio ya es una sugerencia. Comes mirando el computador. Tu cerebro empieza a cargar a 40 %.", q: "\"Voy a morir (profesionalmente).\"", e: 70, s: 35, c: 65 },
    { tag: "JUEVES", t: "Aceptación (y muchas lágrimas)", d: "Ya aceptaste tu destino. Lloras con dignidad en el baño, te lavas la cara y sigues. Aparecen los memes de grupo: el único apoyo real.", q: "\"Ya qué, a lo hecho, pecho.\"", e: 82, s: 25, c: 80 },
    { tag: "VIERNES", t: "La noche más larga del semestre", d: "Biblioteca, café, luz azul, trabajos en pestañas y una playlist triste. A las 3 a. m. todo se ve posible y absolutamente imposible.", q: "\"Si duermo 20 minutos, ¿cuenta como dormir?\"", e: 92, s: 10, c: 95 },
    { tag: "SÁBADO", t: "¿Terminé? ¡Terminé!", d: "Subes la última entrega a las 11:58. Cierras el computador y no sientes nada. Luego sientes todo. Luego sientes hambre.", q: "\"No puede ser… ¿ya?\"", e: 60, s: 40, c: 40 },
    { tag: "DOMINGO", t: "Resurrección", d: "Duermes catorce horas, comes algo que no sea empanada y recuerdas que existen el sol y las personas. Las vacaciones empiezan oficialmente.", q: "\"Qué bonito es no tener nada que hacer.\"", e: 10, s: 95, c: 5 }
  ];
  var PX = DAYS.map(function (_, i) { return 40 + i * (500 / 6); });
  var py = function (v) { return 260 - v * 2.2; };
  function pts(key) { return DAYS.map(function (d, i) { return PX[i].toFixed(1) + "," + py(d[key]).toFixed(1); }).join(" "); }
  $("#lineEstres").setAttribute("points", pts("e"));
  $("#lineSueno").setAttribute("points", pts("s"));
  $("#lineCafe").setAttribute("points", pts("c"));
  $$("#chart .xlab text").forEach(function (t, i) { t.setAttribute("x", PX[i]); t.setAttribute("text-anchor", "middle"); });

  var svgNS = "http://www.w3.org/2000/svg", dots = $("#chartDots");
  var vline = document.createElementNS(svgNS, "line");
  vline.setAttribute("y1", 30); vline.setAttribute("y2", 262);
  vline.setAttribute("stroke", "#F4EDE0"); vline.setAttribute("stroke-width", 2); vline.setAttribute("stroke-dasharray", "5 6");
  dots.appendChild(vline);
  var dotEls = [["e", "#B5442E"], ["s", "#FFD100"], ["c", "#6fae6f"]].map(function (k) {
    var c = document.createElementNS(svgNS, "circle");
    c.setAttribute("r", 9); c.setAttribute("fill", k[1]); c.setAttribute("stroke", "#121212"); c.setAttribute("stroke-width", 3);
    dots.appendChild(c); return { el: c, key: k[0] };
  });

  function showDay(i, silent) {
    var d = DAYS[i];
    $$(".dia").forEach(function (b, j) { b.classList.toggle("is-on", j === i); b.setAttribute("aria-selected", j === i); });
    $("#diaTag").textContent = d.tag; $("#diaTitle").textContent = d.t;
    $("#diaText").textContent = d.d; $("#diaQuote").textContent = d.q;
    gsap.to(vline, { attr: { x1: PX[i], x2: PX[i] }, duration: .5, ease: "power3.out" });
    dotEls.forEach(function (o) { gsap.to(o.el, { attr: { cx: PX[i], cy: py(d[o.key]) }, duration: .55, ease: "back.out(2)" }); });
    if (!silent) {
      gsap.fromTo(".dia-panel__text", { x: -24, opacity: .3 }, { x: 0, opacity: 1, duration: .5, ease: "power3.out" });
      play(d.e > 80 ? "heart" : "pop");
    }
  }
  $$(".dia").forEach(function (b, i) { b.addEventListener("click", function () { showDay(i); }); });
  showDay(0, true);

  ["#lineEstres", "#lineSueno", "#lineCafe"].forEach(function (s, i) {
    var el = $(s), len = el.getTotalLength();
    var dashed = s === "#lineCafe";
    if (!dashed) {
      gsap.fromTo(el, { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 1.6, delay: i * .2, ease: "power2.inOut",
          scrollTrigger: { trigger: "#chart", start: "top 80%", once: true } });
    } else {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1, delay: .6, scrollTrigger: { trigger: "#chart", start: "top 80%", once: true } });
    }
  });

 
  var ids = [["inPar", "oPar"], ["inEnt", "oEnt"], ["inCaf", "oCaf"], ["inSue", "oSue"], ["inPro", "oPro"]];
  ids.forEach(function (p) {
    var inp = $("#" + p[0]), out = $("#" + p[1]);
    inp.addEventListener("input", function () { out.textContent = inp.value; play("tick"); });
  });
  var LEVELS = [
    { max: 20, t: "Sospechosamente tranquilo", m: "O no tienes materias, o ya dejaste de sentir. Disfruta. O disimula.", g: "img/vacaciones.gif", s: "pop" },
    { max: 40, t: "Nivel ceja levantada", m: "Un poquito de estrés, pero lo manejas con una playlist y fe.", g: "img/cafe.gif", s: "pop" },
    { max: 60, t: "Lagrimita estratégica", m: "Se te va a escapar una lágrima mirando el calendario. Es normal, ya se te pasa. (Probablemente.)", g: "img/ojos.gif", s: "tick" },
    { max: 80, t: "Llanto en el baño del ML", m: "Alta probabilidad de crisis en un lugar público con buena acústica. Lleva pañuelos.", g: "img/alerta.gif", s: "alarm" },
    { max: 101, t: "COLAPSO CINEMATOGRÁFICO", m: "Música dramática, cámara lenta y alguien en el piso de la biblioteca abrazando un termo de café.", g: "img/llanto.gif", s: "sad" }
  ];
  var needle = $("#needle"); gsap.set(needle, { rotation: -90, svgOrigin: "100 100" });
  var arc = $("#meterArc"), pct = $("#calcPct"), pctObj = { v: 0 };
  function calc() {
    var g = function (id) { return +$("#" + id).value; };
    var sum = g("inPar") * 7 + g("inEnt") * 6 + g("inCaf") * 2.2 + (10 - g("inSue")) * 4 + g("inPro") * 3.5;
    var v = clamp(Math.round(sum / 150 * 100), 1, 99);
    var lv = LEVELS.filter(function (l) { return v < l.max; })[0];
    play(lv.s);
    gsap.to(pctObj, { v: v, duration: 1.2, ease: "power3.out", onUpdate: function () { pct.textContent = Math.round(pctObj.v); } });
    gsap.to(arc, { strokeDashoffset: 251 * (1 - v / 100), duration: 1.2, ease: "power3.out" });
    gsap.to(needle, { rotation: -90 + 180 * v / 100, svgOrigin: "100 100", duration: 1.3, ease: "elastic.out(1,.55)" });
    $("#calcTitle").textContent = lv.t; $("#calcMsg").textContent = lv.m;
    var gif = $("#calcGif"); gif.setAttribute("src", lv.g);
    gsap.fromTo(gif, { scale: .7, rotate: -8 }, { scale: 1, rotate: 0, duration: .6, ease: "back.out(2.5)" });
    if (v > 80) gsap.fromTo("#calcOut", { x: -10 }, { x: 0, duration: .7, ease: "elastic.out(3,.15)" });
  }
  $("#calcBtn").addEventListener("click", calc);


  $$("#traductor button").forEach(function (b) {
    b.addEventListener("click", function () { b.classList.toggle("on"); play("key"); });
  });

  var bag = $("#kitBag"), bagList = $("#bagList"), bagCount = $("#bagCount"), bagMsg = $("#bagMsg"), inBag = 0;
  var MSGS = { 1: "Un comienzo digno.", 3: "Ya pareces un estudiante responsable. Qué susto.", 5: "Cinco cosas. Cero tiempo para usarlas.", 7: "La mochila ya pesa más que tus ganas.", 9: "¡Kit completo! Los problemas no caben, pero el café sí." };

  function addToBag(item) {
    if (item.classList.contains("in")) return;
    item.classList.add("in");
    inBag++;
    var empty = $(".empty", bagList); if (empty) empty.remove();
    var li = document.createElement("li"); li.textContent = item.getAttribute("data-name");
    bagList.appendChild(li);
    gsap.from(li, { x: 30, opacity: 0, duration: .4, ease: "power3.out" });
    gsap.fromTo(bagCount, { scale: 1.8 }, { scale: 1, duration: .4, ease: "back.out(3)" });
    bagCount.textContent = inBag;
    if (MSGS[inBag]) bagMsg.textContent = MSGS[inBag];
    play(inBag === 9 ? "fanfare" : "drop");
    if (inBag === 9) gsap.fromTo(bag, { rotate: -3 }, { rotate: 0, duration: 1, ease: "elastic.out(2,.2)" });
  }
  $$(".item").forEach(function (item) {
    Draggable.create(item, {
      zIndexBoost: true, dragClickables: true,
      onPress: function () { gsap.to(item, { scale: 1.12, rotate: 4, duration: .15 }); },
      onDrag: function () { bag.classList.toggle("hot", this.hitTest(bag, "30%")); },
      onRelease: function () { bag.classList.remove("hot"); },
      onDragEnd: function () {
        gsap.to(item, { scale: 1, rotate: 0, duration: .2 });
        if (this.hitTest(bag, "30%")) { addToBag(item); gsap.set(item, { x: 0, y: 0 }); }
        else gsap.to(item, { x: 0, y: 0, duration: .5, ease: "elastic.out(1,.6)" });
      },
      onClick: function () { gsap.to(item, { scale: 1, rotate: 0, duration: .15 }); addToBag(item); }
    });
  });
  gsap.fromTo(".item", { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, stagger: .06, duration: .5, ease: "back.out(2.5)",
    scrollTrigger: { trigger: ".kit__items", start: "top 80%", once: true } });

 
  var cv = $("#confetti"), cx = cv.getContext("2d"), parts = [], running = false;
  function size() { cv.width = window.innerWidth; cv.height = window.innerHeight; }
  window.addEventListener("resize", size); size();
  var COLORS = ["#FFD100", "#B5442E", "#2F6B4F", "#1F4E8C", "#F4EDE0", "#121212"];
  function burst(n) {
    for (var i = 0; i < n; i++) {
      parts.push({
        x: window.innerWidth / 2 + (Math.random() - .5) * 200, y: window.innerHeight * .65,
        vx: (Math.random() - .5) * 18, vy: -Math.random() * 20 - 6,
        w: 8 + Math.random() * 10, h: 5 + Math.random() * 7, a: Math.random() * 6.28, va: (Math.random() - .5) * .4,
        c: COLORS[(Math.random() * COLORS.length) | 0], life: 0
      });
    }
    if (!running) { running = true; requestAnimationFrame(tick); }
  }
  function tick() {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach(function (p) {
      p.vy += .45; p.vx *= .992; p.x += p.vx; p.y += p.vy; p.a += p.va; p.life++;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.a); cx.fillStyle = p.c; cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx.restore();
    });
    parts = parts.filter(function (p) { return p.y < cv.height + 30 && p.life < 260; });
    if (parts.length) requestAnimationFrame(tick); else { running = false; cx.clearRect(0, 0, cv.width, cv.height); }
  }
  $("#confettiBtn").addEventListener("click", function () {
    play("fanfare");
    burst(180);
    setTimeout(function () { burst(120); }, 350);
    setTimeout(function () { burst(120); }, 700);
    gsap.fromTo(".fin__title", { scale: 1.12, rotate: -2 }, { scale: 1, rotate: 0, duration: .8, ease: "elastic.out(1.4,.3)" });
    $("#confettiBtn").textContent = "🎉 ¡SOBREVIVISTE! 🎉";
  });

  ScrollTrigger.refresh();
})();
