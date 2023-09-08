// @ts-check
import React, { useContext } from "react"
import { useQuery } from "urql"
import { useTranslation } from "react-i18next"
import moment from "moment"
import DOMPurify from 'dompurify'
import { Link, useMatches } from "react-router-dom"
import { 
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
  Box,
  Button,
  CardBody,
  CardHeader,
  Circle,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Text,
  Tooltip,
  useColorModeValue
} from "@chakra-ui/react";
import {
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiUser, 
} from 'react-icons/fi';

import { QUERY_SCHEDULE_EVENT } from "./queries";
import GlobalContext from '../../contexts/GlobalContext';

import CSAuth from "../../../tools/authentication"
import CSError from "../../general/CSError";
import ShopPricingCard from "../../general/ShopPricingCard"
import CSShopCard from "../../general/CSShopCard"
import CSShopCardheading from "../../general/CSShopCardHeading"
import CSShopPageheading from "../../general/CSShopPageHeading"
import CSSpinner from "../../general/CSSpinner";

export default function ShopEvent() {
  const matches = useMatches()
  const scheduleEventId = matches[0].params.id
  /** @type {Object} */
  const context = useContext(GlobalContext)
  const dateFormat = context.appSettings.dateFormat
  const bg = useColorModeValue('white', 'gray.800')
  const fontColor = useColorModeValue('gray.800', 'white')
  const { t } = useTranslation()
  const [result] = useQuery({
    query: QUERY_SCHEDULE_EVENT,
    variables: { id: scheduleEventId }
  });
    
  const { data, fetching, error } = result;

  if (error) {
    console.warn(error) 
    return (
      <CSError errorMessage={error.message} />
    )
  }  
  
  if (fetching) {
    return <CSSpinner />
  }

  const event = data.scheduleEvent
  const tickets = event.tickets


  return <React.Fragment>
    <CSShopPageheading>
      {event.name}
    </CSShopPageheading>
      <CSShopCard>
      <CardBody>
        <List spacing={0}>
          <ListItem key={`li_1`}>
            <ListIcon as={FiUser} />
            {event.instructor.fullName}
          </ListItem>
          <ListItem key={`li_2`}>
            <small>
            <ListIcon as={FiCalendar} />
            {moment(event.dateStart).format(dateFormat)}
            </small>
          </ListItem>
        </List>
      </CardBody>
      </CSShopCard>
    <Grid templateColumns={{ base: "1", lg: 'repeat(3, 1fr)'}} gap={6}>
      <GridItem colSpan={1}>
        <CSShopCard>
          <CardBody>
            <Image
              src={(event.media.edges.length) ? event.media.edges[0].node.urlImageThumbnailLarge: ""}
              alt={`Picture of ${event.name}`}
              roundedTop="md"
              roundedBottom="md"
            />
          </CardBody>
        </CSShopCard>
      </GridItem>
      <GridItem colSpan={{base: 1, lg: 2}}>
        <CSShopCard>
          <CardBody>
            {/* Card heading */}
            <CSShopCardheading>
              {event.tagline}
            </CSShopCardheading>
            {/* Card contents */}
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }} />
          </CardBody>
        </CSShopCard>
      </GridItem>
    </Grid>
    <Grid templateColumns={{ base: "1", lg: 'repeat(3, 1fr)'}} gap={6}>
      <GridItem colSpan={3}>
        <Heading 
          as="h3" 
          size="md"
          mt={6}
          textAlign={{base: "center", md:  "left"}}
        >
          {t('general.tickets')}
        </Heading>
      </GridItem>
      {(!CSAuth.userIsSignedin()) ? 
        <GridItem colSpan={3}>
            <Alert 
              status='info'
              variant='subtle'
              flexDirection='column'
              alignItems='left'
              justifyContent='left'
              textAlign={{base: "center", md:  "left"}}
              roundedTop='md'
              roundedBottom='md'
              maxW={{ base: '330px', md: '700px', lg: "3000px"}}
              w={'full'}
              ml="auto"
              mr="auto"
            >
              <AlertDescription>
                <Link to="/user/login">
                  <Button rightIcon={<FiArrowRight />} colorScheme='blue'  size="sm" mr="3">
                    {t("general.sign_in")}
                  </Button>
                </Link> 
                <Text as="span" color="">{t("shop.events.sign_in_to_see_discounts")}</Text>
              </AlertDescription>
            </Alert>
        </GridItem>
      : ""}
      {tickets.edges.map(({ node }) => (
        <GridItem>
          <ShopPricingCard
            key={node.id}
            title={node.name}
            price={node.totalPriceDisplay}
            priceUnit=""
            buttonHref={`/shop/event_ticket/${node.id}`}
            buttonText={t("shop.events.buy_ticket")}
            cardItems ={
              node.ticketScheduleItems.edges.map(({ node: activity }) => (
                {
                  icon: FiCalendar,
                  text: <React.Fragment>
                    {activity.scheduleItem.name} <br />
                    <small>
                      
                      {activity.scheduleItem.dateStart} {activity.scheduleItem.timeStart} - {activity.scheduleItem.timeEnd}
                    </small>
                  </React.Fragment>
                }
              ))
            }
          />
        </GridItem>
      ))}
    </Grid>
  </React.Fragment>
}
