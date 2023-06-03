// @ts-check
import React, { useContext } from "react"
import { useQuery, useMutation } from "urql"
import { useMatches } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { 
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  Card, 
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Heading,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  useToast,
} from "@chakra-ui/react"
import { FiChevronRight } from "react-icons/fi"


import GlobalContext from '../../../contexts/GlobalContext';

import { QUERY_ORDER } from "../queries"

import CSButtonPrimary from "../../../general/CSButtonPrimary"
import CSError from "../../../general/CSError.jsx"
import CSSpinner from "../../../general/CSSpinner"

import ShopCheckoutProgress from "../../ShopCheckoutProgress"


export default function ShopCheckoutOrderSummary() {
  /** @type {Object} */
  const context = useContext(GlobalContext)
  const appSettings = context.appSettings
  const onlinePaymentsAvailable = appSettings.onlinePaymentsAvailable
  const matches = useMatches()
  const id = matches[0].params.id
  const { t } = useTranslation()
  const toast = useToast()
  let navigate = useNavigate()


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

  console.log(data)

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
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
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
                  <span className="text-muted">
                    {node.description}
                  </span>
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
              <Th isNumeric fontSize={"lg"} color="green.400">{order.totalDisplay}</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Card>
  )
}