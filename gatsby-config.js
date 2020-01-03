require("ts-node").register()
const siteMeta = require("./src/content/metadata").default
const collections = require("./src/content/collections").default
const theme = require("./src/styles/theme-aux").default

module.exports = {
  siteMetadata: siteMeta,
  plugins: [
    // configuration & SEO
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        // name: "loafofpiecrust.com",
        name: siteMeta.siteUrl,
        short_name: siteMeta.title,
        start_url: "/",
        background_color: theme.colors.background,
        theme_color: theme.colors.background,
        display: "minimal-ui",
        icon: "src/images/pie/pie-svgrepo-com (4).svg", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-netlify",
    "gatsby-plugin-netlify-cache",
    {
      resolve: "gatsby-plugin-extract-schema",
      options: {
        dest: `${__dirname}/.cache/schema.json`,
      },
    },

    // sources
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: require.resolve("./src/templates/page"),
        },
        remarkPlugins: [
          require("remark-attr"),
          require("remark-emoji"),
          // require("remark-normalize-headings"),
        ],
        rehypePlugins: [
          require("rehype-highlight"),
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-smartypants",
            options: {
              dashes: "oldschool",
            },
          },
        ],
      },
    },

    // register content folders
    {
      resolve: "gatsby-source-filesystem",
      options: {name: "images", path: "./src/images"},
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {name: "pages", path: "./src/pages"},
    },
    ...collections.map(({name, path}) => ({
      resolve: "gatsby-source-filesystem",
      options: {name, path},
    })),

    // transforms
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-typescript",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-emotion",

    // other
    "gatsby-plugin-no-sourcemaps",
  ],
}
