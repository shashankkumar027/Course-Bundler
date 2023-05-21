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
import { courseRequest } from '../../redux/actions/otherAction';
import { toast } from 'react-hot-toast';
import Metadata from './Metadata';

const Request = ({ user }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [course, setCourse] = useState('');

  const submitHandler = e => {
    e.preventDefault();

    dispatch(courseRequest(name, email, course));
  };

  const { loading, error, message } = useSelector(state => state.other);

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
      <Metadata title={'Request New Course - CourseBundler'} />

      <Container h={'92vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading children={'Request New Course'} />

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
              <FormLabel htmlFor="course" children={'Course'} />
              <Textarea
                required
                id="course"
                value={course}
                onChange={e => setCourse(e.target.value)}
                placeholder="Explain the type/categoty of Course..."
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
              Send Request
            </Button>

            <Box my={'4'}>
              See avaliable Courses!{' '}
              <Link to={'/courses'}>
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

export default Request;
