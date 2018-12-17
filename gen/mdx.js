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
exports.createPages = (basePath, sortBy) => async ({ graphql, actions }) => {
  // console.log("creating mdx pages")
  const sortParams = sortBy.map(field => field.replace(".", "___"))
  const result = await graphql(`
    {
      allMdx(
        filter: { fields: { slug: { glob: "${basePath}/*" }}}
        sort: { fields: ${sortParams} }
      ) {
        edges {
          next {
            fields { slug }
          }
          previous {
            fields { slug }
          }
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

  result.data.allMdx.edges.forEach(({ node, next, previous }) => {
    actions.createPage({
      path: node.fields.slug,
      // component: componentWithMDXScope(
      //   path.resolve("./src/components/mdxStory.tsx"),
      //   node.code.scope
      // ),
      component: node.parent.absolutePath,
      context: {
        next: next ? next.fields.slug : null,
        previous: previous ? previous.fields.slug : null,
      }
    })
  })
}