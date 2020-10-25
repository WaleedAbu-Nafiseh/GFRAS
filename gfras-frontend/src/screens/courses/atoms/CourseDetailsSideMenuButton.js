import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/core';
import { useCourseDetailsContext } from '../CourseDetailsContext';

export function CourseDetailsSideMenuButton({
	id,
	canSideMenuExpand,
	icon,
	label
}) {
	const {
		selectedCourseDetail,
		setSelectedCourseDetail
	} = useCourseDetailsContext();
	const { setIsSideMenuExpanded } = useCourseDetailsContext();

	return (
		<Button
			h='100px'
			w='full'
			borderRadius={0}
			bg='transparent'
			outline='none'
			_focus={{ outline: 'none' }}
			isActive={selectedCourseDetail === id}
			_active={{
				color: 'rgb(19, 104, 206)',
				borderRight: '4px solid rgb(19, 104, 206)'
			}}
			onClick={() => {
				setIsSideMenuExpanded(canSideMenuExpand);
				setSelectedCourseDetail(id);
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
