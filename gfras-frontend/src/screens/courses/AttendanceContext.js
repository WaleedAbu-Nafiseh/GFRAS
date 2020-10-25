import React, { createContext, useContext, useMemo } from 'react';
import { useCourseAttendance } from './useCourseAttendance';

const AttendanceContext = createContext({ isError: true, isLoading: true });

export function useAttendanceContext() {
	const context = useContext(AttendanceContext);
	if (!context) throw new Error('Attendance Context not found');
	return context;
}

function AttendanceProvider({ children }) {
	const state = useCourseAttendance();
	const value = useMemo(() => state, [state]);

	return (
		<AttendanceContext.Provider value={value}>
			{children}
		</AttendanceContext.Provider>
	);
}

export default AttendanceProvider;
