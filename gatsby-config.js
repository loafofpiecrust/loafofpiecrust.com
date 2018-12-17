
const folderNamed = (name, path) => ({
  resolve: `gatsby-source-filesystem`,
  options: {
    name,
    path: `${__dirname}/src/${path || name}`,
  }
})

const folders = (names) => names.map(name => folderNamed(name))

module.exports = {
  siteMetadata: {},
  plugins: [
    ...folders(["images", "pages", "content"]),
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          content: require.resolve("./src/components/story.tsx"),
          default: require.resolve("./src/components/page.tsx"),
        },
        mdPlugins: [require("remark-attr")],
        gatsbyRemarkPlugins: [],
      },
    },
    "gatsby-transformer-yaml",
    "gatsby-plugin-emotion",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/styles/typography.ts",
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-netlify-cms",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
