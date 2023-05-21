import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profileAction';
import { loadUser } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.profile);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
  };

  return (
    <Container py="16" minH="90vh">
      <form onSubmit={submitHandler}>
        <Heading
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
          my="16"
          children={'Update Profile'}
        />
        <VStack spacing={'8'}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type="text"
            focusBorderColor="yellow.500"
          />

          <Input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            focusBorderColor="yellow.500"
          />

          <Button
            isLoading={loading}
            w={'full'}
            colorScheme="yellow"
            type="submit"
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
