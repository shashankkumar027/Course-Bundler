import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/courseAction';
import Loader from '../Layout/Loader';
import Metadata from '../Layout/Metadata';

const CoursePage = ({ user }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { lectures, loading } = useSelector(state => state.course);

  const [lectureNumber, setLectureNumber] = useState(0);

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={lectures && lectures.length > 0 && lectures[lectureNumber].title} />
          <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
            {lectures && lectures.length > 0 ? (
              <>
                <Box>
                  <video
                    width={'100%'}
                    controls
                    disablePictureInPicture
                    disableRemotePlayback
                    controlsList="nodownload noremoteplayback"
                    src={lectures[lectureNumber].video.url}
                  ></video>
                  <Heading
                    m={'4'}
                    children={`#${lectureNumber + 1}. ${
                      lectures[lectureNumber].title
                    }`}
                  />
                  <Heading m={'4'} children={'Description'} />
                  <Text
                    m={'4'}
                    children={lectures[lectureNumber].description}
                  />
                </Box>
                <VStack>
                  {lectures.map((element, index) => (
                    <button
                      key={element._id}
                      onClick={() => setLectureNumber(index)}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        textAlign: 'center',
                        margin: '0',
                        borderBottom: '1px solid rgba(0,0,0,0.2)',
                      }}
                    >
                      <Text noOfLines={'1'}>
                        #{index + 1} {element.title}
                      </Text>
                    </button>
                  ))}
                </VStack>
              </>
            ) : (
              <>
                <Heading
                  children={'No Lectures Available!'}
                  opacity={'0.5'}
                  textAlign={'center'}
                />
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default CoursePage;
