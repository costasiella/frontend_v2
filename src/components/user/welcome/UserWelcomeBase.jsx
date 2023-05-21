// @ts-check
import React from 'react'

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Flex,
    Box,
    Stack,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

import OrganizationContext from '../../contexts/GlobalContext';
 
/**
 * ShopPricingCardProps
 * @typedef {Object} UserWelcomeBaseProps
 * @property {*} children - React children
 * @property {string} [userName] - The name of the currently signed in user
 */

/**
 * UserWelcome component
 * @param {UserWelcomeBaseProps} props - UserWelcomeBase props
 * @returns 
 */
export default function UserWelcomeBase({children, userName}) {
  /**
   * @type {object}
   */
  const organization = useContext(OrganizationContext)
  const { t } = useTranslation()
  const flexBg = useColorModeValue('gray.50', 'gray.800')
  const boxBg = useColorModeValue('white', 'gray.700')
  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={flexBg}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>{t("user.welcome.heading")} {userName}</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            {organization && organization.name}
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={boxBg}
          boxShadow={'lg'}
          p={8}>
            {children}
        </Box>
      </Stack>
    </Flex>
  );
}