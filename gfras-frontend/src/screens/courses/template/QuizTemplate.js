import React from 'react';
import { SideMenu } from '../../../components/side-menu/SideMenu';
import { QuizSideMenu } from '../organisms/QuizSideMenu';
import { Question } from '../organisms/Question';
import { Flex, IconButton } from '@chakra-ui/core';
import { CourseDetails } from '../organisms/CourseDetails';
import { SmallCloseIcon } from '../../../components/icons/SmallClose';
import { QuizList } from '../organisms/QuizList';
import { Attendance } from '../organisms/Attendance';
import { useCourseDetailsContext } from '../CourseDetailsContext';
import AddStudents from '../organisms/AddStudents';
import { BackButton } from '../atoms/BackButton';

export function QuizTemplate() {
	const { selectedCourseDetail } = useCourseDetailsContext();
	const {
		isSideMenuExpanded,
		setIsSideMenuExpanded
	} = useCourseDetailsContext();

	return (
		<Flex h='full'>
			<CourseDetails />
			{isSideMenuExpanded && (
				<SideMenu position='relative' minWidth='250px'>
					<IconButton
						mx='auto'
						textAlign='center'
						onClick={() => setIsSideMenuExpanded(false)}
						isRound
						bg='transparent'
						_focus={{ border: 'none', outline: 'none' }}
						fontSize='25px'
						mt='5px'
						position='absolute'
						right='10px'
						icon={<SmallCloseIcon boxSize='30px' />}
					/>
					{selectedCourseDetail === 'create-quiz' && <QuizSideMenu />}
				</SideMenu>
			)}
			{/*<BackButton />*/}
			{selectedCourseDetail === 'create-quiz' && <Question />}
			{selectedCourseDetail === 'quiz-list' && <QuizList />}
			{selectedCourseDetail === 'attendance-list' && <Attendance />}
			{selectedCourseDetail === 'add-new-students' && <AddStudents />}
		</Flex>
	);
}
