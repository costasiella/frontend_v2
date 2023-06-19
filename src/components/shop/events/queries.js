import { gql } from 'urql'

export const QUERY_SCHEDULE_EVENTS = gql`
  query ScheduleEvents($before:String, $after:String) {
    scheduleEvents(first: 100, before: $before, after:$after, archived:false, displayShop:true) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          archived
          displayPublic
          displayShop
          autoSendInfoMail
          organizationLocation {
            id
            name
          }
          name
          tagline
          preview
          description
          organizationLevel {
            id
            name
          }
          instructor {
            id 
            fullName
          }
          instructor2 {
            id
            fullName
          }
          dateStart
          dateEnd
          timeStart
          timeEnd
          infoMailContent
          scheduleItems {
            edges {
              node {
                id
              }
            }
          }
          tickets(first: 1, fullEvent:true, deletable: false) {
            edges {
              node {
                priceDisplay
                isSoldOut
                isEarlybirdPrice
              }
            }
          }
          media(first: 1) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            edges {
              node {
                urlImageThumbnailSmall
                urlImageThumbnailLarge
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`
