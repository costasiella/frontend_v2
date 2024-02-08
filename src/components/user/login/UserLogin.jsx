// @ts-check
import React, { useContext } from 'react'

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


  import GlobalContext from '../../contexts/GlobalContext';

  import CSLS from '../../../constants/cs_local_storage';
  import CSAuth from '../../../tools/authentication';

  import { TOKEN_AUTH } from '../queries';

  
  export default function UserLogin() {
    /** @type {Object} */
    const context = useContext(GlobalContext)
    const { t } = useTranslation()
    let navigate = useNavigate()
    const toast = useToast()
    
    const [ doTokenAuthResult, doTokenAuth ] = useMutation(TOKEN_AUTH)

    const formik = useFormik({
      initialValues: {
        username: '',
        password: ''
      },
      onSubmit: (values, { setSubmitting }) => {
        // alert(JSON.stringify(values, null, 2))
        const variables = {
          username: values.username,
          password: values.password
        }
        
        doTokenAuth(variables).then(result => {
          console.log(result)
          if (result.error) {
            console.error(result.error)
            const error = result.error
            toast({
              title: error.message.replace("[GraphQL]", ""),
              status: "error"
            })
            setSubmitting(false)
          } else {
            const data = result.data
            console.log(data)

            const next = localStorage.getItem(CSLS.AUTH_LOGIN_NEXT) || "/user/welcome"
            CSAuth.login(data.tokenAuth)
            setTimeout(() => navigate(next), 500)
          }
        })
      },
    })

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>{t("user.login.heading")}</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              {context && context.organization && context.organization.name}
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="username">
                  <FormLabel htmlFor="username">{t("general.email_address")}</FormLabel>
                  <Input 
                    id="username"
                    name="username"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel htmlFor="password">{t("general.password")}</FormLabel>
                  <Input 
                    id="password"
                    name="password"
                    type="password" 
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    {/* <Checkbox>Remember me</Checkbox> */}
                    <Spacer />
                    <Link color={'blue.400'}>{t("user.login.forgot_password")}</Link>
                  </Stack>
                  <Button
                    isLoading={formik.isSubmitting}
                    type="submit"
                    bg={'green.400'}
                    color={'white'}
                    colorScheme='green'
                  >
                    {t("user.login.sign_in")}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  }