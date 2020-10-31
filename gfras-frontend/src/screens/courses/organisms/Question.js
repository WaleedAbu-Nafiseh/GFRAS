import React, { useEffect, useState } from 'react';
import { useQuizContext } from '../QuizContext';
import { useParams } from 'react-router-dom';
import {
	Flex,
	Input,
	InputRightElement,
	InputGroup,
	Button
} from '@chakra-ui/core';
import { useIntl } from 'react-intl';
import { CheckIcon } from '../../../components/icons/Check';
import { createQuiz } from '../../../API/quizzes/createQuiz';
import {
	useFailureToast,
	useSuccessToast
} from '../../../custom-hooks/useSuccessToast';
import { BackButton } from '../atoms/BackButton';

export function Question() {
	const { formatMessage } = useIntl();
	const {
		questionAndOptions,
		setQuestionAndOptions,
		isValidSubmitQuiz,
		setIsValidSubmitQuiz,
		refetchNewQuizCreated
	} = useQuizContext();
	const [isLoading, setIsLoading] = useState(false);
	const { courseID } = useParams();
	const successToast = useSuccessToast();
	const failureToast = useFailureToast();

	const {
		selectedQuestion,
		noOfSelectedQuestions,
		setNoOfSelectedQuestions,
		deletedQuestion,
		setDeletedQuestion,
		setSelectedQuestion,
		quizTitle
	} = useQuizContext();

	useEffect(() => {
		if (deletedQuestion !== -1) {
			setNoOfSelectedQuestions((prevState) => --prevState);

			setQuestionAndOptions((prevState) => {
				const newState = prevState.filter((question, index) => {
					return index !== deletedQuestion;
				});
				return newState;
			});
			setDeletedQuestion(-1);
			setSelectedQuestion(0);
		}
	}, [
		setSelectedQuestion,
		deletedQuestion,
		setQuestionAndOptions,
		setNoOfSelectedQuestions,
		setDeletedQuestion
	]);

	useEffect(() => canSubmitQuiz(), [
		questionAndOptions,
		noOfSelectedQuestions,
		quizTitle
	]);

	const onSubmitCreateQuestion = async () => {
		setIsLoading(true);
		await createQuiz({
			questionAndOptions: [...questionAndOptions],
			courseID,
			quizTitle
		})
			.then((res) => {
				refetchNewQuizCreated();
				setIsLoading(false);
				setQuestionAndOptions([]);
				setNoOfSelectedQuestions(1);

				successToast({
					title: formatMessage({
						id: 'quiz.toastMessage.createNewQuiz.quizCreated.title'
					}),
					description: formatMessage({
						id: 'quiz.toastMessage.createNewQuiz.quizCreated.description'
					})
				});
			})
			.catch((err) => {
				failureToast({
					title: formatMessage({
						id: 'toastMessage.errorOccurred.title'
					}),
					description: err.message
				});
			});
	};

	const canSubmitQuiz = () => {
		const isEveryQuestionValid = questionAndOptions.map((questionAndOption) => {
			let isValidQuestion = false;
			if (
				questionAndOption['question'] &&
				questionAndOption['optionA'] &&
				questionAndOption['optionB'] &&
				questionAndOption['optionC'] &&
				questionAndOption['optionD'] &&
				questionAndOption['correctAnswer'] &&
				quizTitle
			) {
				isValidQuestion = true;
			}
			return isValidQuestion;
		});
		if (isEveryQuestionValid.length > 0) {
			setIsValidSubmitQuiz(
				isEveryQuestionValid.every((question) => question === true) &&
					questionAndOptions.length === noOfSelectedQuestions
			);
		}
	};

	const onChangeInputText = (e, inputName) => {
		const optionsTemp = [...questionAndOptions];

		if (
			optionsTemp[selectedQuestion] &&
			inputName === optionsTemp[selectedQuestion].correctAnswerKey
		) {
			optionsTemp[selectedQuestion]['correctAnswer'] = e.target.value;
		}
		optionsTemp[selectedQuestion] = {
			...optionsTemp[selectedQuestion],
			[inputName]: e.target.value,
			showQuestion: false
		};
		setQuestionAndOptions(optionsTemp);
	};

	const onClickInputRightIcon = (optionCorrectAnswer, index) => {
		const optionsTemp = [...questionAndOptions];

		if (
			optionsTemp[index] &&
			optionsTemp[index][`option${optionCorrectAnswer}`]
		) {
			if (
				optionsTemp[index].correctAnswer ===
				optionsTemp[index][`option${optionCorrectAnswer}`]
			) {
				delete optionsTemp[index].correctAnswer;
			} else {
				optionsTemp[index] = {
					...optionsTemp[index],
					correctAnswer:
						optionsTemp[selectedQuestion][`option${optionCorrectAnswer}`],
					correctAnswerKey: `option${optionCorrectAnswer}`
				};
			}
			setQuestionAndOptions(optionsTemp);
		}
	};

	return (
		<>
			<Flex>
				<Button
					position='absolute'
					right={'105px'}
					top='100px'
					isLoading={isLoading}
					onClick={onSubmitCreateQuestion}
					float='right'
					bg='#ff5722'
					_hover={{ bg: '#fc4216' }}
					color='white'
					isDisabled={!isValidSubmitQuiz}
				>
					{formatMessage({ id: 'courses.createQuizzes.createQuiz' })}
				</Button>
				<BackButton />
			</Flex>
			<Flex direction='column' mx='auto' justify='center' w='full' px='90px'>
				<Input
					h='100px'
					value={
						questionAndOptions[selectedQuestion]
							? questionAndOptions[selectedQuestion].question
							: ''
					}
					boxShadow='rgba(0, 0, 0, 0.15) 0px -4px 0px 0px inset'
					fontWeight='500'
					onChange={(e) => onChangeInputText(e, 'question')}
					fontSize={30}
					textAlign='center'
					placeholder={formatMessage({
						id: 'courses.createQuizzes.typeYourQuestion'
					})}
				/>
				<Flex flexWrap='wrap' flex='0 1 auto' m='10px' justify='center'>
					{['A', 'B', 'C', 'D'].map((option) => {
						return (
							<InputGroup key={`option-${option}`} maxWidth='600px' m='10px'>
								<Input
									value={
										questionAndOptions[selectedQuestion] &&
										questionAndOptions[selectedQuestion][`option${option}`]
											? questionAndOptions[selectedQuestion][`option${option}`]
											: ''
									}
									placeholder={`Option ${option}`}
									onChange={(e) => onChangeInputText(e, `option${option}`)}
								/>
								<InputRightElement>
									<CheckIcon
										onClick={() =>
											onClickInputRightIcon(option, selectedQuestion)
										}
										color={
											questionAndOptions[selectedQuestion] &&
											questionAndOptions[selectedQuestion].correctAnswer &&
											questionAndOptions[selectedQuestion].correctAnswer ===
												questionAndOptions[selectedQuestion][`option${option}`]
												? 'green.500'
												: 'black.500'
										}
									/>
								</InputRightElement>
							</InputGroup>
						);
					})}
				</Flex>
			</Flex>
		</>
	);
}
