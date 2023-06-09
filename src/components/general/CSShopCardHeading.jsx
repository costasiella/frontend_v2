// @ts-check

import React from 'react'
import { Heading } from "@chakra-ui/react"

export default function CSShopCardheading(props) { 
  const { children, ...rest } = props

  return (
    <Heading as="h3" size="sm" mb={6} {...rest}>
      {children}
    </Heading>
  )
}