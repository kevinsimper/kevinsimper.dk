import { ApolloServer, gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
}

export const server = new ApolloServer({ typeDefs, resolvers })
