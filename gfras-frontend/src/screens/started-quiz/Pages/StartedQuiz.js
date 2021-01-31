import React from 'react';
import StartedQuizProvider, {
	useStartedQuizContext
} from '../StartedQuizContext';
import { Text } from '@chakra-ui/core';
import { StartedQuizTemplate } from '../Template/StartedQuizTemplate';
import { Spinner } from '../../../components/loaders/Spinner';

function PageContainer() {
	const { isLoading, isError } = useStartedQuizContext();

	if (isError) return <Text>Something went wrong</Text>;
	if (isLoading) return <Spinner />;
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
