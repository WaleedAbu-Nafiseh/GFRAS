import React, { useEffect } from 'react';
import { Flex, Text, Button } from '@chakra-ui/core';
import { useQuizContext } from '../QuizContext';
import { useIntl } from 'react-intl';
import { startQuiz } from '../../../API/quizzes/startQuiz';
import { useLocation, useHistory } from 'react-router-dom';
import { useCourseDetailsContext } from '../CourseDetailsContext';
import { BackButton } from '../atoms/BackButton';
import { Spinner } from '../../../components/loaders/Spinner';

export function QuizList() {
	const { pathname } = useLocation();
	const { formatMessage } = useIntl();
	const { replace } = useHistory();
	const { data, isLoading, refetchNewQuizCreated } = useQuizContext();
	const activeQuizzes = data.filter(({ finished }) => finished === false);

	useEffect(() => {
		refetchNewQuizCreated();
	}, []);

	const {
		setIsSideMenuExpanded,
		setSelectedCourseDetail
	} = useCourseDetailsContext();

	if (isLoading) {
		return <Spinner />;
	}

	const handleStartQuiz = async (quizID) => {
		await startQuiz({ docID: quizID }).then((res) => {
			replace(`${pathname}/${quizID}`);
		});
	};
	const hasNoActiveQuizzes = data.length > 0 && activeQuizzes.length === 0;

	if (data.length === 0 || (data.length > 0 && activeQuizzes.length === 0)) {
		return (
			<>
				<Flex
					w='full'
					h='full'
					direction='column'
					align='center'
					justify='center'
				>
					<Text fontSize={20} fontWeight={500}>
						{hasNoActiveQuizzes
							? 'This Course has No Active Quizzes'
							: formatMessage({ id: 'course.quiz.quizList.noQuizzes' })}
					</Text>
					<Button
						w='fit-content'
						bg='#ff5722'
						_hover={{ bg: '#fc4216' }}
						color='white'
						mt='10px'
						onClick={() => {
							setIsSideMenuExpanded(true);
							setSelectedCourseDetail('create-quiz');
						}}
					>
						{formatMessage({ id: 'course.quiz.quizList.createNewQuiz' })}
					</Button>
				</Flex>
			</>
		);
	}

	return (
		<>
			{/*<BackButton />*/}
			<Flex direction='column' p='100px' w='full' overflow='auto'>
				{activeQuizzes.map(({ id, quizTitle, quizID }, index) => {
					return (
						<Flex
							border='1px solid white'
							boxShadow='0 0 20px rgba(0,0,0,0.14)'
							key={`${id}-${quizTitle}-${quizID}`}
							p={'10px'}
							my='10px'
						>
							<Text alignSelf='center' fontSize={20}>
								{quizTitle}
							</Text>
							<Button
								ml='auto'
								bg='#ff5722'
								_hover={{ bg: '#fc4216' }}
								color='white'
								onClick={() => handleStartQuiz(quizID)}
							>
								{formatMessage({ id: 'courses.createQuizzes.startQuiz' })}
							</Button>
						</Flex>
					);
				})}
			</Flex>
		</>
	);
}
