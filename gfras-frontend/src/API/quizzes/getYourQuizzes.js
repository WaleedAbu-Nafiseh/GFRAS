import firebase from 'firebase';

export const getYourQuizzes = async ({ courseID }) => {
	const db = firebase.firestore();
	const coursesRef = db.collection('Quizzes');

	const quizzesList = [];

	await coursesRef
		.where('courseID', '==', courseID)
		.get()
		.then((res) => {
			res.forEach((doc) => {
				quizzesList.push({ ...doc.data(), quizID: doc.id });
			});
		});
	return quizzesList;
};
