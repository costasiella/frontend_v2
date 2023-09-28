// @ts-check
import React from 'react'

import { useTranslation } from 'react-i18next';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack
} from '@chakra-ui/react';


export default function UserAccountBankAccountForm({formik}) {
  const { t } = useTranslation()

  return (
    <Box width="100%">
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="account_holder">
            <FormLabel htmlFor="account_holder">{t("relations.account.bank_accounts.holder")}</FormLabel>
            <Input 
              id="account_holder"
              name="account_holder"
              // type="email"
              onChange={formik.handleChange}
              value={formik.values.account_holder}
            />
          </FormControl>
        </Stack>
      </form>
    </Box>
  )
}
