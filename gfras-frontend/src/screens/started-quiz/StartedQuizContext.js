import React, { createContext, useContext, useMemo } from 'react';
import { useStartedQuiz } from './useStartedQuiz';

const StartedQuizContext = createContext({
	isError: true,
	isLoading: true
});

export function useStartedQuizContext() {
	const context = useContext(StartedQuizContext);
	if (!context) throw new Error('Started Quiz Context not found');
	return context;
}

function StartedQuizProvider({ children }) {
	const state = useStartedQuiz();
	const value = useMemo(() => state, [state]);

	return (
		<StartedQuizContext.Provider value={value}>
			{children}
		</StartedQuizContext.Provider>
	);
}

export default StartedQuizProvider;
