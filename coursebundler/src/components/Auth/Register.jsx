import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/userAction';
import { useDispatch } from 'react-redux';
import Metadata from '../Layout/Metadata';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};

const fileuploadStyle = {
  '&::file-selector-button': fileUploadCss,
};

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [image, setImage] = useState('');

  const changeImageHandler = e => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    dispatch(register(myForm));
  };

  return (
    <>
      <Metadata title={'Registration to CourseBundler'} />
      <Container h={['112vh', '95vh']}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading textTransform={'uppercase'} children={'Registration'} />

          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <Box my={'4'} display={'flex'} justifyContent={'center'}>
              <Avatar src={imagePreview} size={'2xl'} />
            </Box>
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
                placeholder="coursebundler@gmail.com"
                type="email"
                focusBorderColor="yellow.500"
              />
            </Box>

            <Box my={'4'}>
              <FormLabel htmlFor="password" children={'Password'} />
              <Input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                type="password"
                focusBorderColor="yellow.500"
              />
            </Box>

            <Box my={'4'}>
              <FormLabel htmlFor="chooseAvatar" children={'Choose Avatar'} />
              <Input
                required
                accept="image/*"
                id="chooseAvatar"
                type="file"
                focusBorderColor="yellow.500"
                css={fileuploadStyle}
                onChange={changeImageHandler}
              />
            </Box>

            <Button
              my={'4'}
              w={['full', 'min']}
              colorScheme="yellow"
              type="submit"
            >
              Register
            </Button>

            <Box my="4">
              Already Signed Up?{' '}
              <Link to="/login">
                <Button colorScheme={'yellow'} variant="link">
                  Login
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

export default Register;
