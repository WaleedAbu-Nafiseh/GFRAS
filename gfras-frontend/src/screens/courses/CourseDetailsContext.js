import React, { createContext, useContext, useMemo } from 'react';
import { useCourseDetails } from './useCourseDetails';

const CourseDetailsContext = createContext({ isError: true, isLoading: true });

export function useCourseDetailsContext() {
	const context = useContext(CourseDetailsContext);
	if (!context) throw new Error('Attendance Context not found');
	return context;
}

function CourseDetailsProvider({ children }) {
	const state = useCourseDetails();
	const value = useMemo(() => state, [state]);

	return (
		<CourseDetailsContext.Provider value={value}>
			{children}
		</CourseDetailsContext.Provider>
	);
}

export default CourseDetailsProvider;
