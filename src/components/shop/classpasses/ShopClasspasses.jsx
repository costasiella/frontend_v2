// @ts-check

import React from 'react'
import { useQuery } from "urql";
import { useTranslation } from 'react-i18next';
import { 
    Box,
    Heading,
    SimpleGrid
  } from "@chakra-ui/react";

import { QUERY_ORGANIZATION_CLASSPASSES } from "./queries";

import CSError from '../../general/CSError';
import CSSpinner from "../../general/CSSpinner";
import ShopPricingCard from "../../general/ShopPricingCard";
import { FiCheck } from "react-icons/fi";

export default function ShopClasspasses() {
  const { t } = useTranslation()
  const [result] = useQuery({
    query: QUERY_ORGANIZATION_CLASSPASSES,
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

  const classpasses = data.organizationClasspasses

  return (
    <React.Fragment>
      <Heading as="h2" fontSize="24px" textAlign={{base: "center", md:  "left"}}>
        {t("shop.menu.classpasses")}
      </Heading>
      <SimpleGrid spacing="4" minChildWidth="300px" columns={3}>
        {classpasses.edges.map(({ node }) => (
          <ShopPricingCard
            key={node.id}
            title={node.name}
            price={node.priceDisplay}
            buttonHref={`/shop/classpasses/${node.id}`}
            buttonText="Choose"
            cardItems={[
              {
                icon: FiCheck,
                text: <React.Fragment>{(node.unlimited) ? 
                  t('general.unlimited') :
                  <span>
                    {node.classes} {(node.classes === 1) ? t('general.class') : t('general.classes')}
                  </span>}
                </React.Fragment>
              },
              {
                icon: FiCheck,
                text: <React.Fragment>
                  {t('general.valid_for')} { " " }
                  <b><i>{node.validity} {' '} {node.validityUnitDisplay}</i></b>
                </React.Fragment>
              },
            ]}
          />
        ))}
      </SimpleGrid>
    </React.Fragment>
  )
}