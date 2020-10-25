import { createSelector } from 'reselect';

const getAttendanceTable = ({ students, courseData }, { selectedMenuItem }) => {
	const studentsCourse =
		students &&
		students.filter(({ id }) => {
			const index =
				courseData.attendance.length > 0 &&
				courseData.attendance[selectedMenuItem].findIndex(({ studentID }) => {
					return studentID === id;
				});
			return index !== -1;
		});
	return studentsCourse;
};

export const attendanceTableSelector = createSelector(
	getAttendanceTable,
	(data) => data
);
