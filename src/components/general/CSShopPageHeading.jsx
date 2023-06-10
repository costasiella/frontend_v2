// @ts-check

import React from 'react'
import { Heading } from "@chakra-ui/react"

export default function CSShopPagedheading(props) { 
  const { children, ...rest } = props

  return (
    <Heading as="h2" fontSize="24px" textAlign={{base: "center", md:  "left"}} {...rest}>
      {children}
    </Heading>
  )
}

