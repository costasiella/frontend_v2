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
  Card, 
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react"

import GlobalContext from '../../../contexts/GlobalContext';

import { QUERY_ORDER } from "../queries"
import { CREATE_PAYMENT_LINK } from "./queries"

import CSButtonPrimary from "../../../general/CSButtonPrimary"
import CSError from "../../../general/CSError.jsx"
import CSSpinner from "../../../general/CSSpinner"

export default function ShopCheckoutPayment() {
  /**
   * @type {Object}
   */
  const context = useContext(GlobalContext)
  const appSettings = context.appSettings
  const onlinePaymentsAvailable = appSettings.onlinePaymentsAvailable
  const matches = useMatches()
  const id = matches[0].params.id
  {/* @ts-ignore */}
  const { t } = useTranslation()
  const toast = useToast()
  let navigate = useNavigate()

  const btnPayNow = useRef(null);
  const initialBtnText = t('shop.checkout.payment.to_payment')
  // const initialBtnText = <span><Icon name="credit-card" /> {t('shop.checkout.payment.to_payment')} <Icon name="chevron-right" /></span>
  const [btn_text, setBtnText] = useState(initialBtnText)

  const [ createPaymentLinkResult, createPaymentLink ] = useMutation(CREATE_PAYMENT_LINK)

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


  let msgNextStep
  let buttonNext

  function onClickPay() {
    btnPayNow.current.setAttribute("disabled", "disabled")
    // Due to some typying stuff, we can't use t a a direct input for the function.
    setBtnText(`${t("shop.checkout.payment.redirecting")}`)

    // createPaymentLink({ variables: { id: id } }).then(({ data }) => {
    //   console.log('got data', data);
    //   const paymentLink = data.createFinanceOrderPaymentLink.financeOrderPaymentLink.paymentLink
    //   window.location.href = paymentLink
    // }).catch((error) => {
    //   toast.error((t('general.toast_server_error')) +  error, {
    //       position: toast.POSITION.BOTTOM_RIGHT
    //     })
    //   console.log('there was an error sending the query', error)
    // })
    createPaymentLink({ id: id }).then(result => {
      console.log(result)
      if (result.error) {
        console.error(result.error)
        const error = result.error
        toast({
          title: error.message.replace("[GraphQL]", ""),
          status: "error"
        })
      } else {
        const data = result.data
        const paymentLink = data.createFinanceOrderPaymentLink.financeOrderPaymentLink.paymentLink
        
        // Redirect the user to received payment link
        window.location.href = paymentLink
      }
    })

  }


    // Continue processing and see if online payments are available
  // Check profile complete enough
  if (!account.hasCompleteEnoughProfile) {
    // If not, show message that a more complete profile is required
    msgNextStep = t("shop.checkout.payment.profile_not_complete_enough")
    buttonNext = <CSButtonPrimary 
      href="/shop/account/profile"
      buttonText={t("shop.checkout.payment.update_profile")}
    />
    // buttonNext = <Link to="/shop/account/profile">
    //   <Button
    //     block
    //     color="primary"
    //   >
    //     {t("shop.checkout.payment.update_profile")} <Icon name="chevron-right" />
    //   </Button>
    // </Link>
  } else if (onlinePaymentsAvailable) {
    msgNextStep = t("shop.checkout.payment.order_received_to_payment_text")
    buttonNext = <button
      className="btn btn-block btn-success"
      ref={btnPayNow}
      onClick={ onClickPay }
    >
      {btn_text}
    </button>
  } else {
    msgNextStep = t("shop.checkout.payment.order_received_to_profile_text")
    buttonNext = <CSButtonPrimary 
      href="/"
      buttonText={t("shop.checkout.payment.to_profile")}
    />
    // buttonNext = <Link to="/">
    //   <Button
    //     block
    //     color="success"
    //   >
    //     {t("shop.checkout.payment.to_profile")} <Icon name="chevron-right" />
    //   </Button>
    // </Link>
  }

  return (
    <React.Fragment>
      <Heading as="h2" fontSize="24px" textAlign={{base: "center", md:  "left"}}>
        {t("shop.checkout.payment")}
      </Heading>
      <SimpleGrid spacing="4" minChildWidth="300px" columns={3} py={6}>
        <Card>
          <CardHeader>
            <Heading size="md">
              {t("shop.checkout.payment.order_received")}
            </Heading>
          </CardHeader>
          <CardBody>
            <Heading size="sm">
              
            </Heading>{t("shop.checkout.payment.order_received_subheader")}
            <Text mb={"6px"}>
              {t("shop.checkout.payment.order_received_to_payment_explanation")}
              {msgNextStep}
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">
              {t("shop.checkout.order_summary")}
            </Heading>
          </CardHeader>
          <CardBody>
            table here
          </CardBody>
        </Card>
      </SimpleGrid>
    </React.Fragment>
  )
}