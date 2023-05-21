import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();
  return (
    <VStack
      spacing={'8'}
      padding={'16'}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    >
      <LinkButton
        Icon={RiDashboardFill}
        url={'dashboard'}
        text={'Dashboard'}
        active={location.pathname === '/admin/dashboard'}
      />
      <LinkButton
        Icon={RiEyeFill}
        url={'courses'}
        text={'Courses'}
        active={location.pathname === '/admin/courses'}
      />
      <LinkButton
        Icon={RiAddCircleFill}
        url={'createcourses'}
        text={'Create Course'}
        active={location.pathname === '/admin/createcourses'}
      />
      <LinkButton
        Icon={RiUser3Fill}
        url={'users'}
        text={'Users'}
        active={location.pathname === '/admin/users'}
      />
    </VStack>
  );
};

export default SideBar;

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link to={`/admin/${url}`}>
      <Button
        fontSize={'large'}
        variant={'ghost'}
        colorScheme={active ? 'purple' : 'yellow'}
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
}
