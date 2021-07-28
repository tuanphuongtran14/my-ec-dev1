module.exports = {
    definition: `
    `,
    query: `
        getBlogBySlug(slug: String!): Blog!,
    `,
    resolver: {
        Query: {
            getBlogBySlug : {
                description: 'Get blog by slug',
                resolver: 'application::blog.blog.getBlogBySlug',
            },
        },
    },
  }