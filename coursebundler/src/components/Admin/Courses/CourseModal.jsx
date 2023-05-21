import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill, RiVideoUploadFill } from 'react-icons/ri';
import { fileUploadCss } from '../../Auth/Register';

const CourseModal = ({
  isOpen,
  onClose,
  id,
  courseTitle,
  addLectureHandler,
  deleteButtonHandler,
  lectures = [],
  loading,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPreview, setVideoPreview] = useState('');

  const fileuploadStyle = {
    '&::file-selector-button': {
      ...fileUploadCss,
      color: 'purple',
    },
  };

  const changeVideoHandler = e => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setVideoPreview(reader.result);
      setVideo(file);
    };
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPreview('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      size={'full'}
      onClose={handleClose}
      scrollBehavior="outside"
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>

        <ModalCloseButton />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my="5">
                <Heading children={`Coures Title: ${courseTitle}`} />
                <Heading children={`#${id}`} size={'sm'} opacity={'0.4'} />
              </Box>

              <Heading children="Lectures" size={'lg'} />

              {lectures && lectures.length > 0 ? (
                lectures.map((item, i) => (
                  <>
                    <VideoCard
                      key={i}
                      title={item.title}
                      description={item.description}
                      num={i + 1}
                      lectureId={item._id}
                      courseId={id}
                      deleteButtonHandler={deleteButtonHandler}
                      loading={loading}
                    />
                  </>
                ))
              ) : (
                <>
                  <Heading
                    children={'No Lectures Available!'}
                    opacity={'0.5'}
                    textAlign={'center'}
                  />
                </>
              )}
            </Box>

            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add Lecture"
                    size={'md'}
                    textTransform={'uppercase'}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />

                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />

                  <Input
                    required
                    accept="video/mp4"
                    type="file"
                    focusBorderColor="purple.300"
                    css={fileuploadStyle}
                    onChange={changeVideoHandler}
                  />

                  {videoPreview && (
                    <>
                      <video
                        controlsList="nodownload"
                        controls
                        src={videoPreview}
                      ></video>
                    </>
                  )}

                  <Button
                    isLoading={loading}
                    w="full"
                    colorScheme="purple"
                    type="submit"
                  >
                    Upload{' '}
                    <RiVideoUploadFill
                      fontSize={'1.3rem'}
                      style={{ marginLeft: '0.5rem' }}
                    />
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
  loading,
}) {
  return (
    <>
      <Stack
        direction={['column', 'row']}
        my="8"
        borderRadius={'lg'}
        boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
        justifyContent={['flex-start', 'space-between']}
        p={['4', '8']}
      >
        <Box>
          <Heading size={'sm'} children={`#${num} ${title}`} />
          <Text children={description} />
        </Box>
        <Button
          isLoading={loading}
          color={'purple.600'}
          onClick={() => deleteButtonHandler(courseId, lectureId)}
        >
          <RiDeleteBin7Fill />
        </Button>
      </Stack>
    </>
  );
}
