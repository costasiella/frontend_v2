// @ts-check

import React from 'react'

import {
  Box,
  Spinner,
} from '@chakra-ui/react';

export default function CSSpinner() {
  return <Box textAlign="center">
    <Spinner
    thickness='4px'
    speed='0.65s'
    color='green.400'
    size='xl'
    />
  </Box>
}
