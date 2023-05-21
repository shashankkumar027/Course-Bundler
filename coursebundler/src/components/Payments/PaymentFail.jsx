import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Metadata from '../Layout/Metadata';

const PaymentFail = () => {
  return (
    <>
      <Metadata title={'Payment Failed - CourseBundler'} />
      <Container h={'90vh'}>
        <VStack justifyContent={'center'} h={'full'} spacing={'4'}>
          <RiErrorWarningFill size={'5rem'} />
          <Heading textTransform={'uppercase'} children={'Payment Failed'} />
          <Link to={'/subscribe'}>
            <Button variant={'ghost'} colorScheme="yellow">
              Try Again
            </Button>
          </Link>
        </VStack>
      </Container>
    </>
  );
};

export default PaymentFail;