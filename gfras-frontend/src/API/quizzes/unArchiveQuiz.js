import firebase from 'firebase';

export const unArchiveQuiz = async ({ quizID }) => {
	const db = firebase.firestore();
	const quizRef = db.collection('Quizzes').doc(quizID);

	await quizRef.update({
		finished: false
	});
};
