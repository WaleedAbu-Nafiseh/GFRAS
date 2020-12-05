import firebase from 'firebase';

export const getStudentsMarks = async ({ quizID }) => {
	const db = firebase.firestore();
	const gradeSheetRef = db.collection('GradeSheet');
	let result = undefined;

	await gradeSheetRef
		.where('quizId', '==', quizID)
		.get()
		.then((res) => {
			result = res;
		});

	return result;
};
