// @ts-check
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  useColorModeValue,
  Text
} from '@chakra-ui/react';

import CSButtonPrimary from './CSButtonPrimary'
import CSShopCardheading from './CSShopCardHeading';
import { FiChevronRight } from 'react-icons/fi';


export default function ShopCheckoutCardBankAccountRequired() {
  const { t } = useTranslation()
  
  return (
    <Card 
      mt={6}
      ml="auto"
      mr="auto"
      maxW={{ base: '330px', md: '500px', lg: "1000px"}}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
    >
      <CardBody>
        <CSShopCardheading>
          {t("shop.checkout.bank_account_required")}
        </CSShopCardheading>
        <Text mb={1}>{t("shop.checkout.bank_account_required_explanation")}</Text>
      </CardBody>
      <CardFooter>
        <Box w='full'>
          {/* TODO: Add link to edit bank account details */}
          <Link to={``}>
            <CSButtonPrimary 
              w='full'
              buttonText={t("shop.checkout.to_bank_account")}
              rightIcon={<FiChevronRight />}
            />
          </Link>
        </Box>
      </CardFooter>
    </Card>
  );
}