// @ts-check

import React from 'react'

import { useQuery } from "urql";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Text,
  VStack,
  IconButton,
  Avatar,
  Flex,
  HStack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import {
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';

import { QUERY_USER } from '../user/queries'

import CSAuth from "../../tools/authentication";
import CSSpinner from './CSSpinner';


// Display default values when a login is not detected based on local storage check

// Fetch user info when login is detected

export default function MobileNav({ onOpen, ...rest }) {
  {/* @ts-ignore */}
  const { t } = useTranslation()
  const cmvbg = useColorModeValue('white', 'gray.900')
  const cmvbbc = useColorModeValue('gray.200', 'gray.700')
  const userIsSignedin = CSAuth.userIsSignedin()
  
  const [result] = useQuery({
    query: QUERY_USER,
    pause: !userIsSignedin
  });

  // Default data
  const { data, fetching, error } = result;

  if (error) {
    console.warn(error) 
  }

  if (fetching) {
    return (<CSSpinner />)
  }

  let fullName = t("user.account.my_account")
  if (userIsSignedin && data && data.user) {
    fullName = data.user.fullName
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={cmvbg}
      borderBottomWidth="1px"
      borderBottomColor={cmvbbc}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/* Mobile logo */}
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Costasiella
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          {(!userIsSignedin) ?
            // Sign in link
            <Link to="/user/login">
              <HStack>
                <Avatar
                  size={'sm'}
                  src={data && data.user && data.user.urlImageThumbnailSmall}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{fullName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {(!userIsSignedin) ? 
                      t("user.account.sign_in") : ""
                    }
                  </Text>
                </VStack>
              </HStack>
            </Link>
          :
            // Profile menu
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={data && data.user && data.user.urlImageThumbnailSmall}
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">{fullName}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {/* Some info text here? */}
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={cmvbg}
                borderColor={cmvbbc}>
                <Link to={"/user/account"}><MenuItem>{t("user.account.title")}</MenuItem></Link>
                <Link to={"/user/orders"}><MenuItem>{t("user.account.orders.title")}</MenuItem></Link>
                <Link to={"/user/invoices"}><MenuItem>{t("user.account.invoices.title")}</MenuItem></Link>
                {( userIsSignedin ) && <MenuDivider /> }
                {( userIsSignedin ) && <Link to={"/user/logout"}><MenuItem>{t("user.logout.sign_out")}</MenuItem></Link>}
              </MenuList>
            </Menu>
          }
        </Flex>
      </HStack>
    </Flex>
  );
};
