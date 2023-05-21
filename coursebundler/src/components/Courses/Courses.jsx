import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/courseAction';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profileAction';
import { loadUser } from '../../redux/actions/userAction';
import Metadata from '../Layout/Metadata';

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlatlistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW={'200px'}
        size={'sm'}
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform={'uppercase'}
          children={'Creator:'}
        />
        <Text
          fontFamily={'body'}
          textTransform={'uppercase'}
          children={creator}
        />
      </HStack>
      <Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lectures - ${lectureCount}`}
        textTransform={'uppercase'}
      />

      <Heading
        size={'xs'}
        children={`Views - ${views}`}
        textTransform={'uppercase'}
      />

      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
          <Button colorScheme="yellow">Watch Now</Button>
        </Link>

        <Button
          isLoading={loading}
          variant={'ghost'}
          colorScheme="yellow"
          onClick={() => addToPlatlistHandler(id)}
        >
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const addToPlatlistHandler = async courseId => {
    console.log('Added to PlayList...' + courseId);
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };
  const categories = [
    'Web development',
    'Artificial intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, category, keyword, error, message]);

  return (
    <>
      <Metadata title={'All Courses - CourseBundler'} />
      <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
        <Heading children={'All Courses'} m={'8'} />
        <Input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder={'Search A Course...'}
          type={'text'}
          focusBorderColor={'yellow.500'}
        />

        <HStack
          overflowX={'auto'}
          paddingY={'8'}
          css={{ '&::-webkit-scrollbar': { display: 'none' } }}
        >
          {categories &&
            categories.map(item => (
              <Button minW={'60'} onClick={() => setCategory(item)} key={item}>
                <Text children={item} />
              </Button>
            ))}
        </HStack>

        <Stack
          direction={['column', 'row']}
          flexWrap={'wrap'}
          justifyContent={['flex-start', 'space-evenly']}
          alignItems={['center', 'flex-start']}
        >
          {courses.length > 0 ? (
            courses.map(item => (
              <Course
                key={item._id}
                title={item.title}
                description={item.description}
                imageSrc={item.poster.url}
                creator={item.createdBy}
                id={item._id}
                views={item.views}
                noOfLines={3}
                lectureCount={item.numOfVideos}
                addToPlatlistHandler={() => addToPlatlistHandler(item._id)}
                loading={loading}
              />
            ))
          ) : (
            <Heading opacity={0.5} mt="4" children="No Course Available" />
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Courses;
