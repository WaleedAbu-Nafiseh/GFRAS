import React, { Suspense, useState } from 'react';
import { Button, Flex, Spinner } from '@chakra-ui/core';
import * as ROUTES from './constant';
import {
	Switch,
	Route,
	Redirect,
	NavLink,
	useLocation
} from 'react-router-dom';
import Header from './components/layout/Header';
import { useIntl } from 'react-intl';
import { menuItems } from './constant';
import { Courses } from './screens/courses/pages/Courses';

export function AuthenticatedApp() {
	const { formatMessage } = useIntl();
	const { pathname } = useLocation();
	const [activeMenuButtons, setActiveMenuButtons] = useState(
		pathname !== '/login' ? pathname : '/quizzes'
	);

	const onSetMenuButton = (buttonName) => {
		setActiveMenuButtons(buttonName);
	};

	const navMenuItems = menuItems.map(({ title, route }, index) => {
		return (
			<NavLink to={route} key={`${title}-${index}`}>
				<Button
					bg='transparent'
					align='center'
					_active={{ color: '#11293f' }}
					isActive={activeMenuButtons === route}
					onClick={() => onSetMenuButton(route)}
					fontSize={22}
					_hover={{ bg: 'transparent' }}
					_focus={{ bg: 'transparent' }}
				>
					{title}
				</Button>
			</NavLink>
		);
	});

	return (
		<>
			<Header
				navTitle={formatMessage({ id: 'header.bar.title' })}
				menuItems={navMenuItems}
			/>
			<Suspense
				fallback={
					<Flex width='full' justify='center' height='900px' align='center'>
						<Spinner />
					</Flex>
				}
			>
				<Switch>
					<Route path={ROUTES.QUIZZES} render={() => <>quizzes</>} />
					<Route path={ROUTES.COURSES} render={() => <Courses />} />
					<Redirect from='/' to={ROUTES.QUIZZES} />
				</Switch>
			</Suspense>
		</>
	);
}
