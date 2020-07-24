import {CreateNodeArgs, CreatePagesArgs} from "gatsby"
import graphql from "graphql-tag"

export const onCreateNode = ({node, getNode, actions}: CreateNodeArgs) => {
  const parent = getNode(node.parent)
  const collection = parent["sourceInstanceName"]
  let relPath = parent["relativeDirectory"] as string
  if (relPath.length > 0) {
    relPath += "/"
  }

  actions.createNodeField({node, name: "collection", value: collection})
  actions.createNodeField({
    node,
    name: "slug",
    // Gives us something like: /blog/2019/10/filename
    value: `/${collection}/${relPath}${parent.name}`,
  })
}

export const createPages = (
  collection: string,
  sortBy: string[],
  component: string,
) => async ({graphql, actions}: CreatePagesArgs) => {
  let finalSort = null
  if (sortBy && sortBy.length) {
    const sortParams = sortBy.map((f) => f.replace(".", "___"))
    finalSort = {fields: sortParams}
  }

  const {data, errors} = await graphql(AllMdx.loc.source.body, {
    collection,
    sortBy: finalSort,
  })
  if (errors) {
    throw errors
  }

  for (const edge of (data as any).allMdx.edges) {
    const {node, next, previous} = edge

    const context: MdxContext = {
      next: next && !next.frontmatter.draft && next.fields.slug,
      prev: previous && !previous.frontmatter.draft && previous.fields.slug,
      id: node.id,
    }
    
    actions.createPage({
      component,
      path: node.fields.slug + "/",
      context,
    })
  }
}

const AllMdx = graphql`query AllMdx(
  $collection: String!,
  $sortBy: MdxSortInput,
) {
  allMdx(
filter: {fields: {collection: {eq: $collection}}},
    sort: $sortBy,
  ) {
    edges {
      next {
fields { slug }
frontmatter { draft }
}
      previous {
fields { slug }
frontmatter { draft }

}
      node {
        id
        fields { slug }
      }
    }
  }
}`

export interface MdxContext {
  next: string;
  prev: string;
  id: string;
}
