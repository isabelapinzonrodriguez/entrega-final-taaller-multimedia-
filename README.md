Manual de supervivencia: Semana 16
Fanzine web sarcástico y dramático para sobrevivir a la última semana del semestre en la Universidad de los Andes.
Proyecto final de Taller Multimedia 1, por Isabela Pinzón Rodríguez.
Proyecto académico, no oficial.

Repositorio: https://github.com/isabelapinzonrodriguez/entrega-final-taaller-multimedia-
Página pública: https://isabelapinzonrodriguez.github.io/entrega-final-taaller-multimedia-/

La idea
La semana 16 junta parciales, entregas finales, café, trasnochadas y llanto, pero también la alegría de salir a vacaciones. Hice un manual de instrucciones absurdo con el que cualquier estudiante se pueda identificar, con collage de fotocopia, texto de máquina de escribir, stickers y animaciones.

Qué tiene la página

Diagnóstico: lista de síntomas que cambia el veredicto y el GIF.
Mapa del campus: mapa ilustrado con 6 puntos interactivos.
Especies de estudiante: cartas que se voltean.
Calendario del colapso: gráfica de estrés, sueño y café de lunes a domingo.
Calculadora de colapso: calcula la probabilidad de llorar en la biblioteca.
Traductor profe a realidad: frases de profesores y su significado.
Kit de emergencia: objetos que se arrastran hasta la mochila.
Plan de llanto y primeros auxilios: consejos reales y enlaces de apoyo.
Epílogo: confeti y fanfarria.
La barra de cordura de arriba baja con el scroll y se recupera al final.

Requisitos de la entrega
Web fanzine de temática libre: está en index.html.

Documentación del proceso: es este README.md.

Usar una librería: uso GSAP con sus plugins ScrollTrigger y Draggable (carpeta js/vendor/).

Imágenes: 7 fotos de Wikimedia Commons y un mapa SVG propio.

Sonido: archivos .wav en audio/, un reproductor lo-fi y efectos con la Web Audio API.

Hipervínculos: enlaces a la universidad, su biblioteca, Wikipedia, Wikimedia, GSAP y los créditos de las fotos.

GIF: 6 GIFs animados propios en img/.

Commits con sentido: el historial del repositorio tiene más de 4 commits con mensajes que describen cada cambio.

No se usa API, porque estaba tachada en el planteamiento.

Proceso

Revisé las instrucciones y los referentes para no repetir sus temáticas.
Elegí la idea, el tono (sarcástico y dramático), los colores (amarillo y negro de la universidad) y las tipografías.
Busqué fotos libres en Wikimedia Commons y creé los GIFs y el audio con scripts.
Armé el HTML, luego los estilos y al final las interacciones con GSAP.
Probé en computador y celular, y corregí errores.
Escribí esta documentación y publiqué en GitHub Pages.

Estructura

index.html        página
css/style.css     estilos
js/main.js        interacciones y animaciones
js/sound.js       efectos de sonido
js/vendor/        GSAP, ScrollTrigger y Draggable
fonts/            tipografías
img/              GIFs
audio/            sonidos
scripts/          scripts que generan GIFs y audio
Para verla en tu computador: python3 -m http.server en esta carpeta y abrir http://localhost:8000.

Bibliografia 

Fotos: Wikimedia Commons, cada una con la autoría y licencia de su página (enlazadas al final de la web).
Librería: GSAP.
Tipografías: Bebas Neue, Special Elite, Permanent Marker, Playfair Display, Space Mono y Rubik Glitch (código abierto, vía Fontsource).
GIFs, audio, mapa y textos: originales de este proyecto.
Asistencia con IA: desarrollo y documentación hechos con ayuda de Claude (Anthropic), bajo mis instrucciones y revisión.
Para usarlo, en GitHub abre README.md, pulsa el lápiz de editar, borra todo, pega este texto y haz Commit changes.

