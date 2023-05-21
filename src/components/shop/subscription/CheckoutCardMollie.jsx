// @ts-check
import React from 'react'

import { useMutation } from 'urql';
import { useFormik } from 'formik';
import { useMatches, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import {
  Box,
  Center,
  Text,
  Stack,
  Link,
  List,
  ListItem,
  ListIcon,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  useToast,
  Textarea,
  Heading
} from '@chakra-ui/react';
import {
  FiCheck, FiChevronRight, 
} from 'react-icons/fi';
import {
  MdCheckCircle
} from 'react-icons/md';

import { CREATE_ORDER } from '../queries';
import ShopCheckoutForm from '../ShopCheckoutForm';


import cs_django_links from '../../../constants/cs_django_links';

// interface PricingCardItem {
//   text: string | ReactElement;
//   icon: IconType;
// }


export default function CheckoutCardMollie() {
  const { t } = useTranslation()
  const matches = useMatches()
  const organizationSubscriptionId = matches[0].params.id
  let navigate = useNavigate()
  const toast = useToast()
  
  const [ createOrderresult, createOrder ] = useMutation(CREATE_ORDER)

  const formik = useFormik({
    initialValues: {
      message: '',
      organizationSubscription: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      // alert(JSON.stringify(values, null, 2))
      
      createOrder({
        input: {
          message: values.message,
          organizationSubscription: organizationSubscriptionId,
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
    <Center py={6} alignItems={'start'}>
      <Box
        maxW={{ base: '330px', md: '500px', lg: "1000px"}}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Stack
          // textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={{ base: 'center', md: 'left' }}
        >
          {/* <Text
            fontSize="2xl"
            fontWeight="bold"
            p={2}
            px={3}
            bg={useColorModeValue('green.50', 'green.900')}
            rounded={'full'}
          >
            {t("shop.checkout.title")}
          </Text> */}
          <Text
            fontSize={'sm'}
            fontWeight={500}
            bg={useColorModeValue('green.50', 'green.900')}
            p={2}
            px={3}
            color={'green.500'}
            rounded={'full'}>
            {t("shop.checkout.title")}
          </Text>
          <Box width="100%">
            <ShopCheckoutForm formik={formik} />
          </Box>
          {/* <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'4xl'} fontWeight={800}>
              {price}
            </Text>
            {priceUnit && <Text color={'gray.500'}> / {priceUnit}</Text>}
          </Stack> */}
        </Stack>
      </Box>
    </Center>
  );
}