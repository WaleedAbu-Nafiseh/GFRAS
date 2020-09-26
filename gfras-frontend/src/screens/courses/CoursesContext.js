import React, { createContext, useContext, useMemo } from 'react';
import { useShowYourCourses } from './useShowYourCourses';

const CoursesContext = createContext({ isError: true, isLoading: true });

export function useCoursesContext() {
	const context = useContext(CoursesContext);
	if (!context) throw new Error('Courses Context not found');
	return context;
}

function CoursesProvider({ children }) {
	const state = useShowYourCourses();
	const value = useMemo(() => state, [state]);

	return (
		<CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
	);
}

export default CoursesProvider;
