import firebase from 'firebase';
import axios from 'axios';

export const submitAttendance = async ({
	courseID,
	date,
	time,
	presentStudents,
	comparePresentStudents,
	attendancePoint
}) => {
	const db = firebase.firestore();
	const courses = db.collection('Courses').doc(courseID);
	let courseDetail = {};
	const newTakenStudentsAttendance = presentStudents.filter(({ id }) => {
		return comparePresentStudents?.some(({ id: compareID }) => {
			return compareID === id;
		});
	});

	await courses.get().then(async (res) => {
		courseDetail = res.data()['students'];

		await courses.set({
			...res.data(),
			attendance: {
				...res.data().attendance,
				[date]: courseDetail.map((studentID) => {
					console.log({ date }, res.data()['attendance']);
					const oldStudent = res
						.data()
						['attendance'][date].find(
							({ studentID: responseStudentID, isPresent }) =>
								responseStudentID === studentID && isPresent
						);
					const isPresent = presentStudents.findIndex(
						({ id }) => id === studentID
					);
					const isFirstTime = newTakenStudentsAttendance.findIndex(
						({ id }) => id === studentID
					); // isFirstTime the attendance taken for the student

					return {
						isPresent: isPresent !== -1,
						studentID,
						time: isFirstTime === -1 && oldStudent ? oldStudent.time : time,
						attendancePoint:
							isFirstTime === -1 && oldStudent
								? +oldStudent.attendancePoint
								: isPresent !== -1
								? +attendancePoint
								: 0
					};
				})
			}
		});
	});

	const url = `http://localhost:7000/notifications/${courseID}/${date}`;

	axios.get(url);

	return courseDetail;
};
