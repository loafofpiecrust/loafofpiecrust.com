import componentWithMDXScope from "gatsby-mdx/component-with-mdx-scope"
import path from "path"

const projectDir = path.dirname(__dirname)

// TODO: Pull this out into a generic fileNodeAddSlug or something
export const onCreateNode = ({ node, getNode, actions }) => {
  const parent = getNode(node.parent)
  const pathInProject = "/" + path.relative(projectDir, parent.absolutePath)
    .replace(/\.[^/.]+$/, "")

  console.log(pathInProject)

  // Remove base-paths from the final URL
  const pathOnline = pathInProject.replace(/^(\/src)?\/(content|pages)/, "")

  // If content specifies 'slug', use that for the last part of generated path
  let slug = node.frontmatter.slug
  if (!slug) {
    // Remove an initial number in the filename
    // As this is used purely for ordering
    slug = path.basename(pathOnline) // .replace(/^(\d+)[\-_]/, "")
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
export const createPages = (basePath, sortBy, component) => async ({ graphql, actions }) => {
  const sortParams = sortBy.map((field) => field.replace(".", "___"))
  const result = await graphql(`{
    allMdx(
      filter: { fields: { pathInProject: { regex: "^/\/${basePath}/" }}}
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
    console.error(result.errors)
    throw result.errors
  }

  const entries = result.data.allMdx.edges

  for (let i = 0; i < entries.length; i++) {
    console.log("making page")
    const { node } = entries[i]

    actions.createPage({
      path: node.fields.slug + "/",
      component: componentWithMDXScope(
        component,
        node.code.scope,
      ),
      context: {
        // next: next ? next.fields.slug : null,
        // previous: prev ? prev.fields.slug : null,
        id: node.id,
        // frontmatter: node.frontmatter,
      },
    })
  }
}
