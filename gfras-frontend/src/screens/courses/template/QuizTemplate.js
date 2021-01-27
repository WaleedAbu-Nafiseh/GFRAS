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
import QuizListSideMenu from '../organisms/QuizListSideMenu';
import Grades from '../organisms/Grades';
import Dashboard from '../organisms/Dashboard';

export function QuizTemplate() {
	const { selectedCourseDetail } = useCourseDetailsContext();
	const {
		isSideMenuExpanded,
		setIsSideMenuExpanded,
		selectedQuizzesDetails
	} = useCourseDetailsContext();

	return (
		<Flex h='full' w='full'>
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
					{selectedCourseDetail === 'quizzes-details' && <QuizListSideMenu />}
				</SideMenu>
			)}
			{/*<BackButton />*/}
			{selectedCourseDetail === 'dashboard' && <Dashboard />}
			{selectedCourseDetail === 'create-quiz' && <Question />}
			{selectedCourseDetail === 'quizzes-details' &&
				selectedQuizzesDetails === 'quizzes-list' && <QuizList />}
			{selectedCourseDetail === 'quizzes-details' &&
				selectedQuizzesDetails === 'quizzes-grades' && <Grades />}
			{selectedCourseDetail === 'attendance-list' && <Attendance />}
			{selectedCourseDetail === 'add-new-students' && <AddStudents />}
		</Flex>
	);
}
