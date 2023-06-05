// @ts-check
import React, { useContext } from "react"
import { useQuery, useMutation } from "urql"
import { useMatches } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { 
  Card, 
  CardHeader,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react"


import GlobalContext from '../contexts/GlobalContext';

import { QUERY_ORDER } from "../shop/checkout/queries"

import CSError from "./CSError.jsx"
import CSSpinner from "./CSSpinner"


export default function ShopCheckoutOrderSummary() {
  /** @type {Object} */
  const context = useContext(GlobalContext)
  const appSettings = context.appSettings
  const matches = useMatches()
  const id = matches[0].params.id
  const { t } = useTranslation()


  const [result] = useQuery({
    query: QUERY_ORDER,
    variables: { id: id }
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

  const order = data.financeOrder
  const orderItems = order.items.edges

  let classDate 
  let scheduleItemId
  let item
  for (item of orderItems) {
    let node = item.node
    if (node.scheduleItem) {
      classDate = node.attendanceDate
      scheduleItemId = node.scheduleItem.id
    }
  }

  return (
    <Card 
      maxW={{ base: '330px', md: '500px', lg: "1000px"}}
      w={'full'}
      mt={6}
      ml="auto"
      mr="auto"
    >
      <CardHeader>
          <Heading as="h3" size="sm">
          {t("shop.checkout.order_summary")}
          </Heading>
      </CardHeader>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>{t("general.item")}</Th>
              <Th isNumeric>{t("general.price")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderItems.map(({ node }) => (
              <Tr>
                <Td>
                  {node.productName} <br /> 
                  <Text color="gray.500">
                    <small>{node.description}</small>
                  </Text>
                </Td>
                <Td isNumeric>
                 {node.totalDisplay}
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th fontSize={"xs"}>{t("general.total")}</Th>
              <Th isNumeric fontSize={"xl"} color="green.400">{order.totalDisplay}</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Card>
  )
}