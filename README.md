# CompuLab 360 — Laboratorio Interactivo del Computador

Aplicación educativa desarrollada con:

- HTML5
- CSS3
- JavaScript puro
- A-Frame 1.6.0
- AR.js 3.4.7
- WebXR

## Funcionalidades

1. Conceptos interactivos de las partes del computador.
2. Filtros por categoría.
3. Modal con explicación y lectura de voz.
4. Reto de clasificación.
5. Quiz de 10 preguntas con retroalimentación.
6. Laboratorio 3D con A-Frame.
7. Preparación para WebXR/VR mediante el botón de A-Frame.
8. Realidad aumentada con AR.js y marcador Hiro.
9. Diseño responsive para computador y móvil.

## Cómo ejecutar

### Opción recomendada: GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube todo el contenido de esta carpeta conservando la estructura.
3. Ve a Settings → Pages.
4. Selecciona la rama principal y la carpeta `/root`.
5. Guarda y espera a que GitHub Pages publique el sitio.

La URL de GitHub Pages usa HTTPS, que es necesario para acceder a la cámara desde un navegador.

### Prueba local

No abras simplemente `index.html` con doble clic si quieres probar la cámara. Usa un servidor local.

Con Python instalado:

```bash
python -m http.server 8000
```

Luego abre:

http://localhost:8000

## Realidad aumentada

La aplicación usa:

- AR.js 3.4.7
- A-Frame 1.6.0
- marcador Hiro

El flujo de cámara solicita primero el permiso mediante `getUserMedia()` y, después de concederlo, inicializa la escena AR.js.

Para probar el marcador Hiro puedes imprimirlo o mostrarlo desde otra pantalla. Busca "AR.js Hiro marker" si necesitas la plantilla oficial del marcador.

## Importante sobre navegadores

- La cámara requiere un contexto seguro (HTTPS) o localhost.
- En móviles, concede permiso a la cámara.
- La detección del marcador funciona mejor con buena iluminación, cámara estable y el marcador completamente visible.
- WebXR depende del soporte del navegador y del dispositivo. El laboratorio 3D funciona también sin visor VR.

## Estructura

```text
computador-interactivo/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── ar.js
│   ├── classification.js
│   ├── concepts.js
│   ├── quiz.js
│   └── vr.js
└── assets/
    ├── images/
    ├── models/
    └── audio/
```

Las carpetas `assets` están preparadas para agregar posteriormente modelos 3D, imágenes o audios propios.


### Arquitectura de cámara (versión corregida)

La realidad aumentada se ejecuta en `ar.html`, un documento independiente cargado dentro de un iframe con permiso `camera`. La página educativa (`index.html`) nunca contiene una escena AR.js activa en segundo plano. Al pulsar **Activar cámara**, se crea el iframe y AR.js solicita la cámara dentro de ese visor. Al cerrar la experiencia, el iframe se elimina y el contexto de cámara termina.

Esto evita que el video de la cámara de AR.js quede como fondo de toda la aplicación.


## Corrección definitiva de cámara

`index.html` **no carga AR.js y no contiene ninguna escena AR**. A-Frame solo se usa para el laboratorio 3D/VR.

La realidad aumentada está aislada en `ar.html`. Al pulsar **Abrir cámara AR**, la aplicación navega a esa página independiente y AR.js inicia allí la cámara y el marcador Hiro. Por eso la cámara no puede aparecer como fondo de la página educativa.

Para volver a la aplicación se pulsa **Salir**.


## ⚠️ Cámara AR: arquitectura final

La página principal `index.html` **no carga AR.js** y **no solicita la cámara**.

El botón **Abrir cámara AR** es un enlace HTML normal hacia `ar.html`; no depende de JavaScript para abrirse.

`ar.html` es la única página que importa `aframe-ar.js` de AR.js 3.4.7. Por tanto:

1. Abrir la aplicación → cámara apagada.
2. Navegar por conceptos, clasificación, quiz y 3D → cámara apagada.
3. Pulsar **Abrir cámara AR** → se abre `ar.html`.
4. En `ar.html`, AR.js solicita la cámara.
5. Aceptar permiso → cámara activa solamente en el visor AR.
6. Apuntar al marcador Hiro → aparece el monitor 3D.
7. Pulsar **Salir** → se detiene el stream y se vuelve a `index.html`.

La estructura sigue el ejemplo oficial de AR.js para Marker Tracking con A-Frame: A-Frame 1.6.0, `aframe-ar.js` y `<a-marker preset="hiro">`.


### Cámara AR
La cámara no se solicita al cargar la aplicación. El botón de AR solicita explícitamente el permiso con `getUserMedia()` y solo después abre el visor AR. El visor carga A-Frame 1.6.0 y AR.js 3.4.7 de forma diferida.
