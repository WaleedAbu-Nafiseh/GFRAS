import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getQuestion } from '../../API/quizzes/getQuestion';

async function getData(_apiKey, params) {
	const question = await getQuestion(params);
	return question;
}

export function useStartedQuiz() {
	const { quizID } = useParams();
	const [questionNumber, setQuestionNumber] = useState(0);

	const { data, isError, isLoading } = useQuery(
		['quizzes', { quizID, questionNumber }],
		getData
	);

	return {
		questionNumber,
		setQuestionNumber,
		isError,
		isLoading,
		data
	};
}
