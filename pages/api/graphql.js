import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    uploads: [File]
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Mutation {
    singleUpload(file: Upload!): File!
  }
`

const resolvers = {
  Query: {
    uploads: (parent, args) => {},
  },
  Mutation: {
    async singleUpload(parent, { file }) {
      const { stream, filename, mimetype, encoding } = await file

      // 1. Validate file metadata.

      // 2. Stream file contents into cloud storage:
      // https://nodejs.org/api/stream.html

      // 3. Record the file upload in your DB.
      // const id = await recordFile( … )

      return { filename, mimetype, encoding }
    },
  },
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default new ApolloServer({ typeDefs, resolvers }).createHandler({
  path: '/api/graphql',
})
