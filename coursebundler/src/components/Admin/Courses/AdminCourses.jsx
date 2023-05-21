import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import cursor from '../../../assets/images/cursor.png';
import SideBar from '../Dashboard/SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/courseAction';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/adminAction';
import toast from 'react-hot-toast';
import Metadata from '../../Layout/Metadata';

const AdminCourses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { courses, lectures } = useSelector(state => state.course);

  const { loading, error, message } = useSelector(state => state.admin);

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const courseDetailsHandler = (courseId, title) => {
    console.log(courseId);
    dispatch(getCourseLectures(courseId));
    setCourseId(courseId);
    setCourseTitle(title);
    onOpen();
  };

  const deleteButtonHandler = courseId => {
    dispatch(deleteCourse(courseId));
    console.log(`User deleted with ID: #${courseId}`);
  };

  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    console.log(`This is Coures ID: ${courseId}`);
    console.log(`This is Lecture ID: ${lectureId}`);

    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('courseId', courseId);
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);

    await dispatch(addLecture(courseId, myForm));

    dispatch(getCourseLectures(courseId));
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

    dispatch(getAllCourses());
  }, [dispatch, error, message]);

  return (
    <>
      <Metadata title={'All Courses - Admin'} />
      <Grid
        css={{
          cursor: `url(${cursor}), default`,
        }}
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
      >
        <Box p={['0', '8']} overflowX="auto">
          <Heading
            textTransform={'uppercase'}
            children={'All Courses'}
            my="16"
            textAlign={['center', 'left']}
          />
          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size={'md'}>
              <TableCaption>All available courses in the database</TableCaption>

              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Poster</Th>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Creator</Th>
                  <Th isNumeric>Views</Th>
                  <Th isNumeric>Lectures</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>

              <Tbody>
                {courses &&
                  courses.map(item => (
                    <Row
                      courseDetailsHandler={courseDetailsHandler}
                      deleteButtonHandler={deleteButtonHandler}
                      item={item}
                      key={item._id}
                      loading={loading}
                    />
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <CourseModal
            isOpen={isOpen}
            onClose={onClose}
            id={courseId}
            courseTitle={courseTitle}
            deleteButtonHandler={deleteLectureButtonHandler}
            addLectureHandler={addLectureHandler}
            lectures={lectures}
            loading={loading}
          />
        </Box>

        <SideBar />
      </Grid>
    </>
  );
};

function Row({ item, courseDetailsHandler, deleteButtonHandler, loading }) {
  return (
    <>
      <Tr>
        <Td>#{item._id}</Td>
        <Td>
          <Image src={item.poster.url} />
        </Td>
        <Td>{item.title}</Td>
        <Td textTransform={'uppercase'}>{item.category}</Td>
        <Td>{item.createdBy}</Td>
        <Td isNumeric>{item.views}</Td>
        <Td isNumeric>{item.numOfVideos}</Td>

        <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
            <Button
              isLoading={loading}
              variant={'outline'}
              color={'purple.500'}
              onClick={() => courseDetailsHandler(item._id, item.title)}
            >
              View Lectures
            </Button>
            <Button
              isLoading={loading}
              color={'purple.600'}
              onClick={() => deleteButtonHandler(item._id)}
            >
              <RiDeleteBin7Fill />
            </Button>
          </HStack>
        </Td>
      </Tr>
    </>
  );
}

export default AdminCourses;
