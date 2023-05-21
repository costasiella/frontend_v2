import { gql } from "urql"

export const QUERY_ORDER = gql`
  query FinanceOrder($id: ID!) {
    financeOrder(id: $id) {
      id
      orderNumber
      account {
        id
        fullName
        hasCompleteEnoughProfile
      }
      message
      status
      total
      totalDisplay
      createdAt
      items {
        edges {
          node {
            id
            productName
            description
            quantity
            totalDisplay
            scheduleItem {
              id
            }
            attendanceDate
          }
        }
      }
    }
  }
`
