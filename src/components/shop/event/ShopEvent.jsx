// @ts-check
import React, { useContext } from "react"
import { useQuery } from "urql"
import { useTranslation } from "react-i18next"
import moment from "moment"
import DOMPurify from 'dompurify'
import { Link, useMatches } from "react-router-dom"
import { 
  Badge,
  Box,
  Circle,
  Flex,
  Image,
  SimpleGrid,
  Text,
  Tooltip,
  useColorModeValue
} from "@chakra-ui/react";
import {
  FiChevronRight, 
} from 'react-icons/fi';

import { QUERY_SCHEDULE_EVENT } from "./queries";
import GlobalContext from '../../contexts/GlobalContext';

import CSError from "../../general/CSError";
import CSShopPagedheading from "../../general/CSShopPageHeading"
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

  const events = data.scheduleEvents


  return <React.Fragment>
    <CSShopPagedheading>
      {t("shop.event.title")}
    </CSShopPagedheading>
    Hello world!
  </React.Fragment>
}
