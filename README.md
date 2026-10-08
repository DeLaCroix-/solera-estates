# Solera Estates · Astro

Web boutique bilingüe para Barcelona. Mediterráneo sereno. Implementación nativa con Astro 7: rutas estáticas, layout compartido y componentes .astro. El contenido, la navegación, los idiomas y las FAQ funcionan sin JavaScript. El JS gestiona el menú, el formulario, las preferencias de privacidad y la medición consentida.

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

El dominio definitivo es soleraestates.eu, configurado en Arsys y Netlify. Se han conservado los registros DNS del correo. El repositorio original DeLaCroix-/solera-estates publica desde master mediante GitHub Actions. Search Console está verificado para https://soleraestates.eu/ y la analítica está instalada. La activación de la indexación sigue pendiente de una decisión específica.

## Privacidad y medición

src/privacy.js gestiona el consentimiento y el botón de subida. La preferencia se conserva 180 días y puede modificarse desde el pie. Google Analytics y la navegación del CRM solo se activan con consentimiento; revocarlo borra sus identificadores. El SDK del CRM se carga para atender consultas, con la recogida de navegación desactivada inicialmente.

src/measurement-config.json contiene únicamente identificadores públicos: GA4 G-JNYR7FWM2C (propiedad 558038280) y site_soleraestates_eu del CRM. La clave del tracker es pública; nunca incluir claves privadas de webhooks.

Tras la confirmación de Formspree, nat:form:confirmed registra el lead en el CRM incluso si se rechaza la analítica. Con consentimiento también se envía generate_lead a GA4, esperando su procesamiento antes de navegar a la página de gracias con un límite de 1,5 segundos. No se envían campos personales del formulario a GA4. Las pruebas del 8 de octubre de 2026 verificaron tres leads en el CRM y dos generate_lead en el informe de tiempo real; la prueba sin consentimiento no generó navegación analítica ni cookies.

## Contacto

NAT BPO SL, B26663120. Carrer de Balmes, 32, Pral. 2º, 08007 Barcelona. info@soleraestates.eu.

El formulario ES/EN utiliza un endpoint propio de Formspree, validación accesible, aceptación de la información de privacidad, honeypot y protección contra envíos duplicados. Envía mediante AJAX y solo muestra confirmación tras la aceptación del proveedor. Conserva los campos si hay un error. La página de gracias no afirma recepción cuando se abre directamente. El buzón está alojado en Arsys. La recepción de una prueba debe verificarse separadamente de la configuración.

## Verificación

qa-output/technical-audit.json registra contenido, los 174 encabezados v2, CSS, metadatos, idiomas recíprocos, enlaces, imágenes, formulario, JSON-LD, sitemap y marcador Astro. check:http añade HTTP y recursos. Los informes locales se excluyen del repositorio y del despliegue. Verificar publicación comparando el commit de GitHub, el despliegue de Netlify y el HTML servido.
