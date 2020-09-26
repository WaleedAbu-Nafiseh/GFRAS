import React from 'react';
import CoursesProvider from '../CoursesContext';
import { Text, Spinner } from '@chakra-ui/core';
import { QuizTemplate } from '../template/QuizTemplate';
import QuizProvider, { useQuizContext } from '../QuizContext';

function PageContainer() {
	const { isError, isLoading } = useQuizContext();

	if (isError) return <Text m='auto'>Something went wrong</Text>;
	if (isLoading) return <Spinner m='auto' />;
	if (!isError && !isLoading) return <QuizTemplate />;
	return null;
}

function Quiz() {
	return (
		<CoursesProvider>
			<QuizProvider>
				<PageContainer />
			</QuizProvider>
		</CoursesProvider>
	);
}

export default Quiz;
