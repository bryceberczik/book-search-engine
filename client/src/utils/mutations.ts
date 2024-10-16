import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
    mutation addUser($input: UserInput!) {
        addUser(input: input!) {
            token
            user {
                _id
                name
            }
        }
    }`;

export const SAVE_BOOK = gql`
  mutation addBook($input: BookInput!) {
    addBook(input: $input) {
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;