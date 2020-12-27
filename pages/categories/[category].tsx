import React from 'react'
import { readFileSync } from 'fs'

function CategoryPage({ category, posts }) {
  return (
    <div>
      <h1 className="text-2xl">Category: {category}</h1>

      {posts.map((post) => {
        return (
          <div className="py-2">
            <a href={'/posts/' + post.slug}>
              <h3 className="text-xl text-purple-600">{post.title}</h3>
              <div>{post.date}</div>
              <ul className="flex">
                {post.tags?.map((tag) => (
                  <li className="pr-1">
                    <a
                      className="text-purple-600"
                      href={`/categories/${category}`}
                    >
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

  const category = context.params.category

  const posts = data.filter((b) => {
    if (b.hasOwnProperty('tags')) {
      return b.tags.includes(category)
    } else {
      return false
    }
  })

  return {
    props: { category, posts },
  }
}

export default CategoryPage
