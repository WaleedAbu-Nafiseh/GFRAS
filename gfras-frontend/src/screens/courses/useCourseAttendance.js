import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCourseAttendances } from '../../API/courses/getCourseAttendances';
import { useState } from 'react';

async function getData(_apiKey, params) {
	return await getCourseAttendances(params);
}

export function useCourseAttendance() {
	const { courseID } = useParams();
	const { data, isError, isLoading, refetch: refetchAttendanceList } = useQuery(
		['attendance', { courseID }],
		getData
	);
	const [studentsAttendance, setStudentsAttendance] = useState(() => []);
	return {
		data,
		isError,
		isLoading,
		refetchAttendanceList,
		studentsAttendance,
		setStudentsAttendance
	};
}
