// @ts-check
import React from 'react'

import {
    Box,
    Drawer,
    DrawerContent,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react"


import MobileNav from "../general/MobileNav";
import SidebarContentShop from "./SidebarContentShop";


export default function SidebarWithHeaderShop({
    children,
  }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <SidebarContentShop
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full">
          <DrawerContent>
            <SidebarContentShop onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      </Box>
    );
  }