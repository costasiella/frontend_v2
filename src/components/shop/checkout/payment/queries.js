import { gql } from "urql"

export const CREATE_PAYMENT_LINK = gql`
  mutation CreateFinanceOrderPaymentLink($id: ID!) {
    createFinanceOrderPaymentLink(id: $id) {
      financeOrderPaymentLink {
        paymentLink
      }
    }
  }
`
