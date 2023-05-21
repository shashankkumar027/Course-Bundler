import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import intro from '../../assets/videos/intro.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCondition from '../../assets/docs/termsAndCondition';
import Metadata from './Metadata';

const VideoPlayer = () => (
  <Box>
    <video
      autoPlay
      controls
      loop
      muted
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
      src={intro}
    ></video>
  </Box>
);

const Founder = ({ imgSrc }) => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
    <VStack>
      <Avatar src={imgSrc} boxSize={['40', '48']} />
      <Text children={'Co-Founder'} opacity={'0.7'} />
    </VStack>

    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="" size={['md', 'xl']} />
      <Text
        textAlign={['center', 'left']}
        children={
          'Hi, I am a full-stack developer. Our mission is to make you a star so, you can shine at the top. By providing our valuable courses at very reasonable prices.'
        }
      />
    </VStack>
  </Stack>
);

const TandC = ({ termsAndConditions }) => (
  <Box>
    <Heading
      size={'md'}
      children={'Terms & Conditions'}
      textAlign={['center', 'left']}
      my={'4'}
    />
    <Box h={'sm'} p={'4'} overflowY={'scroll'}>
      <Text
        textAlign={['center', 'left']}
        letterSpacing={'widest'}
        fontFamily={'heading'}
      >
        {termsAndConditions}
      </Text>
      <Heading
        my={'4'}
        size={'xs'}
        children={'Refund only applicable for cancellation within 7 days.'}
      />
    </Box>
  </Box>
);

const About = () => {
  const imgSrc =
    'https://res.cloudinary.com/dwnapkoae/image/upload/v1681921024/myPhotos/sketch-removebg-preview_wpyuuj.png';
  return (
    <>
      <Metadata title={'About Us'} />
      <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
        <Heading children={'About Us'} textAlign={['center', 'left']} />

        <Founder imgSrc={imgSrc} />

        <Stack m={'8'} direction={['column', 'row']} alignItems={'center'}>
          <Text fontFamily={'cursive'} m={'8'} textAlign={['center', 'left']}>
            We are a video streaming platform with bunch of premium courses
            available only for premium users.
          </Text>
          <Link to={'/subscribe'}>
            <Button variant={'ghost'} colorScheme="yellow">
              Check Out Plans
            </Button>
          </Link>
        </Stack>
        <VideoPlayer />

        <TandC termsAndConditions={termsAndCondition} />

        <HStack my={'4'} p={'4'}>
          <RiSecurePaymentFill />
          <Heading
            size={'xs'}
            fontFamily={'sans-serif'}
            textTransform={'uppercase'}
            children={'Payment is Secured by Razorpay'}
          />
        </HStack>
      </Container>
    </>
  );
};

export default About;
