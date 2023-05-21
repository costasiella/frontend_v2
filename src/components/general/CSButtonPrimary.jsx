// @ts-check

import React from 'react'
import { Link } from "react-router-dom"
import { Button } from "@chakra-ui/react"

export default function CSButtonPrimary({href, buttonText, ...rest}) {  
  return (
    <Link to={href}>
      <Button
        mt={10}
        w={'full'}
        bg={'green.400'}
        color={'white'}
        rounded={'xl'}
        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
        _hover={{
          bg: 'green.500',
        }}
        _focus={{
          bg: 'green.500',
        }}
        {...rest}>
        {buttonText}
      </Button>
    </Link> 
  )
}
