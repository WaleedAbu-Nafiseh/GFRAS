import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/core';
import { useCourseDetailsContext } from '../CourseDetailsContext';

export function HandleQuizDetailsSideMenu({ id, icon, label }) {
	const {
		selectedQuizzesDetails,
		setSelectedQuizzesDetails
	} = useCourseDetailsContext();

	return (
		<Button
			h='100px'
			w='full'
			borderRadius={0}
			bg='transparent'
			outline='none'
			_focus={{ outline: 'none' }}
			isActive={selectedQuizzesDetails === id}
			_active={{
				color: 'rgb(19,104,206)'
			}}
			onClick={() => {
				setSelectedQuizzesDetails(id);
			}}
		>
			<Flex direction='column' align='center' w='full'>
				{icon}
				<Text fontSize='xs' mt='5px'>
					{label}
				</Text>
			</Flex>
		</Button>
	);
}
