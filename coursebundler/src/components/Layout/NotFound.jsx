import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Metadata from './Metadata';

const NotFound = () => {
  return (
    <>
      <Metadata title={'Page Not Found - CourseBundler'} />
      <Container h={'90vh'}>
        <VStack justifyContent={'center'} h={'full'} spacing={'4'}>
          <RiErrorWarningFill size={'5rem'} />
          <Heading children={'Page Not Found'} />
          <Link to={'/'}>
            <Button variant={'ghost'} colorScheme="yellow">
              Go to Home
            </Button>
          </Link>
        </VStack>
      </Container>
    </>
  );
};

export default NotFound;
