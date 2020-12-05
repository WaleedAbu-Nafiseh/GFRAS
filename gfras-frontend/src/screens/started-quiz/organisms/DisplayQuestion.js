import React, { useState } from 'react';
import { Flex, Box, Text, Button } from '@chakra-ui/core';
import {
	ANSWER_OPTIONS,
	optionsBackgroundColors,
	hoverOptionsBackgroundColor
} from '../displayQuestion.config';
import { useParams, Prompt } from 'react-router-dom';
import { useStartedQuizContext } from '../StartedQuizContext';
import { useIntl } from 'react-intl';
import { setQuizFinished } from '../../../API/quizzes/setQuizFinished';
import { Modal } from '../../../components/modal/modal';

function Question({ question }) {
	return (
		<Box h='55px' bg='rgb(241,241,241)' w='full'>
			<Text textAlign='center' fontWeight={500} fontSize='4xl'>
				{question}
			</Text>
		</Box>
	);
}

function Options({ data }) {
	return (
		<Flex flexWrap='wrap' m='10px' alignContent='flex-end' flex='4 1 0%'>
			{ANSWER_OPTIONS.map((option, index) => {
				return (
					<Button
						bg={optionsBackgroundColors[index]}
						w='calc(50% - 1.5rem)'
						h='calc(10% - 0.125rem)'
						key={`option-${option.name}`}
						m='10px'
						fontWeight={500}
						_hover={{ bg: hoverOptionsBackgroundColor[index] }}
						fontSize='2xl'
						color='white'
						cursor='context-menu'
						position='relative'
						leftIcon={option.icon}
					>
						{data.questionData[option.name]}
					</Button>
				);
			})}
		</Flex>
	);
}

const ACTUAL_QUESTION_NUMBER = 1;

function NextQuestion({ noOfQuestions }) {
	const { setQuestionNumber, questionNumber } = useStartedQuizContext();
	const { formatMessage } = useIntl();
	const { quizID, courseID } = useParams();

	const isLastQuestion = () =>
		questionNumber + ACTUAL_QUESTION_NUMBER === noOfQuestions;
	//TODO: handle end button to show question false
	return (
		<Button
			position='absolute'
			right='8px'
			onClick={async () => {
				if (isLastQuestion()) {
					await setQuizFinished({ quizID });
					window.location.href = `/top-students/${courseID}/${quizID}`;
				} else {
					setQuestionNumber((prevState) => ++prevState);
				}
			}}
			maxH='48px'
			maxW='48px'
			_hover={{
				bg: isLastQuestion() ? 'red.600' : '#ff5722'
			}}
			top='60px'
			bg={isLastQuestion() ? 'red.500' : '#fc4216'}
			color='white'
		>
			{isLastQuestion()
				? formatMessage({ id: 'course.quiz.startedQuiz.endQuestion' })
				: formatMessage({ id: 'course.quiz.startedQuiz.nextQuestion' })}
		</Button>
	);
}

function ModalFooter({ setShowModal }) {
	return (
		<Flex justify='flex-end' w='full'>
			<Button
				mr='10px'
				onClick={() => {
					setShowModal(false);
				}}
				bg='blue.500'
				color='white'
				outline='none'
				border='none'
				_hover={{ bg: 'blue.600' }}
				_focus={{ outline: 'none', border: 'none' }}
			>
				No
			</Button>
			<Button
				bg='red.500'
				color='white'
				outline='none'
				border='none'
				_hover={{ bg: 'red.600' }}
				_focus={{ outline: 'none', border: 'none' }}
				onClick={() => console.log('yes')}
			>
				Continue
			</Button>
		</Flex>
	);
}

export function DisplayQuestion() {
	const { data, questionNumber } = useStartedQuizContext();
	const [showModal, setShowModal] = useState(false);
	const { formatMessage } = useIntl();

	return (
		<Flex w='full' direction='column' position='relative'>
			<Prompt
				message={() => {
					setShowModal(true);
					return false;
				}}
			/>
			<Modal
				headerTitle={'Navigate to another page'}
				isOpen={showModal}
				modalBody='If you navigate to another page the quiz will be ended'
				modalFooter={<ModalFooter setShowModal={setShowModal} />}
			/>
			<Question question={data.questionData.question} />
			<Text textAlign='center' color='#bbbfc6' fontWeight='600' fontSize='md'>
				{formatMessage(
					{
						id: 'course.quiz.startedQuiz.currentQuestion'
					},
					{
						currentQuestionNo: questionNumber + ACTUAL_QUESTION_NUMBER,
						noOfQuestions: data.noOfQuestions
					}
				)}
			</Text>
			<NextQuestion noOfQuestions={data.noOfQuestions} />
			<Options data={data} />
		</Flex>
	);
}
