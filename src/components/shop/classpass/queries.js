import { gql } from "urql";

export const QUERY_ORGANIZATION_CLASSPASS = gql`
  query OrganizationClasspass($id: ID!) {
    organizationClasspass(id:$id) {
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
    user {
      hasReachedTrialLimit
    }
  }
`
