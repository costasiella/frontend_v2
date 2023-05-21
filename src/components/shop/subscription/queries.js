import { gql } from "urql";

export const QUERY_ORGANIZATION_SUBSCRIPTION = gql`
  query OrganizationSubscription($id: ID!) {
    organizationSubscription(id:$id) {
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
      shopPaymentMethod
      accountRegistrationFee
      accountRegistrationFeeDisplay
      priceFirstMonthDisplay
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
      hasBankAccountInfo
    }
  }
`
