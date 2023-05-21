// @ts-check

import React from 'react'

const GlobalContext = React.createContext({})

export const GlobalContextProvider = GlobalContext.Provider
export const GlobalpContextConsumer = GlobalContext.Consumer

export default GlobalContext
