# tu Matrimonio · Memoria del proyecto web

Este documento guarda todo el contexto de la web para retomarla desde cualquier chat.
Si eres Claude y te piden cambiar algo de esta web: lee esto primero, edita `index.html`, publica en Vercel y actualiza la bitácora al final.

## Qué es

- **Negocio:** tu Matrimonio (tumatrimonio.com.co), Medellín, Colombia. Portal para novios: inscripción al cursillo prematrimonial de la Arquidiócesis de Medellín, cheques regalo de empresas selectas, directorio de proveedores, Wedding Awards, Club de Novias e inspiración. Incluye la marca hermana **Noviademar.com** (bodas y aniversarios en Coveñas, cabañas frente al mar).
- **Dueño:** comprador de medios y manejo de redes. Agencia: NetVision Agency.
- **Contacto que usa la web:** WhatsApp/teléfono 300 442 74 28 (`573004427428`), tumatrimonio@gmail.com.

## Dónde vive

| Cosa | Dónde |
|---|---|
| Dominio | `www.tumatrimonio.com.co` (registrado en GoDaddy; DNS en GoDaddy) |
| Hosting | Vercel · equipo **NetVision Agency** (`team_cd3tn2uTbaa9HWkoQhPOwiu3`) · proyecto **tumatrimonio** (`prj_fbfHV3MAx8C8tshmd8cxXwTHHcAb`) |
| Respaldo URL | https://tumatrimonio.vercel.app |
| Copia en Drive | Carpeta "Web tu Matrimonio (respaldo)" en el Google Drive del dueño (zip + este documento) |
| Chat original | Sesión de Claude Code "Web tu Matrimonio (tumatrimonio.com.co)" |
| Código | GitHub privado: https://github.com/mathiassalazarjara-cmd/tumatrimonio.co.com (rama `main`) |
| Web anterior | Wix premium (sigue activa; las fotos aún se cargan desde `static.wixstatic.com`) |

**DNS en GoDaddy (no tocar MX/TXT):**
- `A  @   → 216.198.79.1`
- `CNAME  www → d5ec627c006c5138.vercel-dns-017.com`
- En Vercel, `tumatrimonio.com.co` redirige (308) a `www.tumatrimonio.com.co`.

## Archivos

- `index.html` — toda la web en UN solo archivo (HTML + `<style>` + `<script>`). Se dejó así a propósito: durante la propagación DNS, archivos separados (`app.js`) llegaban a veces desde Wix con 404 y la pantalla de entrada se quedaba trabada.
- `vercel.json` — `cleanUrls` y cabeceras de seguridad.
- `robots.txt`
- Sitio 100 % estático, sin build. Framework en Vercel: ninguno.

## Cómo publicar un cambio

1. Editar `index.html`.
2. Probar local: `python3 -m http.server 8765` y revisar en escritorio (1440×900) y celular (390×844).
3. Publicar en producción con la herramienta de Vercel `create_deployment` (teamId `team_cd3tn2uTbaa9HWkoQhPOwiu3`, `project: "tumatrimonio"`, `target: "production"`), enviando los archivos. `vercel.json` y `robots.txt` pueden ir por sha si no cambiaron:
   - vercel.json → sha `692b546ecdfe87d68cc2cfd01ddd481dd4a79327`, size 231
   - robots.txt → sha `65990256b6ebe0149d8edfcae37274b6af3e42ae`, size 23
4. Verificar: `curl https://tumatrimonio.vercel.app/` y comparar sha1 con el archivo local.
5. Hacer commit y push a GitHub, y anotar el cambio en la bitácora de abajo.

Si GitHub no está disponible, Vercel guarda el código de cada despliegue: se puede recuperar con `list_deployment_files` / `get_deployment_file_contents` del último despliegue de producción.

## Identidad de marca (tomada de la web original de Wix)

- **Colores:** coral `#ff6161` (principal), taupe/beige `#d4cec5`, taupe claro `#ece8e2`, arena `#f7f4ef`, rubor `#fff6f4`, café texto `#533b16`, gris de franja `#dedede`, azul cielo Noviademar `#b3daf5`.
- **Tipografías:** Jost (títulos en mayúscula fina, estilo Futura), Dancing Script (acentos manuscritos en coral, como "tu Matrimonio"), Poppins (texto).
- **Logo:** el corazón rojo de trazo + "tuMatrimonio.com.co" (PNG de Wix recortado):
  `https://static.wixstatic.com/media/c27dd5_adde11f06ec845d092e74f43e8acc02e~mv2.png/v1/crop/x_1700,y_1420,w_3050,h_505/fill/w_600,h_99,al_c,q_95,enc_auto/logo.png`
- **Logo Noviademar:** `c27dd5_8d1bb89045e3485985a11a05f1b04db2~mv2.png` con crop `x_2160,y_1040,w_2000,h_860`.
- Lo que el dueño rechazó: el turquesa y los colores que no eran suyos. Siempre respetar la paleta de arriba.

## Estructura de la página (en orden)

1. **Pantalla de entrada:** se dibuja un corazón coral, el logo aparece como escrito y un telón blanco y coral sube. Dura unos 2,6 s, se salta con un clic y tiene un respaldo CSS que la oculta a los 4,5 s.
2. Barra superior taupe (Privilegios · Obsequios · Descuentos · Invitaciones + WhatsApp) y menú blanco con el logo.
3. **Portada (hero), todo visible sin bajar:** la novia original de la web de Wix, más pequeña, a la izquierda y difuminada hacia el velo. Las fotos de fondo cambian cada 5,5 s, empezando por esa novia (luego `91c6…`, `80846…`, `1e149…`). A la derecha, sobre el velo: titular "UNA BODA SE PREPARA PARA UN DÍA, *tu Matrimonio* SE CONSTRUYE PARA TODA LA VIDA", subtítulo, botones "Inscribirme al cursillo" y "Ver mis cheques regalo", y el buscador de proveedores (qué y dónde). En celular la foto va arriba y el texto en una tarjeta blanca debajo.
4. Franja taupe en movimiento con la frase de marca.
5. Cursillo y registro: 5 beneficios a la izquierda y el formulario a la derecha. El formulario abre WhatsApp con los datos (no hay backend).
6. Cheques regalo en forma de boleto: $100.000 Tiara Cristales Murano, $150.000 alquiler del bizcocho de exhibición, $100.000 mariposas para la salida de la iglesia, y "+ más".
7. Franja coral "Directorio de empresas", luego Wedding Awards con foto y sello.
8. Franja coral "Empresas recomendadas" y la cuadrícula de categorías: Recepción, Ceremonia, Bizcocho, Etiqueta, Belleza, Centros de mesa, Iluminación, Recordatorios, Mesa dulce. Cada una abre WhatsApp con la consulta.
9. Franja coral "Tu vestido": Novia, Novio (foto de Unsplash, la única que no es de la marca) y Pajes.
10. Planeador: fecha de la boda, cuenta regresiva y checklist por etapa (se guarda en el navegador).
11. Club de Novias, luego Inspiración (5 artículos que por ahora solo son tarjetas que enlazan dentro de la página).
12. Noviademar · Coveñas: foto de playa, logo, botón para cotizar por WhatsApp, galería y franja azul cielo "Directorio de empresas Coveñas".
13. Pie de página taupe y botón flotante de WhatsApp.

## Pendientes

- Pasar las fotos de Wix a Vercel antes de cancelar Wix premium.
- Links reales de Instagram y Facebook (los iconos del pie de página tienen `href="#"`).
- Nombres reales de las empresas destacadas para los Wedding Awards y el directorio.
- Foto propia para "Novio" y fotos reales de las cabañas de Coveñas.
- Opcional: páginas internas para los artículos de Inspiración y un formulario con base de datos en lugar de WhatsApp.

## Bitácora

- **2026-11-23:** primera versión (turquesa) publicada en Vercel. El dueño pidió respetar su identidad.
- **2026-11-23:** rediseño con la identidad original: coral, taupe, logo y fotos propias de Wix, y pantalla de entrada animada.
- **2026-11-23:** se añadió la novia original arriba; el dueño pidió que todo quedara visible sin bajar. La portada pasó a ser la novia pequeña a la izquierda con las fotos rotando en el fondo y el contenido sobre el velo a la derecha. Se quitó la "ventanita" en arco.
- **2026-11-23:** dominio conectado (DNS en GoDaddy hacia Vercel). CSS y JS se volvieron a meter dentro de `index.html`, con respaldo para la pantalla de entrada.
- **2026-11-23:** proyecto guardado en GitHub (repo privado `tumatrimonio.co.com`) y respaldo en Google Drive. Se agregaron `PROYECTO.md` y `CLAUDE.md`.
