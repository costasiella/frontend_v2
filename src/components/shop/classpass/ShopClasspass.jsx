// @ts-check

import React from 'react'
import { useQuery, useMutation } from "urql";
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router-dom';
import DOMPurify from 'dompurify'
import { 
  Box,
  Center,
  // Grid,
  // GridItem,
  Heading,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

import { CREATE_ORDER } from '../queries';
import { QUERY_ORGANIZATION_CLASSPASS } from "./queries";

import CSError from '../../general/CSError';
import CSSpinner from "../../general/CSSpinner";
import ShopPricingCard from "../../general/ShopPricingCard";
import { FiCheck } from "react-icons/fi";
import ShopCheckoutProgress from '../ShopCheckoutProgress';
import ShopClasspassCheckoutCardMollie from './ShopClasspassCheckoutCardMollie';

export default function ShopSubscription() {
  const matches = useMatches()
  const id = matches[0].params.id
  const { t } = useTranslation()
  const [result] = useQuery({
      query: QUERY_ORGANIZATION_CLASSPASS,
      variables: {id: id}
    });
  const [ createOrderresult, createOrder ] = useMutation(CREATE_ORDER)

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

  const classpass = data.organizationClasspass
  const account = data.user

  return (
    <React.Fragment>
      <Heading as="h2" fontSize="24px" textAlign={{base: "center", md:  "left"}}>
        {t("shop.checkout.title")} <Text as="small" size="xs" color="grey">{t("shop.menu.classpass")}</Text>
      </Heading>
      <ShopCheckoutProgress step={0} />
      <SimpleGrid spacing="4" minChildWidth="300px" columns={3}>
        <ShopPricingCard
          // height="327px"
          title={classpass.name}
          price={classpass.priceDisplay}
          cardItems={[
            {
              icon: FiCheck,
              text: <React.Fragment>{(classpass.unlimited) ? 
                t('general.unlimited') :
                <span>
                  {classpass.classes} {(classpass.classes === 1) ? t('general.class') : t('general.classes')}
                </span>}
              </React.Fragment>
            },
            {
              icon: FiCheck,
              text: <React.Fragment>
                {t('general.valid_for')} { " " }
                <b><i>{classpass.validity} {' '} {classpass.validityUnitDisplay}</i></b>
              </React.Fragment>
            },
          ]}
        />
        <ShopClasspassCheckoutCardMollie />
      </SimpleGrid>
    </React.Fragment>
  )
}