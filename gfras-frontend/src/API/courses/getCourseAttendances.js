import firebase from 'firebase';

export const getCourseAttendances = async ({ courseID }) => {
	const db = firebase.firestore();
	const courses = db.collection('Courses').doc(courseID);
	let courseDetail = {};

	await courses.get().then((res) => {
		courseDetail = res.data();
	});

	return courseDetail;
};
