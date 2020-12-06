import { createSelector } from 'reselect';

const getTopStudent = ({ students }) => {
	return students.map(
		({ studentUniversityId, firstName, lastName, points }) => ({
			id: studentUniversityId,
			value: points,
			studentName: `${firstName} ${lastName}`
		})
	);
};

export const topStudentsSelector = createSelector(
	getTopStudent,
	(data) => data
);
