import firebase from 'firebase';

export const getStudentsGradeSheet = async ({ courseID }) => {
	const db = firebase.firestore();
	const gradeSheetRef = db.collection('GradeSheet');
	let studentsGrades = [];

	await gradeSheetRef
		.where('courseID', '==', courseID)
		.get()
		.then((res) => {
			res.forEach((doc) => {
				studentsGrades.push(doc.data());
			});
		});

	return studentsGrades;
};
