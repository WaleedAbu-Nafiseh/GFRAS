import firebase from 'firebase';

export const getYourCourses = async () => {
	const db = firebase.firestore();
	const instructorRef = db.collection('Courses');

	const result = await instructorRef
		.where('InstructorID', '==', localStorage.getItem('instructorID'))
		.get();

	return result;
};
