import { useQuery } from 'react-query';
import { getYourCourses } from '../../API/courses/getYourCourses';
import { useState } from 'react';

async function getInstructorCourses() {
	const instructorCourses = await getYourCourses();
	return instructorCourses;
}

export function useShowYourCourses() {
	const { data, isError, isLoading } = useQuery([], getInstructorCourses);
	const [selectedCourseDetail, setSelectedCourseDetail] = useState(
		'create-quiz'
	);

	return {
		data,
		isError,
		isLoading,
		setSelectedCourseDetail,
		selectedCourseDetail
	};
}
