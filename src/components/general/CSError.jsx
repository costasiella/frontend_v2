// @ts-check

import React from 'react'
import { useTranslation } from "react-i18next"

import { 
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"

export default function CSError({errorMessage}) {
  const { t } = useTranslation()

  return (
    <Alert 
      py={6} 
      status='error'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'  
    >
      <AlertIcon />
      <AlertTitle>{t("general.an_error_occurred")}</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  )
}
