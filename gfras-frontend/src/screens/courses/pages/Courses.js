import React, { useState } from 'react';
import { Flex, VStack, Button, Text, Spinner } from '@chakra-ui/core';
import { SideMenu } from '../template/SideMenu';
import { sideMenuItems, YOUR_COURSES } from '../courses.config';
import { CourseMainViews } from '../organisms/CourseMainViews';
import CoursesProvider, { useCoursesContext } from '../../CoursesContext';

function PageSideMenu() {
	const [activeSideMenuButton, setActiveSideMenuButton] = useState(
		YOUR_COURSES
	);

	return (
		<Flex>
			<SideMenu>
				<VStack mx='auto' pt={10} spacing={6} align='stretch'>
					{sideMenuItems.map(({ title }, index) => {
						const isActive = activeSideMenuButton === title;
						return (
							<Button
								key={`${title}-${index}`}
								onClick={() => setActiveSideMenuButton(title)}
								isActive={isActive}
								bg='transparent'
								_hover={{ bg: '#3182ce' }}
								_active={{ bg: '#3182ce' }}
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
	if (isLoading) return <Spinner m='auto' />;
	if (!isLoading && !isError) return <PageSideMenu />;
}

export function Courses() {
	return (
		<CoursesProvider>
			<PageContainer />
		</CoursesProvider>
	);
}
