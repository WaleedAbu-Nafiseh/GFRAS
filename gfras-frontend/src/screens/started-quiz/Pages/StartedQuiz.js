import React from 'react';
import StartedQuizProvider, {
	useStartedQuizContext
} from '../StartedQuizContext';
import { Text, Spinner } from '@chakra-ui/core';
import { StartedQuizTemplate } from '../Template/StartedQuizTemplate';

function PageContainer() {
	const { isLoading, isError } = useStartedQuizContext();

	if (isError) return <Text>Something went wrong</Text>;
	if (isLoading) return <Spinner m='auto' />;
	if (!isError && !isLoading) return <StartedQuizTemplate />;
}

const StartedQuiz = () => {
	return (
		<StartedQuizProvider>
			<PageContainer />
		</StartedQuizProvider>
	);
};

export default StartedQuiz;
