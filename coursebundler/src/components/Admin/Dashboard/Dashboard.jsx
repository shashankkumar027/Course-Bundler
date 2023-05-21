import {
  Box,
  Grid,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import cursor from '../../../assets/images/cursor.png';
import SideBar from './SideBar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { DoghnutChart, LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../../redux/actions/adminAction';
import Loader from '../../Layout/Loader';
import Metadata from '../../Layout/Metadata';

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <>
    <Box
      w={['full', '20%']}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
      p="8"
      borderRadius={'lg'}
      overflow={'auto'}
    >
      <Text children={title} />
      <HStack spacing={'6'}>
        <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />
        <HStack>
          <Text children={`${qtyPercentage}%`} />
          {profit ? (
            <RiArrowUpLine color="green" />
          ) : (
            <RiArrowDownLine color="red" />
          )}
        </HStack>
      </HStack>
      <Text opacity={'0.6'} children={`Since Last Month`} />
    </Box>
  </>
);

const Bar = ({ title, value, profit }) => (
  <>
    <Box py={'4'} px={['0', '20']}>
      <Heading size={'sm'} mb={'2'} children={title} />

      <HStack w="full" alignItems={'center'}>
        <Text children={profit ? '0%' : `-${value}%`} />
        <Progress w="full" value={profit ? value : 0} colorScheme="purple" />
        <Text children={`${value > 100 ? value : '100'}%`} />
      </HStack>
    </Box>
  </>
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    loading,
    stats,
    userCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    userPercentage,
    subscriptionProfit,
    viewsProfit,
    userProfit,
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <>
      <Metadata title={'Admin Dashboard - CourseBundler'} />
      <Grid
        css={{
          cursor: `url(${cursor}), default`,
        }}
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
      >
        {loading || !stats ? (
          <Loader color="purple.500" />
        ) : (
          <>
            <Box boxSizing={'border-box'} py={'16'} px={['4', '0']}>
              <Text
                textAlign={'center'}
                opacity={0.5}
                children={`Last change was on ${
                  String(new Date(stats[11].createdAt)).split('G')[0]
                }`}
              />

              <Heading
                children={'Dashboard'}
                ml={['0', '16']}
                mb="16"
                textAlign={['center', 'left']}
              />

              <Stack
                direction={['column', 'row']}
                minH={'24'}
                justifyContent={'space-evenly'}
              >
                <Databox
                  title="Views"
                  qty={viewsCount}
                  qtyPercentage={viewsPercentage}
                  profit={viewsProfit}
                />
                <Databox
                  title="Users"
                  qty={userCount}
                  qtyPercentage={userPercentage}
                  profit={userProfit}
                />
                <Databox
                  title="Subscription"
                  qty={subscriptionCount}
                  qtyPercentage={subscriptionPercentage}
                  profit={subscriptionProfit}
                />
              </Stack>

              <Box
                m={['0', '16']}
                borderRadius={'lg'}
                p={['0', '16']}
                mt={['4', '16']}
                boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
              >
                <Heading
                  textAlign={['center', 'left']}
                  pt={['8', '0']}
                  size={'md'}
                  ml={['0', '16']}
                  children={'Views Graph'}
                />

                {/* Line Graph Here */}

                <LineChart views={stats && stats.map(item => item.views)} />
              </Box>

              <Grid templateColumns={['1fr', '2fr 1fr']}>
                <Box p={'4'}>
                  <Heading
                    textAlign={['center', 'left']}
                    size={'md'}
                    my={'8'}
                    ml={['0', '16']}
                    children={'Progress Bar'}
                  />

                  <Box>
                    <Bar
                      title="Views"
                      value={viewsPercentage}
                      profit={viewsProfit}
                    />
                    <Bar
                      title="Users"
                      value={userPercentage}
                      profit={userProfit}
                    />
                    <Bar
                      title="Subscription"
                      value={subscriptionPercentage}
                      profit={subscriptionProfit}
                    />
                  </Box>
                </Box>

                <Box p={['0', '16']} py={'4'} boxSizing="border-box">
                  <Heading
                    textAlign={'center'}
                    size="md"
                    mb={'4'}
                    children={'Users'}
                  />

                  {/* Donught Graph */}

                  <DoghnutChart
                    users={[subscriptionCount, userCount - subscriptionCount]}
                  />
                </Box>
              </Grid>
            </Box>
          </>
        )}

        <SideBar />
      </Grid>
    </>
  );
};

export default Dashboard;
