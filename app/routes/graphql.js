import { ApolloServer, gql } from 'apollo-server-express'
import marked from 'marked'

import { join } from 'path'
import { makeExecutableSchema } from 'graphql-tools'
import { promises } from 'fs'

import blogdata from '../blog/posts/_data.json'

const readFile = promises.readFile

const typeDefs = gql`
  type Post {
    slug: String
    title: String
    date: String
    tags: [String]
    content: String
    previousPosts(first: Int!): [Post]
    newerPosts(first: Int!): [Post]
  }
  type Query {
    hello: String
    post(slug: String!): Post
    posts(first: Int): [Post]
  }
`

const transformBlogpost = ({ slug, title, date, tags }) => {
  const blogcontent = readFile(
    join(__dirname, '../blog/posts/' + slug + '.md'),
    'utf8'
  )
  return blogcontent.then(blogc => {
    const content = marked(blogc).replace(/<img/g, '<img loading="lazy"')
    return {
      content,
      slug,
      title,
      date,
      tags
    }
  })
}

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    post: (parent, args) => {
      const blog = blogdata.find(i => i.slug === args.slug)
      return transformBlogpost(blog)
    },
    posts: () => {
      return Promise.all(blogdata.map(transformBlogpost))
    }
  },
  Post: {
    previousPosts: (parent, args) => {
      const previous = blogdata.findIndex(i => i.slug === parent.slug) - 1
      return [blogdata[previous]]
    },
    newerPosts: (parent, args) => {
      const newer = blogdata.findIndex(i => i.slug === parent.slug) + 1
      return [blogdata[newer]]
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
})
