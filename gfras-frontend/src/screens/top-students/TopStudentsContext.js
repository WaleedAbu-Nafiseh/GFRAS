import React, { createContext, useContext, useMemo } from 'react';
import { useTopStudents } from './useTopStudents';

const TopStudentsContext = createContext({
	isError: true,
	isLoading: true
});

export function useTopStudentsContext() {
	const context = useContext(TopStudentsContext);
	if (!context) throw new Error('Top Students Context not found');
	return context;
}

function TopStudentsProvider({ children }) {
	const state = useTopStudents();
	const value = useMemo(() => state, [state]);

	return (
		<TopStudentsContext.Provider value={value}>
			{children}
		</TopStudentsContext.Provider>
	);
}

export default TopStudentsProvider;
