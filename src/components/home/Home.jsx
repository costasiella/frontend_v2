// @ts-check
import React from 'react'
import { useTranslation } from 'react-i18next';
import {
  Box,
} from "@chakra-ui/react"

export default function Home() {
  const { t } = useTranslation();

    return (
      <Box background="white" maxW='100%' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Box p='10'>
          {t('home.hello_world')}
        </Box>
      </Box>
    )
}
