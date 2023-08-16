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
  FiCalendar,
  FiUser, 
} from 'react-icons/fi';

import { QUERY_SCHEDULE_EVENT } from "./queries";
import GlobalContext from '../../contexts/GlobalContext';

import CSAuth from "../../../tools/authentication"
import CSError from "../../general/CSError";
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
        <Heading as="h3" size="md">
          {t('general.tickets')}
        </Heading>
      </GridItem>
      <GridItem colSpan={3}>
        {(!CSAuth.userIsSignedin()) ? 
          <Alert 
            status='info'
            variant='subtle'
            flexDirection='column'
            alignItems='left'
            justifyContent='left'
            textAlign='left'
            roundedTop='md'
            roundedBottom='md'
          >
            <AlertDescription>
            <Link to="/user/login">
              <b>{t("general.sign_in")}</b>
            </Link> {t("shop.events.sign_in_to_see_discounts")}</AlertDescription>
          </Alert>
        : ""}
      </GridItem>
    </Grid>
  </React.Fragment>
}
