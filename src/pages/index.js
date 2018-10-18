import React from 'react'
import { graphql, Link } from 'gatsby'

export default ({ data }) => {
  const { edges: pages } = data.allContentfulPage
  return pages.map(page => {
    const { id, title, slug } = page.node

    return (
      <div key={id}>
        <h1>{title}</h1>
        <Link to={slug}>Read more</Link>
      </div>
    )
  })
}

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
