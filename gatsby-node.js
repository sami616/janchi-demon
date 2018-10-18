const path = require('path')
const createPaginatedPages = require('gatsby-paginate')

exports.createPages = ({ graphql, actions }) =>
  new Promise(async (resolve, reject) => {
    // Fetch data
    const { data } = await graphql(`
      {
        allContentfulPage {
          edges {
            node {
              id
              title
              slug
              author {
                name
              }
              excerpt {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    `).catch(err => reject(err))

    // Create pagination
    createPaginatedPages({
      edges: data.allContentfulPage.edges,
      createPage: actions.createPage,
      pageTemplate: 'src/templates/pages.js',
      pageLength: 1,
      pathPrefix: 'pages'
    })

    // Loop through and create pages
    data.allContentfulPage.edges.forEach(({ node: { slug, id } }) => {
      actions.createPage({
        path: slug,
        component: path.resolve('./src/templates/page.js'),
        context: { id }
      })
    })
    resolve()
  })
