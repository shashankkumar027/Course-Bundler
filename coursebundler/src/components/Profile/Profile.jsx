import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Image,
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
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { fileUploadCss } from '../Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from '../../redux/actions/profileAction';
import {
  cancelSubscription,
  deleteProfile,
  loadUser,
} from '../../redux/actions/userAction';
import { toast } from 'react-hot-toast';
import Metadata from '../Layout/Metadata';

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);

  const {
    loading: SubLoading,
    message: SubMessage,
    error: SubError,
  } = useSelector(state => state.subscription);

  const {
    loading: deleteProfileLoading,
    error: deleteProfileError,
    message: deleteProfileMessage,
  } = useSelector(state => state.deleteProfile);

  const removeFromPlaylistHandler = async id => {
    console.log(`Course Removed from Playlist ID: ${id}`);
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('file', image);

    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
  };

  const deleteProfileHandler = () => {
    console.log(`Deleting User with name: ${user.name}`);
    dispatch(deleteProfile());
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (SubError) {
      toast.error(SubError);
      dispatch({ type: 'clearError' });
    }
    if (deleteProfileError) {
      toast.error(deleteProfileError);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (SubMessage) {
      toast.success(SubMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser());
    }
    if (deleteProfileMessage) {
      toast.success(deleteProfileMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser());
    }
  }, [
    dispatch,
    message,
    error,
    SubMessage,
    SubError,
    deleteProfileError,
    deleteProfileMessage,
  ]);

  return (
    <>
      <Metadata title={`${user && user.name}'s Profile - CourseBundler`} />
      <Container minH={'95vh'} maxW="container.lg" py="8">
        {user.role === 'admin' && (
          <Heading
            m="8"
            textAlign={'center'}
            children="Admin Account"
            opacity={'0.5'}
          />
        )}

        <Heading
          m="8"
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
          children="Profile"
        />

        <Stack
          justifyContent={'flex-start'}
          direction={['column', 'row']}
          alignItems={'center'}
          spacing={['8', '16']}
          padding={'8'}
        >
          <VStack>
            <Avatar boxSize={'48'} src={user && user.avatar.url} />
            <Button onClick={onOpen} colorScheme="yellow" variant={'ghost'}>
              Change Photo
            </Button>
          </VStack>

          <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
            <HStack>
              <Text fontWeight={'bold'} children={'Name'} />
              <Text children={user && user.name} />
            </HStack>

            <HStack>
              <Text fontWeight={'bold'} children={'Email'} />
              <Text children={user && user.email} />
            </HStack>

            <HStack>
              <Text fontWeight={'bold'} children={'CreatedAt'} />
              <Text children={user && user.createdAt.split('T')[0]} />
            </HStack>

            {user && user.role !== 'admin' && (
              <>
                <HStack>
                  <Text fontWeight={'bold'} children={'Subscription'} />
                  {user &&
                  user.subscription &&
                  user.subscription.status === 'active' ? (
                    <>
                      <Button
                        isLoading={SubLoading}
                        onClick={cancelSubscriptionHandler}
                        color="yellow.500"
                        variant={'ghost'}
                      >
                        Cancle Subscription
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to={'/subscribe'}>
                        <Button colorScheme="yellow">Subscribe</Button>
                      </Link>
                    </>
                  )}
                </HStack>
              </>
            )}

            <Stack direction={['column', 'row']} alignItems={'center'}>
              <Link to="/updateprofile">
                <Button>Update Profile</Button>
              </Link>

              <Button
                isLoading={deleteProfileLoading}
                onClick={deleteProfileHandler}
              >
                Delete Profile
              </Button>

              <Link to="/changepassword">
                <Button>Change Password</Button>
              </Link>
            </Stack>
          </VStack>
        </Stack>

        <Heading children={'Playlist'} size={'md'} my="8" />
        {user && user.playlist.length > 0 && (
          <>
            <Stack
              direction={['column', 'row']}
              alignItems={'center'}
              flexWrap={'wrap'}
              padding={'4'}
            >
              {user.playlist.map(element => (
                <VStack w={'48'} m="2" key={element.course}>
                  <Image
                    boxSize={'full'}
                    objectFit={'contain'}
                    src={element.poster}
                  />
                  <HStack>
                    <Link to={`/course/${element.course}`}>
                      <Button variant={'ghost'} colorScheme="yellow">
                        Watch Now
                      </Button>
                    </Link>
                    <Button
                      isLoading={loading}
                      onClick={() => removeFromPlaylistHandler(element.course)}
                    >
                      <RiDeleteBin7Fill />
                    </Button>
                  </HStack>
                </VStack>
              ))}
            </Stack>
          </>
        )}

        <ChangePhotoBox
          isOpen={isOpen}
          onClose={onClose}
          changeImageSubmitHandler={changeImageSubmitHandler}
          loading={loading}
        />
      </Container>
    </>
  );
};

export default Profile;

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const changeImageHandler = e => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImage('');
    setImagePreview('');
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader textAlign={['center', 'left']} children={'Change Photo'} />
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePreview && <Avatar src={imagePreview} boxSize={'48'} />}
                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImageHandler}
                />

                <Button
                  isLoading={loading}
                  w={'full'}
                  colorScheme="yellow"
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancle
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
