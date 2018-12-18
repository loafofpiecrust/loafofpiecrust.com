const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

// TODO: Pull this out into a generic fileNodeAddSlug or something
exports.onCreateNode = ({ node, getNode, actions }) => {
  // console.log({ ...node, rawBody: "", internal: null })
  let fullPath = createFilePath({
    node,
    getNode,
    basePath: "src/content",
    trailingSlash: false,
  })
  // If content specifies 'slug', use that for the last part of generated path
  let slug = node.frontmatter.slug
  if (!slug) {
    // Remove an initial number in the filename
    // As this is used purely for ordering
    slug = path.basename(fullPath)//.replace(/^(\d+)[\-_]/, "")
  }

  actions.createNodeField({
    node,
    name: "slug",
    value: path.join(path.dirname(fullPath), slug),
  })
}

// basePath: string, sortBy: string[]
exports.createPages = (basePath, sortBy, component) => async ({ graphql, actions }) => {
  const sortParams = sortBy.map(field => field.replace(".", "___"))
  const result = await graphql(`
    {
      allMdx(
        filter: { fields: { slug: { glob: "${basePath}/*" }}}
        sort: { fields: ${sortParams} }
      ) {
        edges {
          node {
            id
            fields { slug }
            parent {
              ... on File {
                name
                absolutePath
                sourceInstanceName
              }
            }
            code {
              scope
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.log(result.errors)
    throw result.errors
  }

  const entries = result.data.allMdx.edges

  entries.forEach(({ node }, index) => {
    const prev = index > 0 ? entries[index - 1].node : null
    const next = index < entries.length - 1 ? entries[index + 1].node : null

    actions.createPage({
      path: node.fields.slug,
      component: componentWithMDXScope(
        component,
        node.code.scope
      ),

      // Defers picking the rendering component to gatsby
      // check [gatsby-config.js] for defaults per folder
      // component: node.parent.absolutePath,
      context: {
        next: next ? next.fields.slug : null,
        previous: prev ? prev.fields.slug : null,
        id: node.id,
        // frontmatter: node.frontmatter,
      }
    })
  })
}