/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}


const mdx = require("./gen/mdx")

exports.onCreateNode = params => {
  const type = params.node.internal.type
  if (type === "Mdx") {
    mdx.onCreateNode(params)
  }
}

exports.createPages = async params => {
  await mdx.createPages(
    "/content/stories",
    ["fields.slug"],
    require.resolve("./src/components/story.tsx"),
  )(params)
  // await mdx.createPages("/blog", ["frontmatter.date"])(params)
}


