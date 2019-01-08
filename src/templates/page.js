import React from 'react'
import { graphql } from 'gatsby'
import parser from 'html-react-parser'

// COMPONENT
const Page = ({
	data: {
		contentfulPage: { id, title, createdAt, author, featuredImage, excerpt, body }
	}
}) => (
	<div key={id}>
		<h1>{title}</h1>
		<time>{createdAt}</time>
		{parser(excerpt.childMarkdownRemark.html)}
		{parser(body.childMarkdownRemark.html)}
		<img style={{ width: '100%' }} title={featuredImage.title} alt={featuredImage.description} src={featuredImage.file.url} />
		{author && <p>Post By {author.name}</p>}
	</div>
)

export default Page

// QUERY
export const pageQuery = graphql`
	query pageQuery($id: String!) {
		contentfulPage(id: { eq: $id }) {
			id
			title
			createdAt(formatString: "MMMM DD, YYYY")
			featuredImage {
				title
				description
				file {
					url
				}
			}
			author {
				name
			}
			excerpt {
				childMarkdownRemark {
					html
				}
			}
			body {
				childMarkdownRemark {
					html
				}
			}
		}
	}
`
