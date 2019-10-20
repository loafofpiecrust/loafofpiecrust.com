import path from "path"
import { CreateNodeArgs, CreatePagesArgs } from "gatsby"

const projectDir = path.dirname(__dirname)

// TODO: Pull this out into a generic fileNodeAddSlug or something
export const onCreateNode = ({ node, getNode, actions }: CreateNodeArgs) => {
  // TODO: clean up this logic?
  const parent = getNode(node.parent)
  const pathInProject = "/" + path.relative(projectDir, parent.absolutePath)
    .replace(/\.[^/.]+$/, "")

  // Remove base-paths from the final URL
  const pathOnline = pathInProject.replace(/^(\/src)?\/(content|pages)/, "")

  // If content specifies 'slug', use that for the last part of generated path
  let slug = node.frontmatter["slug"]
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
export const createPages = (
  pattern: string,
  sortBy: string[],
  component: string,
) => async ({ graphql, actions }: CreatePagesArgs) => {
  let sortQuery = ""
  if (sortBy && sortBy.length) {
    const sortParams = sortBy.map((f) => f.replace(".", "___"))
    sortQuery = `sort: { fields: [${sortParams}] }`
  }
  const { data, errors } = await graphql(`{
    allMdx(
      filter: { fields: { pathInProject: { glob: "/${pattern}" }}}
      ${sortQuery}
    ) {
      edges {
        next { fields { slug } }
        previous { fields { slug } }
        node {
          id
          fields { slug }
        }
      }
    }
  }`)
  if (errors) {
    throw errors
  }

  for (const edge of data.allMdx.edges) {
    const { node, next, previous } = edge

    actions.createPage({
      component,
      path: node.fields.slug + "/",
      context: {
        next: next && next.fields.slug,
        previous: previous && previous.fields.slug,
        id: node.id,
      },
    })
  }
}
