// @ts-check
import React, { useContext } from "react"
import { useQuery } from "urql"
import { useTranslation } from "react-i18next"
import moment from "moment"
import DOMPurify from 'dompurify'
import { Link } from "react-router-dom"
import { 
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import {
  FiChevronRight, 
} from 'react-icons/fi';

import { QUERY_SCHEDULE_EVENTS } from "./queries";
import GlobalContext from '../../contexts/GlobalContext';

import CSButtonPrimary from "../../general/CSButtonPrimary"
import CSError from "../../general/CSError";
import CSShopCard from "../../general/CSShopCard"
import CSShopPagedheading from "../../general/CSShopPageHeading"
import CSSpinner from "../../general/CSSpinner";

export default function ShopEvents() {
  /** @type {Object} */
  const context = useContext(GlobalContext)
  const dateFormat = context.appSettings.dateFormat
  const { t } = useTranslation()
  const [result] = useQuery({
    query: QUERY_SCHEDULE_EVENTS,
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

  const events = data.scheduleEvents

  return <React.Fragment>
    <CSShopPagedheading>
      {t("shop.events.title")}
    </CSShopPagedheading>
    <SimpleGrid spacing="4" minChildWidth={{ base: "300px", md: "330px"}} columns={3}>
      {events.edges.map(({ node }) => (
        <CSShopCard>
          {(node.media.edges.length) ?
            <Link to={`/shop/events/${node.id}`}>
              <Image
                src={(node.media.edges.length) ? node.media.edges[0].node.urlImageThumbnailLarge: ""}
                alt={`Picture of ${node.name}`}
                roundedTop="md"
                width="full"
              />
            </Link> : "" }
            <Box p="6">
              <Link to={`/shop/events/${node.id}`}>
                <Flex mt="1" justifyContent="space-between" alignContent="center">
                  <Box
                    fontSize="lg"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    // isTruncated
                  >
                    {node.name}
                  </Box>
                </Flex>
              </Link>
              <Flex mt="1" justifyContent="space-between" alignContent="center">
                <Box
                  fontSize="sm"
                  fontWeight="semibold"
                  as="h5"
                  lineHeight="tight">
                  {node.tagline}
                </Box>
              </Flex>
              <Text fontSize="sm" mt={3}>
                {(node.instructor) ? node.instructor.fullName: ""} <br />
                {moment(node.dateStart).format(dateFormat)}
              </Text>
              <Text mt={3}>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(node.preview) }} />
              </Text>
              <Text mt={3} mb="64px" color="green.500" fontWeight={"bold"}>
                {node.tickets && node.tickets.edges && node.tickets.edges[0].node.priceDisplay}
              </Text>
              <Box mt={3} pos="absolute" bottom="0" left="0" p="24px" w='full' fontWeight={"bold"} >
                <Link to={`/shop/events/${node.id}`}>
                  <CSButtonPrimary
                    w={'full'}
                    rightIcon={<FiChevronRight />}
                    buttonText={t("shop.events.event_details")}
                  />
                </Link>
              </Box>
            </Box>
          </CSShopCard>
      ))}
    </SimpleGrid>
  </React.Fragment>
}
