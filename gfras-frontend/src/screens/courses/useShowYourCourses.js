import { useQuery } from 'react-query';
import { getYourCourses } from '../../API/courses/getYourCourses';

async function getInstructorCourses() {
	const instructorCourses = await getYourCourses();
	return instructorCourses;
}

export function useShowYourCourses() {
	const {
		data,
		isError,
		isLoading,
		refetch: refetchCreateNewCourse
	} = useQuery([], getInstructorCourses);

	return {
		data,
		isError,
		isLoading,
		refetchCreateNewCourse
	};
}
