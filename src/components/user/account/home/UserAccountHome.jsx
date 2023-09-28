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

import { QUERY_USER_PROFILE } from "./queries";

import CSError from '../../../general/CSError';
import CSSpinner from "../../../general/CSSpinner";

export default function UserAccountHome() {
    const [result] = useQuery({
        query: QUERY_USER_PROFILE,
      });

    const { data, fetching, error } = result;

    if (error) {
      console.warn(error) 
      return (
        <CSError errorMessage={error.message} />
      )
    }  
    
    if (fetching) {
      return <CSSpinner />
    }
    
    const user = data.user

    return (
      <SimpleGrid spacing="4" minChildWidth="250px">
        A quick overview of important things here. <br />
        - Upcoming classes <br />
        - Upcoming events <br />
        - Active subscriptions & passes (with links to the shop to buy more) <br />
        
        {/* {announcements.edges.length && announcements.edges.map(({ node }) => (
          <Card key={node.id}>
            <CardHeader>
              <Heading as="h3" size="sm">{node.title}</Heading>
            </CardHeader>
            <CardBody>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(node.content) }}></div>
            </CardBody>
          </Card>
        ))} */}
      </SimpleGrid>
    )

}