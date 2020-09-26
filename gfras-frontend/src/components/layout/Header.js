import React, { useContext } from 'react';
import { Box, Flex, Button } from '@chakra-ui/core';
import { AuthContext } from '../auth-provider';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../../constant';

const Header = ({ navTitle, menuItems, ...props }) => {
	const [show, setShow] = React.useState(false);
	const handleToggle = () => setShow(!show);
	const { setIsAuthenticated } = useContext(AuthContext);
	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			wrap='wrap'
			padding='1.5rem'
			bg='blue.500'
			color='white'
			{...props}
		>
			<Flex align='center' mr={5}>
				<NavLink to={ROUTES.QUIZZES}>
					<Button
						bg='transparent'
						mr={6}
						_focus={{ bg: 'transparent' }}
						_hover={{ bg: 'transparent' }}
						letterSpacing={'-.1rem'}
						fontSize={35}
					>
						{navTitle}
					</Button>
				</NavLink>
			</Flex>
			<Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
				<svg
					fill='white'
					width='12px'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title>Menu</title>
					<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
				</svg>
			</Box>
			<Flex
				display={{ sm: show ? 'block' : 'none', md: 'flex' }}
				width={{ sm: 'full', md: 'auto' }}
				align='center'
				flexGrow={1}
			>
				{menuItems}
			</Flex>
			{/*Todo: Handle the left header button*/}
			<Box
				display={{ sm: show ? 'block' : 'none', md: 'block' }}
				mt={{ base: 4, md: 0 }}
			>
				<Button
					onClick={() => {
						setIsAuthenticated(false);
						localStorage.removeItem('token');
						localStorage.removeItem('userID');
						localStorage.removeItem('instructorID');
					}}
					bg='transparent'
					border='1px'
				>
					Logout
				</Button>
			</Box>
		</Flex>
	);
};

export default Header;
