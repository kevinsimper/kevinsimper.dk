import { ApolloServer, gql } from 'apollo-server-express'
import { graphql } from 'graphql'
import marked from 'marked'
import { join } from 'path'
import { makeExecutableSchema } from 'graphql-tools'
import { promises } from 'fs'
import blogdata from '../blog/posts/_data.json'
import PresentationsData from '../components/Presentations/data.json'
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
  type Link {
    text: String
    link: String
  }
  type Presentation {
    name: String
    location: String
    description: String
    links: [Link]
  }
  type Video {
    youtubeId: String
    title: String
  }
  type Query {
    hello: String
    post(slug: String!): Post
    posts(first: Int): [Post]
    presentations: [Presentation]
    videos: [Video]
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

const videos = [
  { youtubeId: '6NG_cUeuNhU' },
  { youtubeId: 'hSvuHBQ_7VE' },
  { youtubeId: 'Dnr8Mu1Bco4' },
  { youtubeId: 'eg4e-FObyJ8' }
]

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    post: (parent, args) => {
      const blog = blogdata.find(i => i.slug === args.slug)
      return transformBlogpost(blog)
    },
    posts: () => {
      return Promise.all(blogdata.map(transformBlogpost))
    },
    presentations: () => {
      return PresentationsData.presentations
    },
    videos: () => {
      return videos
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

export const makeQuery = query => {
  return graphql(schema, query)
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})
