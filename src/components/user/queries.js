import { gql } from "urql"

export const QUERY_USER = gql`
query User($before: String, $after: String)  {
  user {
    id
    isActive
    email
    firstName
    lastName
    fullName
    employee
    instructor
    urlImageThumbnailSmall
    groups {
      edges {
        node {
          id
          name
          permissions(first: 1000, before: $before, after: $after) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor                
            }
            edges {
              node {
                id
                name
                codename
              }
            }
          }
        }
      }
    }
  }
}
`

export const TOKEN_AUTH = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      payload
      refreshToken
      refreshExpiresIn
    }
  } 
`


export const TOKEN_VERIFY = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`


export const TOKEN_REFRESH = gql`
  mutation RefreshToken {
    refreshToken {
      token
      payload
      refreshExpiresIn
      refreshToken
    }
  }
`


export const TOKEN_REVOKE = gql`
  mutation RevokeToken($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`


export const TOKEN_COOKIE_DELETE = gql`
  mutation {
    deleteTokenCookie {
      deleted
    }
  }
`


export const TOKEN_REFRESH_COOKIE_DELETE = gql`
  mutation {
    deleteRefreshTokenCookie {
      deleted
    }
  }
`


export const UPDATE_ACCOUNT_PASSWORD = gql`
  mutation UpdateAccountPassword($input: UpdateAccountPasswordInput!) {
    updateAccountPassword(input: $input) {
      ok
    }
  }
`