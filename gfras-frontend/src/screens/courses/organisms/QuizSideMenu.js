import React from 'react';
import { Heading, Flex, Button, IconButton, Input } from '@chakra-ui/core';
import { useIntl } from 'react-intl';
import { useQuizContext } from '../QuizContext';
import { SmallCloseIcon } from '../../../components/icons/SmallClose';

export const QuizSideMenu = () => {
	const { formatMessage } = useIntl();
	const {
		setNoOfSelectedQuestions,
		setSelectedQuestion,
		noOfSelectedQuestions,
		selectedQuestion,
		setDeletedQuestion,
		setQuizTitle
	} = useQuizContext();

	let questionsButtons = [];
	const handleAddQuestion = () => {
		if (noOfSelectedQuestions < 5) {
			setNoOfSelectedQuestions((prevState) => ++prevState);
			setSelectedQuestion(selectedQuestion + 1);
		}
	};

	const handleSelectedQuestion = (selectedQuestion) => {
		setSelectedQuestion(selectedQuestion);
	};

	for (let i = 0; i < noOfSelectedQuestions && i < 5; i++) {
		questionsButtons = [
			...questionsButtons,
			<Flex w='full' position='relative' key={`button-${i}`}>
				<IconButton
					icon={<SmallCloseIcon />}
					onClick={() => {
						setDeletedQuestion(i);
					}}
					display={noOfSelectedQuestions > 1 ? 'block' : 'none'}
					position='absolute'
					right='10px'
					color='white'
					_hover={{ bg: 'transparent', color: 'black' }}
					_focus={{ border: 0 }}
					top='20px'
					bg='transparent'
					zIndex='1000'
				/>
				<Button
					w='full'
					mx='20px'
					alignSelf='stretch'
					mt='20px'
					onClick={() => handleSelectedQuestion(i)}
					isActive={selectedQuestion === i}
					bg='#3182ce'
					_hover={{ bg: '#036bb1' }}
					_active={{ bg: '#036bb1' }}
					color='white'
				>
					{`Question #${i + 1}`}
				</Button>
			</Flex>
		];
	}

	return (
		<Flex direction='column' align='center' w='full' mt='40px'>
			<Heading>
				{formatMessage({ id: 'courses.createQuizzes.question' })}
			</Heading>
			<Input
				placeholder='Quiz Title'
				width='200px'
				mt='60px'
				onChange={(e) => setQuizTitle(e.target.value)}
			/>

			<Flex mt='50px' h='full' w='full' direction='column' align='center'>
				{questionsButtons}
				<Button
					mt='26px'
					onClick={handleAddQuestion}
					isDisabled={noOfSelectedQuestions >= 5}
					bg='#ff5722'
					_hover={{ bg: '#fc4216' }}
					color='white'
				>
					{formatMessage({ id: 'courses.createQuizzes.addQuestion' })}
				</Button>
			</Flex>
		</Flex>
	);
};
