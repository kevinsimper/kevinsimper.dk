import { ApolloServer, gql } from 'apollo-server-express'
import { join } from 'path'
import marked from 'marked'
import blogdata from '../blog/posts/_data.json'
import { promises } from 'fs'
const readFile = promises.readFile

const typeDefs = gql`
  type Post {
    slug: String
    title: String
    date: String
    tags: [String]
    content: String
  }
  type Query {
    hello: String
    posts(first: Int): [Post]
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    posts: () => {
      return Promise.all(
        blogdata.map(({ slug, title, date, tags }) => {
          const blogcontent = readFile(
            join(__dirname, '../blog/posts/' + slug + '.md'),
            'utf8'
          )
          return blogcontent.then(blogc => {
            const content = marked(blogc).replace(
              /<img/g,
              '<img loading="lazy"'
            )
            return {
              content,
              slug,
              title,
              date,
              tags
            }
          })
        })
      )
    }
  }
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
})
