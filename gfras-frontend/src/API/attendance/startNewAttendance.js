import firebase from 'firebase';

export const startNewAttendance = async ({ courseID, date, time }) => {
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
					return { isPresent: false, studentID, time };
				})
			}
		});
	});

	return courseDetail;
};
