import React from 'react';
import { Flex, Text, Button, Spinner, IconButton } from '@chakra-ui/core';
import { useQuizContext } from '../QuizContext';
import { useIntl } from 'react-intl';
import { startQuiz } from '../../../API/quizzes/startQuiz';
import { useLocation } from 'react-router-dom';
import { ChevronLeftIcon } from '../../../components/icons/ChevronLeft';
import { useCourseDetailsContext } from '../CourseDetailsContext';

export function QuizList() {
	const { pathname } = useLocation();
	const { formatMessage } = useIntl();
	const { data } = useQuizContext();
	const {
		setIsSideMenuExpanded,
		setSelectedCourseDetail
	} = useCourseDetailsContext();

	if (!data) {
		return <Spinner />;
	}

	const handleStartQuiz = async (quizID) => {
		await startQuiz({ docID: quizID }).then((res) => {
			window.location.href = `${pathname}/${quizID}`;
		});
	};

	if (data.length === 0) {
		return (
			<Flex
				w='full'
				h='full'
				direction='column'
				align='center'
				justify='center'
			>
				<Text fontSize={20} fontWeight={500}>
					{formatMessage({ id: 'course.quiz.quizList.noQuizzes' })}
				</Text>
				<Button
					w='fit-content'
					bg='#3182ce'
					mt='10px'
					_hover={{ bg: '#006ace' }}
					onClick={() => {
						setIsSideMenuExpanded(true);
						setSelectedCourseDetail('create-quiz');
					}}
				>
					{formatMessage({ id: 'course.quiz.quizList.createNewQuiz' })}
				</Button>
			</Flex>
		);
	}

	return (
		<>
			<Flex>
				<IconButton
					ml='25px'
					fontSize='25px'
					onClick={() => (window.location.href = '/courses')}
					mt='5px'
					isRound
					icon={<ChevronLeftIcon />}
				/>
			</Flex>
			<Flex direction='column' p='100px' w='full'>
				{data.map(({ id, quizTitle, quizID }, index) => {
					return (
						<Flex
							border='1px solid white'
							boxShadow='0 0 20px rgba(0,0,0,0.14)'
							key={`${id}-${quizTitle}-${quizID}`}
							p={'10px'}
							my='10px'
						>
							<Text>{quizTitle}</Text>
							<Button ml='auto' onClick={() => handleStartQuiz(quizID)}>
								{formatMessage({ id: 'courses.createQuizzes.startQuiz' })}
							</Button>
						</Flex>
					);
				})}
			</Flex>
		</>
	);
}
