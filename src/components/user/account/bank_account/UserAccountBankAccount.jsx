// @ts-check
import React from 'react'
import { useQuery, useMutation } from "urql";
import { useNavigate } from 'react-router-dom'
// import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { 
  useToast,
} from "@chakra-ui/react";

import CSLS from '../../../../constants/cs_local_storage';
import CSError from '../../../general/CSError';
import CSSpinner from "../../../general/CSSpinner";
import CSShopCard from "../../../general/CSShopCard"

import { QUERY_ACCOUNT_BANK_ACCOUNTS, QUERY_ACCOUNT_ID, UPDATE_BANK_ACCOUNT } from "./queries";
import UserAccountBankAccountForm from './UserAccountBankAccountForm';


export default function UserAccountBankAccount() {
  const nextUrl = localStorage.getItem(CSLS.USER_ACCOUNT_BANK_ACCOUNT_NEXT)
  const navigate = useNavigate()
  const toast = useToast()
  const { t } = useTranslation()

  const [accountIdResult] = useQuery({
    query: QUERY_ACCOUNT_ID,
  })
  const { data: accountIdData, fetching: accountIdFetching, error: accountIdError } = accountIdResult

  console.table(accountIdData)

  const shouldPause = !accountIdData

  const [bankAccountResult] = useQuery({
    query: QUERY_ACCOUNT_BANK_ACCOUNTS,
    // pause: shouldPause,
    // variables: { account: accountIdData && accountIdData.user ? accountIdData.user.accountId: null },
    variables: { account: "QWNjb3VudE5vZGU6NDgy" },
    requestPolicy: "network-only"  // Don't use any cached info
  });
  const [ updateBankAccountResult, updateBankAccount ] = useMutation(UPDATE_BANK_ACCOUNT)
  const { data, fetching, error } = bankAccountResult;



  if (error || accountIdError) {
    console.warn(error) 
      if (error) {
        return <CSError errorMessage={error.message} />
      }
      if (accountIdError) {
        return <CSError errorMessage={accountIdError.message} />
      }
  }  
  
  if (fetching || accountIdFetching) {
    return <CSSpinner />
  }

  console.log(accountIdData.user.accountId)
  console.log(data)
  
  const user = data.user
  const accountBankAccount = data.accountBankAccounts.edges[0]["node"]
  const initialValues = {
    number: accountBankAccount.number,
    holder: accountBankAccount.holder,
    bic: accountBankAccount.bic
  }

  console.log(`account bank account id: ${accountBankAccount.id}`)

  return (
    <CSShopCard>
      <UserAccountBankAccountForm id={accountBankAccount.id} initialValues={initialValues} />
    </CSShopCard>
  )
}