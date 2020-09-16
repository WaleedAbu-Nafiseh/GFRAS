import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/core';
import { CREATE_NEW_COURSE } from '../courses.config';
import { useIntl } from 'react-intl';
import { useCoursesContext } from '../../CoursesContext';

function EmptyCourses({ setActiveSideMenuButton }) {
	const { formatMessage } = useIntl();

	return (
		<Flex w='full' justify='center' align='center'>
			<Flex direction='column'>
				<Text fontSize={20}>
					{formatMessage({ id: 'courses.yourCourses.emptyCourses' })}
				</Text>
				<Button
					bg='#3182ce'
					mt='10px'
					_hover={{ bg: '#006ace' }}
					onClick={() => setActiveSideMenuButton(CREATE_NEW_COURSE)}
				>
					{formatMessage({ id: 'courses.yourCourses.createNewCourse' })}
				</Button>
			</Flex>
		</Flex>
	);
}

export function YourCourse({ setActiveSideMenuButton }) {
	const { formatMessage } = useIntl();
	const { data } = useCoursesContext();
	const courses = [];
	console.log(data);
	data.forEach(function (doc) {
		courses.push(
			<Flex
				borderRadius='10px'
				direction='column'
				border='1px solid white'
				mx='90px'
				h='200px'
				w='200px'
				p='20px'
				key={doc.id}
				boxShadow=' 0 11px 15px -7px rgba(0,0,0,0.2)'
			>
				<Text color='#609beb'>{doc.data().courseName}</Text>
				<Flex>
					<Text color='gray'>
						{formatMessage({ id: 'courses.yourCourses.noOfStudents' })}
					</Text>
					<Text fontWeight='500'>{doc.data().students.length}</Text>
				</Flex>
			</Flex>
		);
	});

	if (data.size === 0) {
		return <EmptyCourses setActiveSideMenuButton={setActiveSideMenuButton} />;
	}

	return <Flex p='60px'>{courses}</Flex>;
}
