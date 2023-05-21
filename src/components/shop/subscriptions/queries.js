import { gql } from "urql";

export const QUERY_ORGANIZATION_SUBSCRIPTIONS = gql`
  query OrganizationSubscriptions($after: String, $before: String) {
    organizationSubscriptions(first: 100, before: $before, after: $after, archived: false, displayShop: true) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          archived
          priceTodayDisplay
          displayPublic
          displayShop
          name
          description
          sortOrder
          minDuration
          classes
          subscriptionUnit
          subscriptionUnitDisplay
          reconciliationClasses
          unlimited
          termsAndConditions
          registrationFee
          quickStatsAmount
          financeGlaccount {
            id 
            name
          }
          financeCostcenter {
            id
            name
          }
        }
      }
    }
  }
`