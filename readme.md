# [snead.xyz](https://snead.xyz)

[![Netlify Status](https://api.netlify.com/api/v1/badges/56862afd-cd75-42c9-9fe7-dc84440fdf2a/deploy-status)](https://app.netlify.com/sites/loafofpiecrust/deploys)

## Build stack

- `gen`: Generates nodes and pages for particular content sources. Currently provides:
  - `mdx`: builds slugs and pages for all markdown files using the `mdx` renderer.
- `src`: Provides all the content and components that need to be processed before publish.
  - `pages`: All files in this folder will be compiled into an `html` page on the site.
  - `content`: Folders here containing `.md` or `.mdx` files must have a corresponding `collection.yml` file within that configures the page build process. Look at [`src/content/blog/collection.yml`](src/content/blog/collection.yml) for an example.
- `static`: Provides any static content that doesn't need to be processed and will simply be copied to the site as-is.
