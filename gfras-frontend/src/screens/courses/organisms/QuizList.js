import React from 'react';
import { Flex, Text, Button, Spinner } from '@chakra-ui/core';
import { useQuizContext } from '../QuizContext';
import { useIntl } from 'react-intl';
import { startQuiz } from '../../../API/quizzes/startQuiz';
import { useLocation } from 'react-router-dom';

export function QuizList() {
	const { pathname } = useLocation();
	const { formatMessage } = useIntl();
	const { data } = useQuizContext();

	if (!data) {
		return <Spinner />;
	}

	const handleStartQuiz = async (quizID) => {
		await startQuiz({ docID: quizID });
		window.location.href = `${pathname}/${quizID}`;
	};

	return (
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
	);
}
