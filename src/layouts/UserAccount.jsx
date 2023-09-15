// @ts-check

import React from 'react'
import { Outlet } from "react-router-dom";
import { useQuery } from 'urql';

import { QUERY_SHOP_GLOBAL_CONTEXT } from "./queries";

// Contexts
import { GlobalContextProvider } from "../components/contexts/GlobalContext"

import CSSpinner from "../components/general/CSSpinner";
import SidebarWithHeaderAccount from '../components/user/account/SidebarWithHeaderAccount';


export default function UserAccount() {
  const [result] = useQuery({
    query: QUERY_SHOP_GLOBAL_CONTEXT
  });

  const { data, fetching, error } = result;

  if (error) {
    console.warn(error) 
  }

  if (fetching) {
    return <CSSpinner />
  }

  return (
    <GlobalContextProvider value={data}>
      <SidebarWithHeaderAccount>
        <Outlet />
      </SidebarWithHeaderAccount>
    </GlobalContextProvider>
  )
} 
