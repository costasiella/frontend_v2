// @ts-check
import React from 'react'

import { Link } from 'react-router-dom'

import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiCheck
} from 'react-icons/fi';

/**
 * @typedef {import("i18next").DefaultTFuncReturn} DefaultTFuncReturn
 */

/**
 * ShopPricingCard
 * @typedef {Object} ShopPricingCard
 * @property {string} title - The card title
 * @property {Float32Array} price - The price
 * @property {string | DefaultTFuncReturn} [priceUnit] - The unit of the price (eg. WEEK)
 * @property {string} [buttonHref] - The url the button will link to
 * @property {string} [buttonText] - The text displayed on the button
 * @property {Array} cardItems - Items displayed on the card
 * @property {string} [height] - The heigh of the card
 */

/**
 * ShopPricingCard Component
 * @param {ShopPricingCard} props - The props for the pricing card
 */
export default function ShopPricingCard({title, price, priceUnit, buttonHref, buttonText, cardItems, height}) {
  return (
    <Box
      mt={6}
      ml="auto" 
      mr="auto"
      maxW={{ base: '330px', md: '500px', lg: "1000px"}}
      height={height}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}>
      <Stack
        textAlign={'center'}
        p={6}
        color={useColorModeValue('gray.800', 'white')}
        align={'center'}>
        <Text
          fontSize={'sm'}
          fontWeight={500}
          bg={useColorModeValue('green.50', 'green.900')}
          p={2}
          px={3}
          color={'green.500'}
          rounded={'full'}>
          {title}
        </Text>
        <Stack direction={'row'} align={'center'} justify={'center'}>
          {/* <Text fontSize={'3xl'}>$</Text> */}
          <Text fontSize={'4xl'} fontWeight={800}>
            {price}
          </Text>
          {priceUnit && <Text color={'gray.500'}> / {priceUnit}</Text>}
        </Stack>
      </Stack>

      <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10} height="100%">
        <Center>
          <List spacing={3}>
            {cardItems.map((item, index) => (
              <ListItem key={`li_${index}`}>
                <ListIcon as={item.icon} color="green.500" />
                {item.text}
              </ListItem>
            ))}
          </List>
        </Center>
        {buttonHref && 
        <Link to={buttonHref}>
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
            }}>
            {buttonText}
          </Button>
        </Link> }
      </Box>
    </Box>
  );
}