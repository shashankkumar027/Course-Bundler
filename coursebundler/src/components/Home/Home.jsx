import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heading,
  Stack,
  VStack,
  Text,
  Button,
  Image,
  Box,
  HStack,
} from '@chakra-ui/react';
import '../../styles/Home.css';
import vg from '../../assets/images/bg.png';
import intro from '../../assets/videos/intro.mp4';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import Metadata from '../Layout/Metadata';

const home = () => {
  return (
    <>
      <Metadata title={'Welcome to Course Bundler'} />
      <section className="home">
        <div className="container">
          <Stack
            direction={['column', 'row']}
            height={'100%'}
            justifyContent={['center', 'space-between']}
            alignItems={'center'}
            spacing={['16', '56']}
          >
            <VStack
              width={'full'}
              alignItems={['center', 'flex-end']}
              spacing={'8'}
            >
              <Heading children="LEARN THE WAY YOU WANT" size={'2xl'} />
              <Text
                fontSize={'2xl'}
                fontFamily={'cursive'}
                textAlign={['center', 'left']}
                children="Become A Star And Shine At The Sky."
              />
              <Link to={'/courses'}>
                <Button size={'lg'} colorScheme="yellow">
                  Explore Now
                </Button>
              </Link>
            </VStack>

            <Image
              className="vector-graphics"
              boxSize={'md'}
              src={vg}
              objectFit={'contain'}
            />
          </Stack>
        </div>

        <Box padding={'8'} bg={'blackAlpha.800'}>
          <Heading
            textAlign={'center'}
            fontFamily={'body'}
            color={'yellow.400'}
            children="OUR BRANDS"
          />
          <HStack
            className="brandsBanner"
            justifyContent={'space-evenly'}
            marginTop={'4'}
          >
            <CgGoogle />
            <CgYoutube />
            <SiCoursera />
            <SiUdemy />
            <DiAws />
          </HStack>
        </Box>

        <div className="container2">
          <video
            autoPlay
            controls
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback"
            src={intro}
          ></video>
        </div>
      </section>
    </>
  );
};

export default home;
