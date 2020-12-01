import firebase from 'firebase';
import axios from 'axios';

export const submitAttendance = async ({
	courseID,
	date,
	time,
	presentStudents
}) => {
	const db = firebase.firestore();
	const courses = db.collection('Courses').doc(courseID);
	let courseDetail = {};

	await courses.get().then(async (res) => {
		courseDetail = res.data()['students'];

		await courses.set({
			...res.data(),
			attendance: {
				...res.data().attendance,
				[date]: courseDetail.map((studentID) => {
					const isPresent = presentStudents.findIndex(
						({ id }) => id === studentID
					);
					return { isPresent: isPresent !== -1, studentID, time };
				})
			}
		});
	});

	const url = `http://localhost:7000/notifications/${courseID}/${date}`;

	axios.get(url);

	return courseDetail;
};
