import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $image: String
    $address: AddressInput
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      image: $image
      address: $address
    ) {
      _id
      firstName
      lastName
      email
      image
      address {
        street
        city
        state
        zip
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        title
        price
        quantity
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview(
    $reviewText: String!
    $reviewRating: Int!
    $productId: ID!
  ) {
    addReview(
      reviewText: $reviewText
      reviewRating: $reviewRating
      productId: $productId
    ) {
      _id
      reviews {
        _id
        reviewText
        reviewRating
        createdAt
      }
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation removeReview($reviewId: ID!, $productId: ID!) {
    removeReview(reviewId: $reviewId, productId: $productId) {
      _id
      reviews {
        _id
        reviewText
        reviewRating
        createdAt
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($productId: ID!) {
    addToCart(productId: $productId) {
      _id
      purchaseDate
      products {
        _id
        title
        price
        quantity
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($productId: ID!) {
    removeFromCart(productId: $productId) {
      _id
      purchaseDate
      products {
        _id
        title
        price
        quantity
      }
    }
  }
`;

export const UPDATE_CART_QUANTITY = gql`
  mutation updateCartQuantity($productId: ID!, $quantity: Int!) {
    updateCartQuantity(productId: $productId, quantity: $quantity) {
      _id
      purchaseDate
      products {
        _id
        title
        price
        quantity
      }
    }
  }
`;

export const CLEAR_CART = gql`
  mutation clearCart {
    clearCart {
      _id
      purchaseDate
      products {
        _id
        title
        price
        quantity
      }
    }
  }
`;
