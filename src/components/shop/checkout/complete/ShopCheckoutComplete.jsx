// @ts-check
import React, { useContext, useRef, useState } from "react"
import { useQuery, useMutation } from "urql"
import { useMatches } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { 
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  Card, 
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react"
import { FiChevronRight } from "react-icons/fi"
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';


import GlobalContext from '../../../contexts/GlobalContext';

import { QUERY_ORDER } from "../queries"

import CSButtonPrimary from "../../../general/CSButtonPrimary"
import CSError from "../../../general/CSError.jsx"
import CSSpinner from "../../../general/CSSpinner"

import ShopCheckoutProgress from "../../ShopCheckoutProgress"
import ShopCheckoutOrderSummary from "../order_summary/ShopCheckoutOrderSummary"


export default function ShopCheckoutComplete() {
  /** @type {Object} */
  const context = useContext(GlobalContext)
  const appSettings = context.appSettings
  const onlinePaymentsAvailable = appSettings.onlinePaymentsAvailable
  const matches = useMatches()
  const id = matches[0].params.id
  const { t } = useTranslation()
  const toast = useToast()
  let navigate = useNavigate()

  const initialBtnText = t('shop.checkout.payment.to_payment')
  // const initialBtnText = <span><Icon name="credit-card" /> {t('shop.checkout.payment.to_payment')} <Icon name="chevron-right" /></span>

  const [result] = useQuery({
    query: QUERY_ORDER,
    variables: { id: id }
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

  console.log(data)

  const order = data.financeOrder
  const account = data.financeOrder.account
  const orderItems = order.items.edges

  let icon
  let headline = ""
  let explanation = ""
  let paymentText = ""
  let complete = false

  // Success!
  if (order.status === "DELIVERED") {
    icon = <CheckCircleIcon boxSize={'50px'} color={'green.400'} />
    // subHeader: thank you message
    // contentText: Something to explain the user what's next
    if (order.total === "0.00") {
      headline = t("shop.checkout.complete.success_headline_free_order") 
      explanation = t("shop.checkout.complete.success_explanation_free_order")
    } else {
      headline = t("shop.checkout.complete.success_headline") 
      explanation = t("shop.checkout.complete.success_explanation")
    }
    
    complete = true

    // Confirm receiving payment to user
    if (order.total !== "0.00") {
      paymentText = t("shop.checkout.complete.success_payment_text")
    }
  } else {
    // Fail...
    icon = <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
    // Looks like something went wrong message
    headline = t("shop.checkout.complete.fail_headline") 
    // Notify user of ways to contact
    explanation = t("shop.checkout.complete.fail_explanation")

    // Notify user that payment hasn't been received
    if (order.total !== "0.00") {
      paymentText = t("shop.checkout.complete.fail_payment_text")
    }
  }

  return (
    <React.Fragment>
      <Heading as="h2" fontSize="24px" textAlign={{base: "center", md:  "left"}}>
        {t("shop.checkout.title")}
      </Heading>
      <ShopCheckoutProgress step={2} />
      <SimpleGrid spacing="4" minChildWidth="300px" columns={3}>
        <Card mt={6}>
          <Box textAlign="center" py={10} px={6}>
            {icon}
            <Heading as="h2" size="xl" mt={6} mb={2}>
              {headline}
            </Heading>
            <Text color={'gray.500'}>
              {explanation}
            </Text>
            <Text color={'gray.500'}>
              {paymentText}
            </Text>
            <Link to="/user/account">
              <CSButtonPrimary 
                buttonText={t("shop.checkout.complete.to_account")} 
                rightIcon={<FiChevronRight />}
              />
            </Link>
          </Box>
        </Card>
        <ShopCheckoutOrderSummary />
      </SimpleGrid>
    </React.Fragment>
  )
}