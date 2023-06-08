// @ts-check

import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import DOMPurify from 'dompurify'
import { 
    Card,
    CardBody,
    CardFooter,
    Heading,
    Link,
    Text,
} from "@chakra-ui/react"

import GlobalContext from '../../contexts/GlobalContext';
import cs_django_links from "../../../constants/cs_django_links";

export default function ShopContact() {
  /**
   * @type {Object}
   */
  const context = useContext(GlobalContext)
  const { t } = useTranslation()

  const organization = context.organization

  return (
    <React.Fragment>
      <Heading as="h2" fontSize="24px" textAlign={{base: "center", md:  "left"}}>
        {t("shop.contact.title")} 
      </Heading>
      <Card 
        maxW={{ base: '330px', md: '500px', lg: "3000px"}}
        w={'full'}
        mt={6}
        ml="auto"
        mr="auto"
      >
        <CardBody>
          <Heading as="h3" size="sm" mb={6}>
            {organization.name}
          </Heading>
          <Text>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(organization.address) }} />
          </Text>
          <Text>
            {organization.email} <br /> {organization.phone}
          </Text>
          <Text>
            {organization.registration} <br /> {organization.taxRegistration}
          </Text>
        </CardBody>
        <CardFooter>
          <small>
            <Link 
              mr={6}
              color="green.400"
              target="_blank" 
              rel="noreferrer"
              href={cs_django_links.EXPORT_TERMS_AND_CONDITIONS}
            >
              {t("general.terms_and_conditions")}
            </Link> 
            <Link 
              color="green.400"
              target="_blank" 
              rel="noreferrer" 
              href={cs_django_links.EXPORT_PRIVACY_POLICY}
            >
              {t("general.privacy_policy")}
            </Link>
          </small>
        </CardFooter>
      </Card>
    </React.Fragment>
  )
}