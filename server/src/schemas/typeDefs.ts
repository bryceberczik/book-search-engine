import gql from "graphql-tag";

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]!
    bookCount: Number!
    }

type Book {
    _id: ID!
    bookId: String!
    title: String!
    authors: [String]!
    description: String!
    image: String
    link: String
    }

input UserInput {
    username: String!
    email: String!
    password: String!
}

input BookInput {
    bookId: String!
    title: String!
    authors: [String]!
    description: String!
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}


type Query {
    users: [User]
    user(username: String!): User
    books: [Book]
    book(bookId: String!): Book
    me: User
}

type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: String!): User
}
`;

export default typeDefs;