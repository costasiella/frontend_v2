// @ts-check
import React from 'react'

import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Text,
  CloseButton,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react"
import {
  FiEdit,
  FiHome,
  FiCreditCard,
  FiBook,
  FiCalendar,
  FiMessageCircle
} from 'react-icons/fi';

// Contexts
import GlobalContext from '../../contexts/GlobalContext';

import NavItem from "../../general/NavItem";

// interface LinkItemProps {
//   name: string;
//   icon: IconType;
//   href: string;
// }

// interface shopFeaturesType {
//   classes: boolean;
//   subscriptions: boolean;
//   classpasses: boolean;
//   events: boolean;
// }

function getLinkItems(t, shopFeatures) {
  let linkItems = []

  linkItems.push({ name: t("user.account.menu.home"), icon: FiHome, href: '/user/account' })
  
  if (shopFeatures.classes) {
    linkItems.push({
      name: t("user.account.menu.my_classes"), 
      icon: FiBook, 
      href: '/user/account/classes'
    })
  }
  
  // if (shopFeatures.events) {
  //   linkItems.push({
  //     name: t("shop.menu.events"), 
  //     icon: FiCalendar, 
  //     href: '/shop/events'
  //   })
  // }
  
  // if (shopFeatures.subscriptions) {
  //   linkItems.push({
  //     name: t("shop.menu.subscriptions"), 
  //     icon: FiEdit, 
  //     href: '/shop/subscriptions'
  //   })
  // }
  
  // if (shopFeatures.classpasses) {
  //   linkItems.push({
  //     name: t("shop.menu.classpasses"), 
  //     icon: FiCreditCard, 
  //     href: '/shop/classpasses'
  //   })
  // }

  // linkItems.push({ 
  //   name: t("shop.menu.contact"), 
  //   icon: FiMessageCircle, 
  //   href: '/shop/contact' 
  // })

  return linkItems
}
  
// interface SidebarProps extends BoxProps {
//   onClose: () => void;
// }
  
export default function SidebarContentShop({ onClose, ...rest }) {
  const { t } = useTranslation()
  /**
   * @type {Object}
   */
  const context = useContext(GlobalContext)
  
  const shopFeatures = context && context.systemFeatureShop
  const LinkItems = getLinkItems(t, shopFeatures)

  console.log(context)

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Costasiella
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};