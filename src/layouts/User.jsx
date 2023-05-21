// @ts-check

import React from 'react'
import { Outlet } from "react-router-dom";
import { useQuery } from 'urql';

// Contexts
import { GlobalContextProvider } from "../components/contexts/GlobalContext"

// Queries
import { QUERY_SHOP_GLOBAL_CONTEXT } from "./queries";

import CSSpinner from "../components/general/CSSpinner";


export default function User() {
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
      <Outlet />
    </GlobalContextProvider>
  )
} 
