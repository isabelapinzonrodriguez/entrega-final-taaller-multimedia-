# Manual de supervivencia: Semana 16



## 1. La idea

La semana 16 es la última del semestre: parciales, entregas finales, café, trasnochadas, llanto y, al mismo tiempo, la felicidad de salir a vacaciones. Quise hacer un fanzine web que cualquier estudiante de la universidad (no solo yo) pueda reconocer, con tono **sarcástico y dramático**, como un manual de instrucciones absurdo para sobrevivir.

Es un fanzine de **temática libre**, como pedía la entrega: mezcla collage de fotocopia, texto de máquina de escribir, stickers, cinta adhesiva y animaciones.

## 2. Requisitos de la entrega y dónde se cumplen

| Requisito | Cómo se cumple |
|---|---|
| Enlaces bien entregados | Enlace del repositorio y de la página pública, arriba de este README. |
| Web fanzine, temática libre | `index.html`: 8 capítulos + epílogo sobre la semana 16. |
| Documentación del proceso | Este `README.md` en la raíz del proyecto. |
| Usar una librería | **GSAP** (con los plugins ScrollTrigger y Draggable), incluida en `js/vendor/`. |
| Imágenes | 7 fotos de archivo de la universidad (Wikimedia Commons) + mapa ilustrado en SVG hecho por mí. |
| Sonido | Archivos `.wav` en `audio/` (alarma, trombón triste, fanfarria y un lo-fi de 12 s), reproductor en la introducción y efectos de interfaz con la Web Audio API. |
| Hipervínculos | Enlaces al sitio de la universidad, su biblioteca, Wikipedia, Wikimedia Commons, GSAP y los créditos de cada foto. |
| GIF | 6 GIFs animados originales en `img/`. |
| Commits con sentido | Historial del repositorio, un commit por cada avance real (ver sección 7). |
| API | No se usa (estaba tachada en el planteamiento). |

## 3. Qué hay en la página

0. **Hero + introducción:** título gigante, sello, GIF de alerta, reproductor lo-fi.
1. **Diagnóstico:** lista de síntomas con casillas; cuenta cuántos tienes y cambia el veredicto y el GIF.
2. **El campus del colapso:** mapa ilustrado con 6 puntos interactivos y medidores (ruido, café, probabilidad de llanto) + galería de fotos.
3. **Especies de estudiante:** cartas que se voltean.
4. **Calendario del colapso:** lunes a domingo con una gráfica de estrés, sueño y cafés.
5. **Calculadora de colapso:** sliders y un medidor animado que calcula la probabilidad de llorar en la biblioteca.
6. **Traductor profe → realidad:** frases de profesores y su significado real.
7. **Kit de emergencia:** objetos que se arrastran hasta la mochila.
8. **Plan de llanto y primeros auxilios:** tabla de lugares + consejos reales y enlaces de apoyo.
9. **Epílogo:** confeti y fanfarria. La barra de **cordura** de arriba baja mientras haces scroll y se recupera al llegar al final.

## 4. Herramientas y decisiones

- **HTML, CSS y JavaScript** sin frameworks: fácil de publicar en GitHub Pages.
- **GSAP** para animaciones de entrada, scroll (ScrollTrigger), arrastrar objetos (Draggable), medidor y gráfica. Los archivos van dentro del repositorio para que la página no dependa de un CDN.
- **Tipografías** (guardadas en `fonts/`, de la familia Fontsource): Bebas Neue (títulos), Special Elite (texto, máquina de escribir), Permanent Marker (notas a mano), Playfair Display (cursiva dramática), Space Mono (etiquetas) y Rubik Glitch (el "SOBREVIVISTE").
- **Colores:** amarillo y negro de la universidad, ladrillo, verde de los cerros, azul y papel crema, sacados del mapa y las fotos del campus.
- **GIFs:** los dibujé con código (`scripts/make_gifs.py`, Pillow) para que sean originales y no tener problemas de derechos.
- **Audio:** también generado con código (`scripts/make_audio.py`, solo librería estándar de Python) y la Web Audio API en `js/sound.js`. El sonido empieza **apagado**; se activa con el botón de arriba a la derecha.
- **Mapa:** SVG dibujado a mano en el HTML. Es ilustrativo, no está a escala y no es el mapa oficial.
- **Accesibilidad:** textos alternativos en imágenes, botones reales para todo lo interactivo, `prefers-reduced-motion` respetado y diseño responsive (probado en 1366 px y 390 px de ancho).

## 5. Proceso (paso a paso)

1. Revisé las instrucciones de la entrega y los sitios de referencia para entender qué se esperaba y **evitar repetir sus temáticas**.
2. Lluvia de ideas y elección: "Manual de supervivencia para la semana 16".
3. Definí tono (sarcástico y dramático), paleta y tipografías.
4. Busqué fotos de archivo con licencia libre en Wikimedia Commons y verifiqué que cargaran.
5. Creé los GIFs y el audio con scripts.
6. Escribí el HTML por capítulos, luego los estilos y por último las interacciones con GSAP.
7. Probé la página en el navegador (escritorio y celular), corregí errores (por ejemplo: pines del mapa invisibles por una animación con GSAP, números de capítulo que no se veían y etiquetas del mapa tapadas).
8. Documenté el proceso y publiqué en GitHub Pages.

### Aprendizajes
- Una animación `gsap.from()` con ScrollTrigger puede dejar elementos en su estado inicial; `gsap.fromTo()` con valores explícitos es más seguro.
- `-webkit-text-stroke` con `currentColor` desaparece si el texto es transparente: hay que definir el color del trazo.
- Los sonidos generados por código pesan casi nada y evitan problemas de derechos.

## 6. Estructura del proyecto

```
index.html
README.md
css/style.css
js/main.js            interacciones y animaciones
js/sound.js           efectos de sonido
js/vendor/            GSAP, ScrollTrigger y Draggable
fonts/                tipografías (.woff2)
img/                  GIFs animados
audio/                archivos .wav
scripts/              scripts que generan los GIFs y el audio
```

Para verla en tu computador basta con abrir un servidor local en la carpeta (por ejemplo `python3 -m http.server`) y entrar a `http://localhost:8000`.

## 7. Commits

El historial cuenta el proceso en orden: estructura y librería, GIFs, HTML, estilos, interacciones, sonido real, correcciones y documentación. Cada mensaje describe el cambio que hizo.

## 8. Créditos y licencias

- **Fotos** de [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Universidad_de_los_Andes), con la autoría y licencia de cada archivo en su página original (están enlazadas al final de la web):
  `Edificios de la Universidad de los Andes, tomada desde Monserrate.jpg`, `Edificio Mario Laserna.jpg`, `Edificio Roberto Franco.jpg`, `Uniandes Campus.jpg`, `Uniandes BloqueQ 9piso.jpg`, `Los Andes University bigbuildings 20121004.jpg` y `Universidad de los Andes.jpg`.
- **GSAP:** [gsap.com](https://gsap.com), usada bajo su licencia estándar gratuita.
- **Tipografías:** familias de código abierto (SIL OFL) distribuidas por Fontsource.
- **GIFs, audio, mapa y textos:** originales de este proyecto.
- **Asistencia con IA:** el desarrollo y la redacción de esta documentación se hicieron con ayuda de Claude (Anthropic), bajo mis instrucciones y revisión.
