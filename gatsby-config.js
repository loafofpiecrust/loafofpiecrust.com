
const folderNamed = (name, path) => ({
  resolve: `gatsby-source-filesystem`,
  options: {
    name,
    path: `${__dirname}/${path || name}`,
  }
})

const folders = (...names) => names.map(name => folderNamed(name))

module.exports = {
  siteMetadata: {},
  plugins: [
    // configuration & SEO
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "loafofpiecrust.com",
        short_name: "loafofpiecrust",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/pie/pie-svgrepo-com (4).svg", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-netlify",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',

    // sources
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          content: require.resolve("./src/components/story.tsx"),
          default: require.resolve("./src/components/layout/layout.tsx"),
        },
        mdPlugins: [
          require("remark-attr"),
          require("remark-breaks"),
          // require("remark-normalize-headings"),
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-smartypants",
            options: {
              dashes: "oldschool",
            }
          },
        ],
      },
    },
    folderNamed("images", "src/images"),
    folderNamed("pages", "src/pages"),
    folderNamed("stories", "content/stories"),
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        enableIdentityWidget: false,
        // Register custom widgets in the module specified
        // modulePath: require.resolve("./src/cms/cms.ts"),
      }
    },

    // transforms
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    "gatsby-transformer-yaml",
    // "gatsby-plugin-emotion",
    // "gatsby-plugin-styled-components",
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
