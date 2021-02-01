import React, { useState } from 'react';
import { Flex, VStack, Button, Text } from '@chakra-ui/core';
import { SideMenu } from '../../../components/side-menu/SideMenu';
import { sideMenuItems, YOUR_COURSES } from '../courses.config';
import { CourseMainViews } from '../organisms/CourseMainViews';
import CoursesProvider, { useCoursesContext } from '../CoursesContext';
import { Spinner } from '../../../components/loaders/Spinner';

function PageSideMenu() {
	const [activeSideMenuButton, setActiveSideMenuButton] = useState(
		YOUR_COURSES
	);

	return (
		<Flex h='full'>
			<SideMenu minW='200px'>
				<VStack mx='auto' pt={10} spacing={6} align='stretch'>
					{sideMenuItems.map(({ title }, index) => {
						const isActive = activeSideMenuButton === title;
						return (
							<Button
								key={`${title}-${index}`}
								onClick={() => setActiveSideMenuButton(title)}
								isActive={isActive}
								bg='transparent'
								_hover={{ bg: '#036bb1', color: 'white' }}
								_active={{ bg: '#036bb1', color: 'white' }}
								color='#036bb1'
							>
								{title}
							</Button>
						);
					})}
				</VStack>
			</SideMenu>
			<CourseMainViews
				setActiveSideMenuButton={setActiveSideMenuButton}
				activeSideMenuButton={activeSideMenuButton}
			/>
		</Flex>
	);
}

function PageContainer() {
	const { isError, isLoading } = useCoursesContext();

	if (isError) return <Text m='auto'>Something went wrong</Text>;
	if (isLoading) return <Spinner />;
	if (!isLoading && !isError) return <PageSideMenu />;
}

function Courses() {
	return (
		<CoursesProvider>
			<PageContainer />
		</CoursesProvider>
	);
}

export default Courses;
