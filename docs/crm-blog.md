# Solera Blog — NAT Consulting CRM

The existing Solera Estates SEO profile publishes through the GitHub App to
`DeLaCroix-/solera-estates`, branch `master`, preset `astro_standard_v1`.

- Content: `src/content/blog`; assets: `public/images/blog`.
- Spanish route: `/blog/{slug}/`; English route: `/en/blog/{slug}/`.
- Original language: Spanish; automatic translation: English.
- Default author: Solera Estates. The article tag supplies the category.
- Both the classic SEO motor and Beta use the profile's publication destination.

Create or import the article in the CRM, review its content and images, and publish
or schedule it there. The CRM commits the Markdown and local images. The existing
GitHub workflow validates the site and deploys it to Netlify. The CRM verifies the
public URL after deployment. Do not mark an article delivered based on a commit alone.

Supported frontmatter: title, description, publishDate, updatedDate, author,
category, image, imageAlt, language, sourceLanguage, translationGroup, translations,
draft, natSeoArticleId and sourceUrl. The canonical route is derived from the file,
not from an arbitrary sourceUrl. Translation links are only emitted for actual,
published siblings. Do not give unrelated articles the same translationGroup.

Files go in `src/content/blog/slug.md` and `src/content/blog/en/translated-slug.md`.
Drafts and future-dated posts are excluded. Published dates must be valid ISO dates.
The body accepts Markdown and semantic HTML. Unsafe scripts and event handlers are
removed. Local raster images are optimized into responsive WebP files at build time.
External image URLs are rejected: upload the images through the CRM first.

The index, article pages, reading contents, metadata, structured data, RSS and
sitemap are generated automatically. An empty language index remains noindex until
its first article. Global indexation still follows PUBLIC_SITE_INDEXABLE.

Validation: `npm run check:all` includes the bilingual CRM fixture test, Astro
validation, a production build and rendered HTML checks. No test articles are
committed to the public content directory.
