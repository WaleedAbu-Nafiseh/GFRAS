import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/core';
import { CREATE_NEW_COURSE } from '../courses.config';
import { useIntl } from 'react-intl';

export function YourCourse({ setActiveSideMenuButton }) {
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
