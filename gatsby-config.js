
require("ts-node").register()
const { collections } = require("./src/config/collections")
const { siteMeta } = require("./src/config/metadata")

function folderNamed(name, path) {
  return {
    resolve: `gatsby-source-filesystem`,
    options: {
      name,
      path: `${__dirname}/${path || name}`,
    },
  }
}

const folders = (...names) => names.map(name => folderNamed(name))

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
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/pie/pie-svgrepo-com (4).svg", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-netlify",
    "gatsby-plugin-netlify-cache",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',

    // sources
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          stories: require.resolve("./src/templates/story"),
          default: require.resolve("./src/templates/page"),
        },
        remarkPlugins: [
          require("remark-attr"),
          require("remark-breaks"),
          require("remark-emoji"),
          // require("remark-normalize-headings"),
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
    // {
    //   resolve: "gatsby-plugin-netlify-cms",
    //   options: {
    //     enableIdentityWidget: false,
    //     // Register custom widgets in the module specified
    //     // modulePath: require.resolve("./src/cms/cms.ts"),
    //   }
    // },

    // transforms
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    "gatsby-transformer-yaml",
    "gatsby-plugin-catch-links",

    // styling
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/styles/typography.ts",
      },
    },
  ],
}
