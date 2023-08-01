// @ts-check

// 'import("react").ReactElement'
import React from 'react'
import { Outlet } from "react-router-dom";
import { useQuery } from 'urql';

import { QUERY_SHOP_GLOBAL_CONTEXT } from "./queries";

// Contexts
import { GlobalContextProvider } from "../components/contexts/GlobalContext"

import CSSpinner from "../components/general/CSSpinner";
import SidebarWithHeaderShop from '../components/shop/SidebarWithHeaderShop';


export default function Shop() {
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
      <SidebarWithHeaderShop>
        <Outlet />
      </SidebarWithHeaderShop>
    </GlobalContextProvider>
  )
} 
