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
	const [compareStudentsAttendance, setCompareStudentsAttendance] = useState(
		[]
	); //to compare white studentsAttendance object for disabling submittion
	const [changesOnOldValues, setChangesOnOldValues] = useState([]);
	return {
		data,
		isError,
		isLoading,
		setCompareStudentsAttendance,
		compareStudentsAttendance,
		refetchAttendanceList,
		studentsAttendance,
		setStudentsAttendance,
		changesOnOldValues,
		setChangesOnOldValues
	};
}
