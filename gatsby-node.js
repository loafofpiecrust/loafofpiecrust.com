/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const fs = require("fs")
const yaml = require("js-yaml")

const mdx = require("./gen/mdx")
const cmsConfig = yaml.load(fs.readFileSync("./static/admin/config.yml"))

// extra webpack config
exports.onCreateWebpackConfig = ({ stage, actions }) => {
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
exports.onCreateNode = params => {
  const type = params.node.internal.type
  if (type === "Mdx") {
    mdx.onCreateNode(params)
  }
}

// Create pages for relevant nodes
exports.createPages = async params => {
  // For each collection in the CMS, make pages for that folder.
  for (const col of cmsConfig.collections) {
    if (col.component) {
      console.log(`registering collection ${col.label}`)
      await mdx.createPages(
        col.folder,
        col.sort_by,
        require.resolve(`./src/${col.component}`),
      )(params)
    }
  }
}


