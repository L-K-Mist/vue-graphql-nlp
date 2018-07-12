// 1
import gql from 'graphql-tag'

// 2
export const ALL_LINKS_QUERY = gql `
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
  `
export const CREATE_LINK_MUTATION = gql `
  mutation CreateLinkMutation($description: String!, $url: String!) {
    createLink(
      description: $description,
      url: $url,
    ) {
      id
      createdAt
      url
      description
    }
  }
`
export const ALL_SUPPLIERS_QUERY = gql `
  query AllSuppliersQuery {
    allSuppliers {
      name
      nickname
      email
    }
  }
`

export const CREATE_SUPPLIER_MUTATION = gql`
  mutation CreateSupplierMutation($name: String!, $nickname: String!, $email: String!) {
    createLink(name: $name, nickname: $nickname,email: $email) {
      id
      createdAt
    }
  }
`;