import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import cursor from '../../../assets/images/cursor.png';
import SideBar from '../Dashboard/SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../../../redux/actions/adminAction';
import toast from 'react-hot-toast';
import Metadata from '../../Layout/Metadata';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error, message } = useSelector(state => state.admin);

  const updateHandler = userId => {
    console.log(userId);
    dispatch(updateUserRole(userId));
  };

  const deleteButtonHandler = userId => {
    dispatch(deleteUser(userId));
    console.log(`User deleted with ID: #${userId}`);
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

    dispatch(getAllUsers());
  }, [dispatch, error, message]);

  return (
    <>
      <Metadata title={'All Users - Admin'} />
      <Grid
        css={{
          cursor: `url(${cursor}), default`,
        }}
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
      >
        <Box p={['0', '16']} overflowX="auto">
          <Heading
            textTransform={'uppercase'}
            children={'All Users'}
            my="16"
            textAlign={['center', 'left']}
          />
          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size={'lg'}>
              <TableCaption>All available users in the database</TableCaption>

              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Subscription</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>

              <Tbody>
                {users &&
                  users.map(item => (
                    <Row
                      updateHandler={updateHandler}
                      deleteButtonHandler={deleteButtonHandler}
                      item={item}
                      key={item._id}
                      loading={loading}
                    />
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <SideBar />
      </Grid>
    </>
  );
};
export default Users;

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
  return (
    <>
      <Tr>
        <Td>#{item._id}</Td>
        <Td>{item.name}</Td>
        <Td>{item.email}</Td>
        <Td color={item.role === 'admin' ? 'green.500' : ''}>{item.role}</Td>
        <Td
          color={
            item.subscription && item.subscription.status === 'active'
              ? 'green.500'
              : 'red.500'
          }
        >
          {item.subscription && item.subscription.status === 'active'
            ? 'Active'
            : 'Not Active'}
        </Td>
        <Td isNumeric>
          <HStack justifyContent={'flex-end'}>
            <Button
              isLoading={loading}
              variant={'outline'}
              color={'purple.500'}
              onClick={() => updateHandler(item._id)}
            >
              Change Role
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
