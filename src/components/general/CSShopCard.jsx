// @ts-check

import React from 'react'
import { Card } from "@chakra-ui/react"

export default function CSShopCard(props) { 
  const { children, ...rest } = props

  return (
    <Card 
      maxW={{ base: '330px', md: '500px', lg: "3000px"}}
      w={'full'}
      mt={6}
      ml="auto"
      mr="auto"
      {...rest}
    >
      {children}
    </Card>
  )
}