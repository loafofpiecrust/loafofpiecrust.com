
const folderNamed = (name, path) => ({
  resolve: `gatsby-source-filesystem`,
  options: {
    name,
    path: `${__dirname}/src/${path || name}`,
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
        icon: "src/images/gatsby-icon.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-react-helmet",
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
          default: require.resolve("./src/components/layout.tsx"),
        },
        mdPlugins: [
          require("remark-attr"),
          require("remark-normalize-headings"),
        ],
        gatsbyRemarkPlugins: [],
      },
    },
    ...folders("images", "pages", "content"),
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        enableIdentityWidget: false,
      }
    },

    // transforms
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    "gatsby-transformer-yaml",
    "gatsby-plugin-emotion",
    "gatsby-plugin-styled-components",
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
