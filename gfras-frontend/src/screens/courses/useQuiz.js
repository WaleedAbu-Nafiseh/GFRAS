import { useQuery } from 'react-query';
import { getYourQuizzes } from '../../API/quizzes/getYourQuizzes';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

async function getData(_apiKey, params) {
	const courseQuizzes = await getYourQuizzes(params);
	return courseQuizzes;
}

export function useQuiz() {
	const { courseID } = useParams();
	const { data, isError, isLoading, refetch: refetchNewQuizCreated } = useQuery(
		['quizzes', { courseID }],
		getData
	);
	const [noOfSelectedQuestions, setNoOfSelectedQuestions] = useState(1);
	const [selectedQuestion, setSelectedQuestion] = useState(0);
	const [deletedQuestion, setDeletedQuestion] = useState(-1);
	const [quizTitle, setQuizTitle] = useState('');
	const [questionAndOptions, setQuestionAndOptions] = useState([]);
	const [isValidSubmitQuiz, setIsValidSubmitQuiz] = useState(false);

	return {
		data,
		isError,
		isLoading,
		selectedQuestion,
		setNoOfSelectedQuestions,
		noOfSelectedQuestions,
		setSelectedQuestion,
		setDeletedQuestion,
		deletedQuestion,
		setQuizTitle,
		quizTitle,
		questionAndOptions,
		setQuestionAndOptions,
		isValidSubmitQuiz,
		setIsValidSubmitQuiz,
		refetchNewQuizCreated
	};
}
