import React, { createContext, useContext, useMemo } from 'react';
import { useQuiz } from './useQuiz';

const QuizContext = createContext({
	isError: true,
	isLoading: true
});

export function useQuizContext() {
	const context = useContext(QuizContext);
	if (!context) throw new Error('Quiz Context not found');
	return context;
}

function QuizProvider({ children }) {
	const state = useQuiz();
	const value = useMemo(() => state, [state]);

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export default QuizProvider;
