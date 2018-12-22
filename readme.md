
# [loafofpiecrust.com](https://loafofpiecrust.com)

## Build stack
- `gen`: Generates nodes and pages for particular content sources. Currently provides:
  - `mdx`: builds slugs and pages for all markdown files using the `mdx` renderer.
- `src`: Provides all the content and components that need to be processed before publish.
  - `pages`: All files in this folder will be compiled into an `html` page on the site.
  - `content`: Folders here containing `.md` or `.mdx` files must be registered in `src/config/collections.js` to be compiled into pages.
- `static`: Provides any static content that doesn't need to be processed and will simply be copied to the site as-is.