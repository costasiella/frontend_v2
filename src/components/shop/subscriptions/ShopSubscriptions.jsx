// @ts-check

import React from 'react'
import { useQuery } from "urql";
import { useTranslation } from 'react-i18next';
import { 
    Box,
    Heading,
    SimpleGrid
  } from "@chakra-ui/react";

import { QUERY_ORGANIZATION_SUBSCRIPTIONS } from "./queries";

import CSSpinner from "../../general/CSSpinner";
import ShopPricingCard from "../../general/ShopPricingCard";
import { FiCheck } from "react-icons/fi";

export default function ShopSubscriptions() {
  const { t } = useTranslation()
  const [result] = useQuery({
    query: QUERY_ORGANIZATION_SUBSCRIPTIONS,
  });
    
  const { data, fetching, error } = result;

  if (error) {
    console.warn(error) 
    return (
      <Box>{error.message}</Box>
    )
  }  
  
  if (fetching) {
    return <CSSpinner />
  }

  const subscriptions = data.organizationSubscriptions

  return (
    <React.Fragment>
      <Heading as="h2" fontSize="24px" textAlign={{base: "center", md:  "left"}}>
        {t("shop.menu.subscriptions")}
      </Heading>
      <SimpleGrid spacing="4" minChildWidth="300px" columns={3}>
        {subscriptions.edges.map(({ node }) => (
          <ShopPricingCard
            key={node.id}
            title={node.name}
            price={node.priceTodayDisplay}
            priceUnit={t("general.month")}
            buttonHref={`/shop/subscriptions/${node.id}`}
            buttonText="Choose"
            cardItems={[
              {
                icon: FiCheck,
                text: <React.Fragment>{(node.unlimited) ? 
                  t('general.unlimited') :
                  <span>
                    {node.classes} {(node.classes === 1) ? t('general.class') : t('general.classes')} {" "}
                    {t("general.a")} {node.subscriptionUnitDisplay.toLowerCase()}</span>}
                </React.Fragment>
              },
              {
                icon: FiCheck,
                text: <React.Fragment>
                  {t('general.min_duration')} { " " }
                  <b><i>{node.minDuration} {(node.minDuration === 1) ? t("general.month") : t("general.months")}</i></b>
                </React.Fragment>
              },
            ]}
          />
        ))}
      </SimpleGrid>
    </React.Fragment>
  )
}