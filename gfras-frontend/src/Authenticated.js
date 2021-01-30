import React, { Suspense, useState } from 'react';
import { Button, Spinner, Flex } from '@chakra-ui/core';
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

const Courses = React.lazy(() => import('./screens/courses/pages/Courses'));
const Quiz = React.lazy(() => import('./screens/courses/pages/CourseDetails'));
const StartedQuiz = React.lazy(() =>
	import('./screens/started-quiz/Pages/StartedQuiz')
);
const TopStudents = React.lazy(() =>
	import('./screens/top-students/Pages/TopStudents')
);

export function AuthenticatedApp() {
	const { formatMessage } = useIntl();
	const { pathname } = useLocation();
	const [activeMenuButtons, setActiveMenuButtons] = useState(() => pathname);

	const onSetMenuButton = (buttonName) => {
		setActiveMenuButtons(buttonName);
	};

	const navMenuItems = menuItems.map(({ title, route }, index) => {
		return (
			<NavLink to={route} key={`${title}-${index}`}>
				<Button
					bg='transparent'
					align='center'
					color='white'
					_active={{ color: '#11293f' }}
					isActive={activeMenuButtons === route || true}
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
		<Flex direction='column' h='100vh' overflow='hidden'>
			<Header
				navTitle={formatMessage({ id: 'header.bar.title' })}
				menuItems={navMenuItems}
			/>
			<Suspense fallback={<Spinner m='auto' />}>
				<Switch>
					<Route
						path={`${ROUTES.COURSE_DETAILS}/:courseID/:quizID`}
						render={() => <StartedQuiz />}
					/>
					<Route
						exact
						path={`${ROUTES.TOP_STUDENTS}/:courseID/:quizID`}
						render={() => <TopStudents />}
					/>
					<Route
						exact
						path={`${ROUTES.COURSE_DETAILS}/:courseID`}
						render={() => <Quiz />}
					/>
					<Route path={ROUTES.COURSES} render={() => <Courses />} />

					<Redirect from='/' to={ROUTES.COURSES} />
				</Switch>
			</Suspense>
		</Flex>
	);
}
