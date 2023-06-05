import { gql } from "urql";

export const QUERY_ORGANIZATION_CLASSPASSES = gql`
  query OrganizationClasspasses($after: String, $before: String) {
    organizationClasspasses(first: 100, before: $before, after: $after, archived: false, displayShop: true) {
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
          displayPublic
          displayShop
          trialPass
          name
          description
          price
          priceDisplay
          validity
          validityUnit
          validityUnitDisplay
          classes
          unlimited
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