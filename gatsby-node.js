/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

require("ts-node").register()
const mdx = require("./gen/mdx")
const collections = require("./src/content/collections").default

// extra webpack config
exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [
        // search for modules within ./src
        // this allows imports like: "components/song-player"
        "src",
        "node_modules",
      ],
    },
  })
}

// Register extra data for nodes
exports.onCreateNode = (params) => {
  const type = params.node.internal.type
  if (type === "Mdx") {
    mdx.onCreateNode(params)
  }
}

// Create pages for relevant nodes
exports.createPages = async (params) => {
  // For each collection in the CMS, make pages for that folder.
  for (const col of collections) {
    if (col.component && col.type === "mdx") {
      await mdx.createPages(
        col.name,
        col.sortBy,
        require.resolve(`./src/${col.component}`),
      )(params)
    }
  }
}