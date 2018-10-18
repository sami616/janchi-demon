import React from 'react'
import { graphql } from 'gatsby'
import parser from 'html-react-parser'

export default ({ data }) => {
  const { contentfulPage: page } = data
  const { id, title, excerpt, body, createdAt, featuredImage, author } = page
  const { file, title: imgTitle, description } = featuredImage

  const {
    childMarkdownRemark: { html: excerptHTML }
  } = excerpt

  const {
    childMarkdownRemark: { html: bodyHTML }
  } = body

  return (
    <div key={id}>
      <h1>{title}</h1>
      <time>{createdAt}</time>
      {parser(excerptHTML)}
      {parser(bodyHTML)}
      <img style={{ width: '100%' }} title={imgTitle} alt={description} src={file.url} />
      {author && <p>Post By {author.name}</p>}
    </div>
  )
}

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
