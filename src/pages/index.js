import React from 'react'
import { graphql, Link } from 'gatsby'

// COMPONENT
const App = ({
	data: {
		allContentfulPage: { edges }
	}
}) =>
	edges.map(({ node: { id, title, slug } }) => (
		<div key={id}>
			<h1>{title}</h1>
			<Link to={slug}>Read more</Link>
		</div>
	))

export default App

// QUERY
export const query = graphql`
	query getPages {
		allContentfulPage(sort: { fields: [createdAt], order: DESC }) {
			edges {
				node {
					id
					title
					slug
				}
			}
		}
	}
`
