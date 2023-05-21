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


// interface PricingCardItem {
//   text: string | ReactElement;
//   icon: IconType;
// }


export default function ShopInfoCard({title, description}) {
  return (
    <Center py={6} alignItems={'start'}>
      <Box
        maxW={{ base: '330px', md: '500px', lg: "1000px"}}
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
          <Text>
            {description}
          </Text>
          {/* <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'4xl'} fontWeight={800}>
              {price}
            </Text>
            {priceUnit && <Text color={'gray.500'}> / {priceUnit}</Text>}
          </Stack> */}
        </Stack>

        {/* <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <List spacing={3}>
            {cardItems.map((item) => (
              <ListItem>
                <ListIcon as={item.icon} color="green.500" />
                {item.text}
              </ListItem>
            ))}
          </List>
        </Box> */}
      </Box>
    </Center>
  );
}