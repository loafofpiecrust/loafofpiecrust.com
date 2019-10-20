require("ts-node").register()
const { collections } = require("./src/config/collections")
const { siteMeta } = require("./src/config/metadata")

const folderNamed = (name, path) => ({
  resolve: `gatsby-source-filesystem`,
  options: {
    name,
    path: `${__dirname}/${path || name}`,
  },
})

module.exports = {
  siteMetadata: siteMeta,
  plugins: [
    // configuration & SEO
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     // name: "loafofpiecrust.com",
    //     name: siteMeta.siteUrl,
    //     short_name: siteMeta.title,
    //     start_url: "/",
    //     background_color: "#663399",
    //     theme_color: "#663399",
    //     display: "minimal-ui",
    //     icon: "src/images/pie/pie-svgrepo-com (4).svg", // This path is relative to the root of the site.
    //   },
    // },
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
          require("remark-breaks"),
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
    folderNamed("images", "src/images"),
    folderNamed("pages", "src/pages"),
    // register nodes for all content collections
    ...collections.map(col => folderNamed(col.name, col.folder)),

    // transforms
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-typescript",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-emotion",
  ],
}