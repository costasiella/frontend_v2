// @ts-check
import React, { useContext } from "react"
import { useQuery } from "urql"
import { useTranslation } from "react-i18next"
import { SimpleGrid } from "@chakra-ui/react";

import { QUERY_SCHEDULE_EVENTS } from "./queries";
import GlobalContext from '../../contexts/GlobalContext';

import CSError from "../../general/CSError";
import CSShopPagedheading from "../../general/CSShopPageHeading"
import CSSpinner from "../../general/CSSpinner";

export default function ShopEvents() {
  /** @type {Object} */
  const context = useContext(GlobalContext)
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
    <SimpleGrid spacing="4" minChildWidth="300px" columns={3}>

    </SimpleGrid>
  </React.Fragment>
}