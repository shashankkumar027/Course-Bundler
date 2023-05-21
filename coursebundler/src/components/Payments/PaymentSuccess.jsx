import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';
import Metadata from '../Layout/Metadata';

const PaymentSuccess = () => {
  const reference = useSearchParams()[0].get('reference');

  return (
    <>
      <Metadata title={'Payment Success - CourseBundler'} />
      <Container h={['110vh', '90vh']} p={'16'}>
        <Heading my={'8'} textAlign={'center'} children={'You have Pro Pack'} />
        <VStack
          boxShadow={'lg'}
          pb={'16'}
          alignItems={'center'}
          borderRadius={'lg'}
        >
          <Box
            w={'full'}
            bg={'yellow.400'}
            p={'4'}
            css={{ borderRadius: '8px 8px 0 0' }}
          >
            <Text color={'black'}>Payment Success</Text>
          </Box>

          <Box p={'4'}>
            <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
              <Text
                children={
                  "Congratulation you're a Pro member! You have Access to Premium content"
                }
              />

              <Heading size={'4xl'}>
                <RiCheckboxCircleFill />
              </Heading>
            </VStack>
          </Box>
          <Link to={'/profile'}>
            <Button variant={'ghost'}>Go to Profile</Button>
          </Link>
          <Heading size={'xs'} children={`Reference: #${reference}`} />
        </VStack>
      </Container>
    </>
  );
};

export default PaymentSuccess;
