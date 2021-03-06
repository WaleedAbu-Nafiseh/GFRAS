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

function getOverallAttendance({ data }) {
	const noOfStudentsCourse = data.students.length;
	const noOfAttendanceTaken = data?.attendance
		? Object.keys(data.attendance).length
		: 0;
	const noOfStudentsShouldAttend = noOfStudentsCourse * noOfAttendanceTaken;

	const noOfOverallStudentsAttend = Object.keys(data.attendance).reduce(
		(acc, currAttendanceDay) => {
			let noOfAttendanceInOneDay = data.attendance[currAttendanceDay].filter(
				({ isPresent }) => isPresent
			).length;
			return acc + noOfAttendanceInOneDay;
		},
		0
	);

	return (noOfOverallStudentsAttend / noOfStudentsShouldAttend) * 100;
}

export const selectDashboardOverallAttendance = createSelector(
	getOverallAttendance,
	(data) => data
);

function getNoOfStudentAttendance({ courseAttendance, documentID }) {
	return Object.keys(courseAttendance).reduce((acc, currAttendanceDay) => {
		let noOfAttendanceInOneDay = courseAttendance[currAttendanceDay].filter(
			({ studentID, isPresent }) => studentID === documentID && isPresent
		).length;
		return acc + noOfAttendanceInOneDay;
	}, 0);
}

function getTotalAttendancePoints({ courseAttendance, documentID }) {
	return Object.keys(courseAttendance).reduce((acc, currAttendanceDay) => {
		let attendancePointInOneDay = courseAttendance[currAttendanceDay].find(
			({ studentID }) => studentID === documentID
		).attendancePoint;
		if (attendancePointInOneDay > 0) {
			console.log(
				courseAttendance[currAttendanceDay].find(
					({ studentID }) => studentID === documentID
				),
				{ attendancePointInOneDay }
			);
		}

		return acc + isNaN(attendancePointInOneDay) ? 0 : attendancePointInOneDay;
	}, 0);
}

function getStudentTotalMarks({ studentsGradesSheet, documentID }) {
	return studentsGradesSheet.reduce((acc, currStudentQuizData) => {
		if (documentID === currStudentQuizData.studentId) {
			return acc + currStudentQuizData.points;
		}

		return acc;
	}, 0);
}

function getStudentsDetailsTable({ studentsGradesSheet, data, studentsData }) {
	return data.students.reduce((acc, documentID) => {
		const student = studentsData.find(
			({ studentDocumentID }) => studentDocumentID === documentID
		);
		const tableDataStudentIndex = acc.findIndex(
			({ studentID }) => studentID === student.studentUniversityId
		);
		const studentFullName = `${student.firstName} ${student.lastName}`;
		const noOfAttendance = getNoOfStudentAttendance({
			courseAttendance: data.attendance,
			documentID
		});
		const totalQuizzesMarks = getStudentTotalMarks({
			studentsGradesSheet,
			documentID
		});
		const totalAttendancePoints = getTotalAttendancePoints({
			courseAttendance: data.attendance,
			documentID
		});
		if (totalAttendancePoints > 0) console.log({ totalAttendancePoints });
		if (totalQuizzesMarks > 0)
			console.log({
				totalQuizzesMarks,
				studentUniversityId: student.studentUniversityId
			});
		if (tableDataStudentIndex === -1) {
			return [
				...acc,
				{
					studentID: student.studentUniversityId,
					fullName: studentFullName,
					attendance: noOfAttendance,
					totalQuizzesMarks,
					totalAttendancePoints
				}
			];
		} else {
			// will not enter because tableDataStudentIndex will always be -1
			const studentTableData = {
				...acc[tableDataStudentIndex],
				attendance: acc[tableDataStudentIndex].attendance + noOfAttendance,
				totalMarks: acc[tableDataStudentIndex].totalMarks + totalQuizzesMarks
			};
			acc.splice(tableDataStudentIndex, 1);
			return [...acc, studentTableData];
		}
	}, []);
}

export const selectStudentsDetailsTable = createSelector(
	getStudentsDetailsTable,
	(data) => data
);

const getReminders = ({ reminders }) => {
	return reminders.map(({ title, date, description, time }, id) => {
		const splitDate = date.split('-');
		const splitTime = time.split(':');

		return {
			id,
			title,
			start: new Date(
				splitDate[2],
				splitDate[1] - 1,
				splitDate[0],
				splitTime[0],
				splitTime[1]
			),
			end: new Date(
				splitDate[2],
				splitDate[1] - 1,
				splitDate[0],
				splitTime[0],
				splitTime[1]
			),
			desc: description
		};
	});
};

export const selectReminders = createSelector(getReminders, (data) => data);
