import firebase from 'firebase';

export const startQuiz = async ({ docID }) => {
	const db = firebase.firestore();
	const data = db.collection('Quizzes').doc(docID).update({
		isStarted: true
	});
	return data;
};
