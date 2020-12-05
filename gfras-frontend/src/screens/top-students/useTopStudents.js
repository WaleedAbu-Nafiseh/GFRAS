import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getStudentsMarks } from '../../API/top-students/getStudentsQuizMarks';
import { getStudentsMarksResultFromStudentsCollection } from '../../API/top-students/getResultTopStudents';

async function getData(_apiKey, params) {
	const question = await getStudentsMarks(params);
	const studentsData = await getStudentsMarksResultFromStudentsCollection({
		result: question
	});
	return studentsData;
}

export function useTopStudents() {
	const { quizID } = useParams();

	const { data, isError, isLoading } = useQuery(
		['top-students', { quizID }],
		getData
	);

	return {
		isError,
		isLoading,
		data
	};
}
