import { gql } from "urql"


export const QUERY_SHOP_GLOBAL_CONTEXT = gql`
  query ShopGlobalContext {
    organization(id: "T3JnYW5pemF0aW9uTm9kZToxMDA=") {
      id
      name
      address
      phone
      email
      registration
      taxRegistration
      urlLogoLogin
      urlLogoInvoice
      urlLogoEmail
      urlLogoShopHeader
      urlLogoSelfCheckin
      brandingColorBackground
      brandingColorText
      brandingColorAccent
      brandingColorSecondary
    }
    appSettings(id: "QXBwU2V0dGluZ3NOb2RlOjE=") {
      dateFormat
      timeFormat
      timeFormatMoment
      dateTimeFormatMoment
      onlinePaymentsAvailable
      accountSignupEnabled
    }
    systemFeatureShop(id: "U3lzdGVtRmVhdHVyZVNob3BOb2RlOjE=") {
      memberships
      subscriptions
      classpasses
      classes
      events
    }
  }
`