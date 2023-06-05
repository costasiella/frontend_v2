// @ts-check
import React from 'react'

import { useMutation } from 'urql';
import { useFormik } from 'formik';
import { useMatches, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import {
  useToast,
} from '@chakra-ui/react';

import { CREATE_ORDER } from '../queries';
import ShopCheckoutCardMollie from '../../general/ShopCheckoutCardMollie';


export default function ShopClasspassCheckoutCardMollie() {
  const { t } = useTranslation()
  const matches = useMatches()
  const organizationClasspassId = matches[0].params.id
  let navigate = useNavigate()
  const toast = useToast()
  
  const [ createOrderresult, createOrder ] = useMutation(CREATE_ORDER)

  const formik = useFormik({
    initialValues: {
      message: '',
      organizationClasspass: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      // alert(JSON.stringify(values, null, 2))
      
      createOrder({
        input: {
          message: values.message,
          organizationClasspass: organizationClasspassId,
        }
      }).then(result => {
        console.log(result)
        if (result.error) {
          console.error(result.error)
          const error = result.error
          toast({
            title: error.message.replace("[GraphQL]", ""),
            status: "error"
          })
          setSubmitting(false)
        } else {
          const data = result.data
          const financeOrder = data.createFinanceOrder.financeOrder
          console.log(data)

          navigate(`/shop/checkout/payment/${financeOrder.id}`)
        }
      })
    },
  })

  return (
    <ShopCheckoutCardMollie formik={formik} />
  );
}