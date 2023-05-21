// @ts-check
import React from 'react'

import { useTranslation } from 'react-i18next';
import {
  Box,
  Text,
  Stack,
  Link,
  List,
  ListItem,
  ListIcon,
  FormControl,
  FormLabel,
  Button,
  Textarea,
} from '@chakra-ui/react';
import {
  FiChevronRight, 
} from 'react-icons/fi';
import {
  MdCheckCircle
} from 'react-icons/md';

import cs_django_links from '../../constants/cs_django_links';


export default function ShopCheckoutForm({formik}) {
  const { t } = useTranslation()

  return (
    <Box width="100%">
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="message">
            <FormLabel htmlFor="message">{t("shop.checkout.order_message")}</FormLabel>
            <Textarea
              id="message"
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
            />
          </FormControl>
          <Stack spacing={3}>
            <Text
              as="span"
              fontSize="xs"
              color="gray.400"
            >
              {t("shop.order.by_placing_this_order")} <br />
              <List>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color='green.400' />
                  {t("shop.order.agree_terms")} {" "}
                  <Link 
                    color="green.400"
                    target="_blank" 
                    rel="noreferrer"
                    href={cs_django_links.EXPORT_TERMS_AND_CONDITIONS}
                  >
                    {t("general.terms_and_conditions")}
                  </Link>
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color='green.400' />
                  {t("shop.order.agree_privacy")} {" "}
                  <Link 
                    color="green.400"
                    target="_blank" 
                    rel="noreferrer" 
                    href={cs_django_links.EXPORT_PRIVACY_POLICY}
                  >
                    {t("general.privacy_policy")}
                  </Link>
                </ListItem>
              </List>
            </Text>
            <Button
              isLoading={formik.isSubmitting}
              type="submit"
              bg={'green.400'}
              color={'white'}
              colorScheme='green'
              rightIcon={<FiChevronRight />}
            >
              {t("shop.checkout.place_order")}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  )
}
