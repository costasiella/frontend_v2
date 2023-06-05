// @ts-check
import React from 'react'

import { useTranslation } from 'react-i18next';
import {
  Box,
  Stack,
  useColorModeValue,
  Heading
} from '@chakra-ui/react';

import ShopCheckoutForm from './ShopCheckoutForm';


export default function ShopCheckoutCardMollie({formik}) {
  const { t } = useTranslation()
  
  return (
    <Box
      mt={6}
      ml="auto"
      mr="auto"
      maxW={{ base: '330px', md: '500px', lg: "1000px"}}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}>
      <Stack
        // textAlign={{ base: 'center', md: 'left' }}
        textAlign="left"
        p={6}
        color={useColorModeValue('gray.800', 'white')}
        align="left"
      >
        <Heading as="h3" size="sm">
          {t("shop.checkout.title")}
        </Heading>
        <Box width="100%">
          <ShopCheckoutForm formik={formik} />
        </Box>
      </Stack>
    </Box>
  );
}