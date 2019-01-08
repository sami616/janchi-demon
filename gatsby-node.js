const path = require('path')

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

		// Create pages
		data.allContentfulPage.edges.forEach(({ node: { slug, id } }) => {
			actions.createPage({
				path: slug,
				component: path.resolve('./src/templates/page.js'),
				context: { id }
			})
		})
		resolve()
	})
