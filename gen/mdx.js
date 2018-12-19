const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const projectDir = path.dirname(__dirname)

// TODO: Pull this out into a generic fileNodeAddSlug or something
exports.onCreateNode = ({ node, getNode, actions }) => {
  const parent = getNode(node.parent)
  const pathInProject = "/" + path.relative(projectDir, parent.absolutePath)
    .replace(/\.[^/.]+$/, "")
  
  // Remove base-paths from the final URL
  const pathOnline = pathInProject.replace(/^(\/src)?\/(content|pages)/, "")

  // If content specifies 'slug', use that for the last part of generated path
  let slug = node.frontmatter.slug
  if (!slug) {
    // Remove an initial number in the filename
    // As this is used purely for ordering
    slug = path.basename(pathOnline)//.replace(/^(\d+)[\-_]/, "")
  }

  actions.createNodeField({
    node,
    name: "slug",
    value: path.join(path.dirname(pathOnline), slug),
  })
  actions.createNodeField({
    node,
    name: "pathInProject",
    value: pathInProject,
  })
}

// basePath: string, sortBy: string[]
exports.createPages = (basePath, sortBy, component) => async ({ graphql, actions }) => {
  const sortParams = sortBy.map(field => field.replace(".", "___"))
  const result = await graphql(`{
    allMdx(
      filter: { fields: { pathInProject: { regex: "^${basePath}/" }}}
      sort: { fields: ${sortParams} }
    ) {
      edges {
        node {
          id
          fields { slug }
          code {
            scope
          }
        }
      }
    }
  }`)
  if (result.errors) {
    console.log(result.errors)
    throw result.errors
  }

  const entries = result.data.allMdx.edges

  for (let idx = 0; idx < entries.length; idx++) {
    const { node } = entries[idx]
    const prev = idx > 0 ? entries[idx - 1].node : null
    const next = idx < entries.length - 1 ? entries[idx + 1].node : null


    actions.createPage({
      path: node.fields.slug,
      component: componentWithMDXScope(
        component,
        node.code.scope
      ),
      context: {
        next: next ? next.fields.slug : null,
        previous: prev ? prev.fields.slug : null,
        id: node.id,
        // frontmatter: node.frontmatter,
      }
    })
  }
}