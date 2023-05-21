// @ts-check
import React from 'react'

import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'urql';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Spacer,
    Text,
    useColorModeValue,
    useToast,    
  } from '@chakra-ui/react';


  import OrganizationContext from '../../contexts/GlobalContext';

  import CSLS from '../../../constants/cs_local_storage';
  import CSAuth from '../../../tools/authentication';

  import { TOKEN_COOKIE_DELETE, TOKEN_REFRESH_COOKIE_DELETE } from '../queries';

  
  export default function UserLogout() {
    const [active, setActive] = useState(false)
    /**
     * @type {Object}
     */
    const organization = useContext(OrganizationContext)
    console.log(organization)
    const { t } = useTranslation()
    let navigate = useNavigate()
    const toast = useToast()
    
    const [ deleteCookieResult, deleteCookie ] = useMutation(TOKEN_COOKIE_DELETE)
    const [ deleteRefreshCookieResult, deleteRefreshCookie ] = useMutation(TOKEN_REFRESH_COOKIE_DELETE)

    // const formik = useFormik({
    //   initialValues: {
    //     username: '',
    //     password: ''
    //   },
    //   onSubmit: (values, { setSubmitting }) => {
    //     // alert(JSON.stringify(values, null, 2))
        
    //     doTokenAuth({
    //         username: values.username,
    //         password: values.password
    //     }).then(result => {
    //       console.log(result)
    //       if (result.error) {
    //         console.error(result.error)
    //         const error = result.error
    //         toast({
    //           title: error.message.replace("[GraphQL]", ""),
    //           status: "error",
    //           duration: 5000,
    //           isClosable: true
    //         })
    //       } else {
    //         const data = result.data
    //         console.log(data)

    //         const next = localStorage.getItem(CSLS.AUTH_LOGIN_NEXT) || "/user/welcome"
    //         CSAuth.login(data.tokenAuth)
    //         setTimeout(() => navigate(next), 500)
    //       }
    //     })
    //   },
    // })

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>{t("user.logout.heading")}</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              {organization && organization.name}
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Box fontWeight="bold" mb="40px">
              {t("user.logout.confirmation_message")}
            </Box>
            <Button 
              isLoading={active}
              width="100%"
              bgColor="green.400"
              colorScheme="green"
              onClick={() => {
                setActive(true)
                // Delete the cookie
                deleteCookie().then(result => {
                  if (result.error) {
                    console.error(result.error)
                  }

                  console.log(result.data)  
                })
                // Delete the refresh cookie
                deleteRefreshCookie().then(result => {
                  if (result.error) {
                    console.error(result.error)
                  }
                  console.log(result.data)
                })
                setTimeout(() => 
                  toast({
                    title: t("user.logout.success"),
                    status: "success"
                  }), 350
                )
                setTimeout(() => navigate("/user/login"), 250)
              }}
            >
              {t("user.logout.sign_out")}
            </Button>
          </Box>
        </Stack>
      </Flex>
    );
  }