import { useQuery } from 'react-query';
import { getYourCourses } from '../API/getYourCourses';

async function getInstructorCourses() {
	const instructorCourses = await getYourCourses();
	return instructorCourses;
}

export function useShowYourCourses() {
	const { data, isError, isLoading } = useQuery([], getInstructorCourses);
	return { data, isError, isLoading };
}
