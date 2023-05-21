// @ts-check
import React from 'react'
import { useQuery } from "urql";
import DOMPurify from 'dompurify'
import { 
  Box,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Heading
} from "@chakra-ui/react";

import { QUERY_SHOP_ANNOUNCEMENTS } from "./queries";

import CSSpinner from "../../general/CSSpinner";

export default function ShopHome() {
    const [result] = useQuery({
        query: QUERY_SHOP_ANNOUNCEMENTS,
      });
    
    const { data, fetching, error } = result;

    if (error) {
      console.warn(error) 
      return (
        <Box>{error.message}</Box>
      )
    }  
    
    if (fetching) {
      return <CSSpinner />
    }
    
    const announcements = data.organizationAnnouncements

    return (
      <SimpleGrid spacing="4" minChildWidth="250px">
        {announcements.edges.length && announcements.edges.map(({ node }) => (
          <Card key={node.id}>
            <CardHeader>
              <Heading as="h3" size="sm">{node.title}</Heading>
            </CardHeader>
            <CardBody>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(node.content) }}></div>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    )

}