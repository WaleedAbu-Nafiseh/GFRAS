import React from 'react';
import { SideMenu } from '../../../components/side-menu/SideMenu';
import { QuizSideMenu } from '../organisms/QuizSideMenu';
import { Question } from '../organisms/Question';
import { Flex, IconButton } from '@chakra-ui/core';
import { CourseDetails } from '../organisms/CourseDetails';
import { useCoursesContext } from '../CoursesContext';
import { SmallCloseIcon } from '../../../components/icons/SmallClose';
import { QuizList } from '../organisms/QuizList';
import { useQuizContext } from '../QuizContext';

export function QuizTemplate() {
	const { selectedCourseDetail } = useCoursesContext();
	const { isSideMenuExpanded, setIsSideMenuExpanded } = useQuizContext();

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
			{selectedCourseDetail === 'create-quiz' && <Question />}
			{selectedCourseDetail === 'quiz-list' && <QuizList />}
		</Flex>
	);
}
