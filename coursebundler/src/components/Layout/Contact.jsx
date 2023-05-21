import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../redux/actions/otherAction';
import toast from 'react-hot-toast';
import Metadata from './Metadata';

const Contact = ({ user }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [message, setMessage] = useState('');

  const submitHandler = e => {
    e.preventDefault();

    dispatch(contactUs(name, email, message));
  };

  const {
    loading,
    error,
    message: Message,
  } = useSelector(state => state.other);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (Message) {
      toast.success(Message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, Message]);

  return (
    <>
      <Metadata title={'Contact Us'} />

      <Container h={'92vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading children={'Contact Us'} />

          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <Box my={'4'}>
              <FormLabel htmlFor="name" children={'Name'} />
              <Input
                required
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Shashank"
                type="text"
                focusBorderColor="yellow.500"
              />
            </Box>

            <Box my={'4'}>
              <FormLabel htmlFor="email" children={'Email Address'} />
              <Input
                required
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="shashank@coursebundler.com"
                type="email"
                focusBorderColor="yellow.500"
              />
            </Box>

            <Box my={'4'}>
              <FormLabel htmlFor="message" children={'Message'} />
              <Textarea
                required
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Your Message..."
                focusBorderColor="yellow.500"
              />
            </Box>

            <Button
              isLoading={loading}
              my={'4'}
              w={['full', 'min']}
              colorScheme="yellow"
              type="submit"
            >
              Send Mail
            </Button>

            <Box my={'4'}>
              Request for a Course?{' '}
              <Link to={'/request'}>
                <Button colorScheme="yellow" variant={'link'}>
                  Click
                </Button>{' '}
                here
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Contact;
