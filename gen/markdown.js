const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.options = {
  gfm: true,
  plugins: [
    'gatsby-remark-attr',
    'gatsby-remark-component',
    // "gatsby-remark-bracketed-spans",
  ]
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  let fullPath = createFilePath({
    node,
    getNode,
    basePath: "pages",
    trailingSlash: false,
  })
  // If content specifies 'slug', use that for the last part of generated path
  let slug = node.frontmatter.slug
  if (!slug) {
    // Remove an initial number in the filename
    // As this is used purely for ordering
    slug = path.basename(fullPath).replace(/^(\d+)[\-_]/, "")
  }

  actions.createNodeField({
    node,
    name: "slug",
    value: path.join(path.dirname(fullPath), slug),
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              template
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.error(result.errors)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    let templateName = node.frontmatter.template || "templates/story"
    let templatePath = path.resolve("src", `${templateName}.tsx`)
    actions.createPage({
      path: node.fields.slug,
      component: templatePath,
      context: { slug: node.fields.slug },
    })
  })
}
