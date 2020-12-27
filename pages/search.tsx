import React from 'react'
import { readFileSync } from 'fs'

function SearchPage({ query, posts }) {
  return (
    <div>
      <h1 className="text-2xl">Searched: {query}</h1>
      <p>Found {posts.length} results</p>

      {posts.map((post) => {
        return (
          <div className="py-2">
            <a href={'/posts/' + post.slug}>
              <h3 className="text-xl text-purple-600">{post.title}</h3>
              <div>{post.date}</div>
              <ul className="flex">
                {post.tags?.map((tag) => (
                  <li className="pr-1">
                    <a className="text-purple-600" href={`/categories/${tag}`}>
                      #{tag}
                    </a>
                  </li>
                ))}
              </ul>
            </a>
          </div>
        )
      })}
    </div>
  )
}

export async function getServerSideProps(context) {
  const path = process.cwd() + '/app/blog/posts/'
  const data: {
    slug: string
    title: string
    date: string
    tags: string[]
  }[] = JSON.parse(readFileSync(path + '_data.json', 'utf8'))

  const query = context.query.query

  if (!query) {
    return { props: { query: '', posts: [] } }
  }

  const posts = data.filter((p) => {
    if (p.title.toLowerCase().includes(query.toLowerCase())) {
      return true
    }
    const content = readFileSync(path + p.slug + '.md', 'utf8')
    if (content.toLowerCase().includes(query.toLowerCase())) {
      return true
    }
    return false
  })

  return {
    props: { query, posts },
  }
}

export default SearchPage
