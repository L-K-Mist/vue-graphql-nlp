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
      id
    }
  }
`

export const CREATE_SUPPLIER_MUTATION = gql`
  mutation CreateSupplierMutation($name: String!, $nickname: String!, $email: String!) {
    createSupplier(name: $name, nickname: $nickname,email: $email) {
      name
      nickname
      email
      id
    }
  }
`;

export const UPDATE_SUPPLIER_MUTATION = gql`
  mutation UpdateSupplierMutation($name: String!, $nickname: String!, $email: String!, $id: ID!) {
    updateSupplier(name: $name, nickname: $nickname,email: $email, id: $id) {
      name
      nickname
      email
      id
    }
  }
`;


export const DELETE_SUPPLIER_MUTATION = gql`
  mutation DeleteSupplierMutation($id: ID!) {
    deleteSupplier(id: $id) {
      name
      nickname
      email
      id
    }
  }
`;

export const ALL_RAWLOGS_QUERY = gql`
  query AllRawLogsQuery {
    allRawLogs {
      dayDescribed
      text
      id
    }
  }
`

export const CREATE_RAWLOGS_MUTATION = gql`
  mutation CreateRawLogMutation($dayDescribed: String, $text: String!) {
    createRawLog(dayDescribed: $dayDescribed, text: $text) {
      dayDescribed
      text
      id
    }
  }
`;

export const UPDATE_RAWLOGS_MUTATION = gql`
         mutation UpdateRawLogMutation($dayDescribed: String, $text: String!, $id: ID!) {
           updateRawLog(dayDescribed: $dayDescribed, text: $text, id: $id) {
             dayDescribed
             text
             id
           }
         }
       `;

export const DELETE_RAWLOGS_MUTATION = gql`
  mutation DeleteRawLogMutation($id: ID!) {
    deleteRawLog(id: $id) {
      dayDescribed
      text
      id
    }
  }
`;


