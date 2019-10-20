export const collections = [
  {
    folder: "src/content/stories",
    name: "stories",
    label: "Stories",
    labelSingular: "Story",
    sortBy: ["fields.slug"],
    component: "templates/story.tsx",
  },
  {
    folder: "src/content/blog",
    name: "blog",
    label: "Blog",
    labelSingular: "Post",
    sortBy: ["frontmatter.series", "frontmatter.date"],
    component: "templates/post.tsx",
  },
]
