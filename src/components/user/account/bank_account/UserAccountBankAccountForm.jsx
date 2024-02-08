// @ts-check
import React from 'react'
import { useMutation } from "urql";
import { useFormik } from 'formik';

import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  useToast
} from '@chakra-ui/react';

import { QUERY_ACCOUNT_BANK_ACCOUNTS, QUERY_ACCOUNT_ID, UPDATE_BANK_ACCOUNT } from "./queries";


export default function UserAccountBankAccountForm({initialValues, id}) {
  const { t } = useTranslation()
  const toast = useToast()
  const [ updateBankAccountResult, updateBankAccount ] = useMutation(UPDATE_BANK_ACCOUNT)

  const formik = useFormik({
    initialValues: initialValues,
    // enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {   
      console.log(values)
      const variables = {
        input: {
          id: id,
          holder: values.holder,
          number: values.number,
          bic: values.bic
        }
      }

      updateBankAccount(variables).then(result => {
        console.log(result)
        if (result.error) {
          console.error(result.error)
          const error = result.error
          toast({
            title: error.message.replace("[GraphQL]", ""),
            status: "error"
          })
          setSubmitting(false)
        } else {
          toast({
            title: t("user.account.bank_account.toast_edit_success"),
            status: "success"
          })
          setSubmitting(false)
        }
      })
    },
  })

 console.log(formik.values)

  return (
    <Box width="100%" p="6">
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4} direction={['row', 'column']}>
          <FormControl id="holder">
            <FormLabel htmlFor="holder">{t("relations.account.bank_accounts.holder")}</FormLabel>
            <Input 
              id="holder"
              name="holder"
              // type="email"
              onChange={formik.handleChange}
              value={formik.values.holder}
            />
          </FormControl>
          <Stack spacing={4} direction={{base: "column", lg: "row"}}>
            <FormControl id="number">
              <FormLabel htmlFor="number">{t("relations.account.bank_accounts.number")}</FormLabel>
              <Input 
                id="number"
                name="number"
                // type="email"
                onChange={formik.handleChange}
                value={formik.values.number}
              />
            </FormControl>
            <FormControl id="bic">
              <FormLabel htmlFor="bic">{t("relations.account.bank_accounts.bic")}</FormLabel>
              <Input 
                id="bic"
                name="bic"
                // type="email"
                onChange={formik.handleChange}
                value={formik.values.bic}
              />
            </FormControl>
          </Stack>
          <Button
            isLoading={formik.isSubmitting}
            type="submit"
            bg={'green.400'}
            color={'white'}
            colorScheme='green'
            maxW={{base: "100%", md: '200px'}}
          >
            {t("general.save")}
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
