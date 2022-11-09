import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query Query {
    user {
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
      orders {
        _id
        purchaseDate
        products {
          _id
          title
          price
        }
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts {
    products {
      _id
      title
      images
      description
      category
      price
      compareAtPrice
      vendor
      tags
      reviews {
        rating
        body
      }
      upc
      variants {
        id
        size
        color
        inventory
        image
      }
    }
  }
`;
