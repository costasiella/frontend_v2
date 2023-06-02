// @ts-check

// https://react.dev/reference/react/forwardRef
import React, { forwardRef} from 'react'
import { Button } from "@chakra-ui/react"

function CSButtonPrimary(props, ref) { 
const { buttonText, ...rest } = props

  return (
    <Button
      mt={10}
      w={'full'}
      bg={'green.400'}
      color={'white'}
      rounded={'md'}
      boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
      _hover={{
        bg: 'green.500',
      }}
      _focus={{
        bg: 'green.500',
      }}
      ref={ref}
      {...rest}
    >
      {buttonText}
    </Button>
  )
}

export default forwardRef(CSButtonPrimary)