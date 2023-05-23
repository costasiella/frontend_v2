// @ts-check

import React from 'react'
import { useQuery } from "urql";
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

import { QUERY_ORGANIZATION_SUBSCRIPTION } from "./queries";

import CSSpinner from "../../general/CSSpinner";
import ShopPricingCard from "../../general/ShopPricingCard";
import { FiCheck } from "react-icons/fi";
import ShopCheckoutProgress from '../ShopCheckoutProgress';
import CheckoutCardMollie from './CheckoutCardMollie';

export default function ShopSubscription() {
  const matches = useMatches()
  const id = matches[0].params.id
  const { t } = useTranslation()
  const [result] = useQuery({
      query: QUERY_ORGANIZATION_SUBSCRIPTION,
      variables: {id: id}
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

  const subscription = data.organizationSubscription
  const account = data.user

  let CheckoutCard

  // TODO: Enforce equal height for the pricing card.
  // Not so happy with it, but a variable with the measured height can be set for each checkout card option
  // And passed to the PricingCard...

  // Check for shop subscription payment method
  if (subscription.shopPaymentMethod === "DIRECTDEBIT") {
    // Check for bank account details, if not set, 
    if (!account.hasBankAccountInfo) {
      // Create local storage back url for account bank account component    
      // localStorage.setItem(CSLS.SHOP_ACCOUNT_BANK_ACCOUNT_NEXT, `/shop/subscription/${id}`)
      // Show bank account requird 
      // CheckoutCard = <CheckoutCardBankAccountRequired />
      CheckoutCard = "Bank account required"
    } else {
      // Allow customer to create a subscription
      // CheckoutCard = <CheckoutCardDirectDebit accountId={account.accountId} organizationSubscription={subscription} />
      CheckoutCard = "Direct debit checkout"
    }
  } else {
    CheckoutCard = <CheckoutCardMollie />
    // CheckoutCard = "Mollie checkout"
  }


  return (
    <React.Fragment>
      <Heading as="h2" fontSize="24px" textAlign={{base: "center", md:  "left"}}>
        {t("shop.checkout.title")} <Text as="small" size="xs" color="grey">{t("shop.menu.subscription")}</Text>
      </Heading>
      <ShopCheckoutProgress step={0} />
      <SimpleGrid spacing="4" minChildWidth="300px" columns={3}>
        <ShopPricingCard
          // height="327px"
          title={subscription.name}
          price={subscription.priceTodayDisplay}
          priceUnit={t("general.month")}
          cardItems={[
            {
              icon: FiCheck,
              text: <React.Fragment>{(subscription.unlimited) ? 
                t('general.unlimited') :
                <span>
                  {subscription.classes} {(subscription.classes === 1) ? t('general.class') : t('general.classes')} {" "}
                  {t("general.a")} {subscription.subscriptionUnitDisplay.toLowerCase()}</span>}
              </React.Fragment>
            },
            {
              icon: FiCheck,
              text: <React.Fragment>
                {t('general.min_duration')} { " " }
                <b><i>{subscription.minDuration} {(subscription.minDuration === 1) ? t("general.month") : t("general.months")}</i></b>
              </React.Fragment>
            },
            {
              icon: FiCheck,
              text: <React.Fragment>
                {t('shop.subscription.first_month')} { " " }
                <b><i>{subscription.priceFirstMonthDisplay}</i></b>
              </React.Fragment>
            },
          ]}
        />
        {CheckoutCard}
        {/* <ShopInfoCard
          title={t("shop.subscription.info")}
          description={<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(subscription.description) }}></div>}
        /> */}
      </SimpleGrid>
    </React.Fragment>
  )
}