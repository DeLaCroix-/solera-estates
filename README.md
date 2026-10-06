# Solera Estates · Astro

Web boutique bilingüe para Barcelona. Mediterráneo sereno. Implementación nativa con Astro 7: rutas estáticas, layout compartido y componentes .astro. El contenido, la navegación, los idiomas y las FAQ funcionan sin JavaScript. El JS se limita al menú y al formulario.

## Desarrollo

Requiere Node.js >= 22.19.0. Instalar con npm ci. Comandos:

- npm run dev: Astro en http://127.0.0.1:4179.
- npm run check:all: diagnósticos de Astro, compilación y auditoría del contenido generado.
- npm run preview:netlify: sirve dist e imita los 404 ES/EN en el puerto 4179.
- npm run check:http: comprobaciones HTTP con preview:netlify activo.

No ejecutar los dos servidores a la vez.

## Estructura y contenido

- src/pages/[...slug].astro: páginas ES/EN con getStaticPaths.
- src/pages/404.astro, robots.txt.ts y sitemap.xml.ts: utilidades y SEO.
- src/layouts/SiteLayout.astro: canonical, hreflang, metadatos, JSON-LD y recursos compilados.
- src/components: cabecera, pie, hero, bloques editoriales, imágenes y formulario en Astro.
- src/lib/site.mjs y types.ts: modelo editorial y configuración.
- content/editorial-source.md: 20 páginas editoriales y 174 encabezados. Se han aplicado los H1/H2/H3 v2 solicitados el 6 de octubre de 2026, las respuestas FAQ y los párrafos cuyo tema cambió. Se conserva el resto de textos y metadatos v1.
- content/heading-update-v2.json: contrato de los 174 encabezados exactos.
- content/legal.json: seis páginas legales; responsable y dirección confirmados por el cliente. Alojamiento actualizado a Netlify.
- src/style.css y src/app.js: diseño e interacciones.
- public/assets: imágenes conceptuales de IA optimizadas en AVIF/WebP y fuentes locales. No representan proyectos reales. Procedencia en content/magnific-assets.json.

## GitHub y Netlify

Netlify publica dist. netlify.toml define Node 22 y npm run check:all. La web no depende de Sites ni incluye su manifiesto. Los documentos editoriales, informes y código fuente no se publican en dist.

La configuración está en src/site-config.json. PUBLIC_SITE_URL y PUBLIC_SITE_INDEXABLE definen el origen y la indexación. La revisión conserva noindex en HTML y cabeceras; noindex no restringe el acceso. El sitemap queda vacío mientras esté desactivada la indexación. Journal espera artículos reales.

No se han cambiado DNS, dominio definitivo, Search Console o analítica. Activar la indexación o conectar un dominio requiere una decisión separada del propietario.

## Contacto

NAT BPO SL, B26663120. Carrer de Balmes, 32, Pral. 2º, 08007 Barcelona. info@soleraestates.es.

El formulario valida y prepara un correo en la aplicación del visitante. Indica que no envía automáticamente. No se ha enviado un mensaje de prueba ni verificado la recepción del buzón. La integración automática sigue desactivada: requiere proveedor real, política de privacidad correspondiente y prueba de entrega autorizada. La página de gracias no afirma recepción cuando se abre directamente.

## Verificación

qa-output/technical-audit.json registra contenido, los 174 encabezados v2, CSS, metadatos, idiomas recíprocos, enlaces, imágenes, formulario, JSON-LD, sitemap y marcador Astro. check:http añade HTTP y recursos. Los informes locales se excluyen del repositorio y del despliegue. Verificar publicación comparando el commit de GitHub, el despliegue de Netlify y el HTML servido.
