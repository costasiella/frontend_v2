import { gql } from "urql";


export const QUERY_ACCOUNT_BANK_ACCOUNTS = gql`
  query AccountBankAccounts($before: String, $after: String, $account: ID!) {
    accountBankAccounts(first: 1, before: $before, after: $after, account: $account) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          account {
            id
            fullName
          }
          number
          holder
          bic
        }
      }
    }
    user {
      id
      accountId
      firstName
      lastName
      fullName
      email
      gender
      dateOfBirth
      address
      postcode
      city
      country
      phone
      mobile
      emergency
      instructor
      employee
      profilePolicy
    }
  }
`


export const UPDATE_BANK_ACCOUNT = gql`
  mutation UpdateBankAccount($input:UpdateAccountBankAccountInput!) {
    updateAccountBankAccount(input: $input) {
      accountBankAccount {
        id
      }
    }
  }
`
