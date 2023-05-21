// @ts-check
import React from 'react'

import { useTranslation } from 'react-i18next';
import { useQuery } from 'urql';
import {
    Box,
} from '@chakra-ui/react';
import {
  FiShoppingCart,
  FiUserCheck,
  FiBriefcase,
} from 'react-icons/fi';

import { QUERY_USER } from '../queries';

import CSSpinner from '../../general/CSSpinner';
import NavItem from '../../general/NavItem';
import UserWelcomeBase from './UserWelcomeBase';
  

export default function UserWelcome() {
  const { t } = useTranslation()
  
  const LinkItems = [
    { name: t("user.welcome.shop"), icon: FiShoppingCart, href: '/' },
    { name: t("user.welcome.selfcheckin"), icon: FiUserCheck, href: '/selfcheckin' },
    { name: t("user.welcome.backend"), icon: FiBriefcase, href: '/backend' },
  ];

  const [result] = useQuery({
    query: QUERY_USER,
  });

  const { data, fetching, error } = result;

  if (fetching) {
    return (
      <UserWelcomeBase>
        <CSSpinner />
      </UserWelcomeBase>
    )
  }

  if (error) {
    console.error(error) 
    return (
      <UserWelcomeBase>
        {error}
      </UserWelcomeBase>
    )
  }

  return (
    <UserWelcomeBase userName={data && data.user && data.user.firstName}>
      <Box fontWeight="bold" pb="20px">
        {t("user.welcome.where_would_you_like_to_go")}
      </Box>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </UserWelcomeBase>
  );
}