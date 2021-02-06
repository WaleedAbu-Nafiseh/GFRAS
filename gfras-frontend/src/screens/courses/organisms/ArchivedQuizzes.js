import React, { useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/core';
import { useQuizContext } from '../QuizContext';
import { finishedQuizzesSelector } from '../gradesSelector';
import { useIntl } from 'react-intl';
import { unArchiveQuiz } from '../../../API/quizzes/unArchiveQuiz';
import {
	useFailureToast,
	useSuccessToast
} from '../../../custom-hooks/useSuccessToast';

function ArchivedQuizzes(props) {
	const { data, isLoading, refetchNewQuizCreated } = useQuizContext();
	const [loadingButtonID, setLoadingButtonID] = useState('');
	const successToast = useSuccessToast();
	const failureToast = useFailureToast();
	const { finishedQuizzes } = finishedQuizzesSelector({
		quizzesData: data
	});

	const onUnArchiveQuiz = (quizID) => {
		setLoadingButtonID(quizID);
		unArchiveQuiz({ quizID })
			.then(() => {
				setLoadingButtonID('');
				refetchNewQuizCreated();
				successToast({
					title: 'UnArchived Successfully'
				});
			})
			.catch((err) => {
				failureToast({
					title: 'An error occurred',
					description: err.message
				});
			});
	};
	console.log(finishedQuizzes);

	if (finishedQuizzes.length === 0) {
		return (
			<Flex
				w='full'
				h='full'
				align='center'
				justify='center'
				fontSize='24px'
				fontWeight={500}
			>
				No Archived Quizzes Found
			</Flex>
		);
	}

	return (
		<Flex direction='column' p='100px' w='full' overflow='auto'>
			{finishedQuizzes.map(({ id, quizTitle, quizID }, index) => {
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
							bg='transparent'
							isLoading={loadingButtonID === quizID}
							isDisabled={loadingButtonID !== quizID && loadingButtonID !== ''}
							_hover={{ bg: 'red.500', color: 'white' }}
							color='red.500'
							onClick={() => onUnArchiveQuiz(quizID)}
						>
							Unarchive
						</Button>
					</Flex>
				);
			})}
		</Flex>
	);
}

export default ArchivedQuizzes;
