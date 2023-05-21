// @ts-check

import React from 'react'
import { useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { FiArrowLeft } from "react-icons/fi";


export default function ErrorPage() {
  const error = useRouteError();
  const { t } = useTranslation();
  console.error(error);

  const _onBackClick = (
    event
  ) => {
    window.history.back();
    event.preventDefault();
    return true;
  };

  return (
    <Box textAlign="center" minHeight="100vh" py={200} px={6} bg={useColorModeValue('gray.100', 'gray.900')}>
      <Heading
        color="green.400"
        display="inline-block"
        as="h1"
        size="4xl">
        404
      </Heading>
      <Heading as="h2" mt={6} mb={2}>
        {t("error_pages.page_not_found")}
      </Heading>
      <Text color={'gray.500'} mb={9}>
        {t("error_pages.page_not_found_details")}
      </Text>

      <Button
        colorScheme="green"
        bgColor="green.400"
        color="white"
        variant="solid"
        onClick={_onBackClick}
        leftIcon={<FiArrowLeft />}
      >
        {t("error_pages.go_back")}
      </Button>
    </Box>
  );
}