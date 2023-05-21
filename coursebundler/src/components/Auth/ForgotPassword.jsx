import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profileAction';
import { toast } from 'react-hot-toast';
import Metadata from '../Layout/Metadata';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { loading, message, error } = useSelector(state => state.profile);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <>
      {' '}
      <Metadata title={'Forgot Password - CourseBundler'} />
      <Container py={'16'} h={'90vh'}>
        <form onSubmit={submitHandler}>
          <Heading
            children={'Forgot Password'}
            my={'16'}
            textTransform={'uppercase'}
            textAlign={['center', 'left']}
          />
          <VStack spacing={'8'}>
            <Input
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="coursebundler@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
            />
            <Button
              isLoading={loading}
              type="submit"
              w={'full'}
              colorScheme="yellow"
            >
              Send Reset Link
            </Button>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default ForgotPassword;
