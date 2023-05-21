import { gql } from "urql";

export const QUERY_SHOP_ANNOUNCEMENTS = gql`
  query OrganizationAnnouncements($after: String, $before: String) {
    organizationAnnouncements(first: 100, before: $before, after: $after, displayPublic: true, displayShop: true) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          displayPublic
          displayShop
          title
          content
          dateStart
          dateEnd
          priority
        }
      }
    }
  }
`
