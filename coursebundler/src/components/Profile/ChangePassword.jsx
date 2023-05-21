import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profileAction';
import { toast } from 'react-hot-toast';
import Metadata from '../Layout/Metadata';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
  };

  const { message, error, loading } = useSelector(state => state.profile);

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
      <Metadata title={'Change Password - CourseBundler'} />
      <Container py="16" minH="90vh">
        <form onSubmit={submitHandler}>
          <Heading
            textAlign={['center', 'left']}
            textTransform={'uppercase'}
            my="16"
            children={'Change Password'}
          />
          <VStack spacing={'8'}>
            <Input
              required
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="Enter Old Password"
              type="password"
              focusBorderColor="yellow.500"
            />

            <Input
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              type="password"
              focusBorderColor="yellow.500"
            />

            <Button
              isLoading={loading}
              w={'full'}
              colorScheme="yellow"
              type="submit"
            >
              Change Password
            </Button>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default ChangePassword;
