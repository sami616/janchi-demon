import React from 'react'
import Link from 'gatsby-link'
import parser from 'html-react-parser'

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>
  } else {
    return <span>{props.text}</span>
  }
}

export default ({ pathContext }) => {
  const { group, index, first, last, pageCount, pathPrefix } = pathContext
  const previousUrl = index - 1 === 1 ? pathPrefix : pathPrefix + '/' + (index - 1).toString()
  const nextUrl = pathPrefix + '/' + (index + 1).toString()
  return (
    <>
      <h4>
        Page {index} of {pageCount}
      </h4>
      {group.map(({ node }) => {
        const { html: excerpt } = node.excerpt.childMarkdownRemark
        return (
          <div key={node.id}>
            <time>{node.createdOn}</time>
            <Link to={node.slug}>{node.title}</Link>
            {parser(excerpt)}
            {node.author && <p>Post By {node.author.name}</p>}
          </div>
        )
      })}
      <hr />
      <NavLink test={first} url={previousUrl} text="Go to Previous Page" />
      <NavLink test={last} url={nextUrl} text="Go to Next Page" />
    </>
  )
}
