// @ts-check

// Based on the Chakra UI stepper
// https://chakra-ui.com/docs/components/stepper/usage

import React from 'react'

import { useTranslation } from 'react-i18next';
import {
  Box,
  Center,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from '@chakra-ui/react'
// import {
//   FiChevronRight, 
// } from 'react-icons/fi';
// import {
//   MdCheckCircle
// } from 'react-icons/md';


function getSteps(t) {
  return [
    { title: t("shop.checkout_progress.order"), description: '' },
    { title: t("shop.checkout_progress.payment"), description: '' },
    { title: t("shop.checkout_progress.complete"), description: '' },
  ]
}

/**
 * ShopCheckoutProgressProps
 * @typedef {Object} ShopCheckoutProgressProps
 * @property {number} step - The index of the step (starts at 0 for the first step)
 */

/**
 * ShopCheckoutProgress Component
 * @param {ShopCheckoutProgressProps} props - The props for the checkout progress component
 */
export default function ShopCheckoutProgress({step}) {
  const { t } = useTranslation()
  const steps = getSteps(t)

  const { activeStep } = useSteps({
    index: step,
    count: steps.length,
  })

  const activeStepText = steps[activeStep].title

  return (
    <Center py={6} alignItems={'start'}>
      <Box
        maxW={{ base: '330px', md: '500px', lg: "1000px"}}
        w={'full'}
      >
        <Stack>
          <Stepper size='sm' index={activeStep} gap='0' colorScheme='green'>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus complete={<StepIcon />} />
                </StepIndicator>
                {/* <StepSeparator _horizontal={{ ml: '0' }} /> */}
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          <Text>
            {t("shop.checkout_progress.step")} {activeStep + 1}: <b>{activeStepText}</b>
          </Text>
        </Stack>
      </Box>
    </Center>
  )
}
