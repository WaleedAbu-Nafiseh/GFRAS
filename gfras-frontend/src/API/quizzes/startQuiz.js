import firebase from 'firebase';

export const startQuiz = async ({ docID }) => {
	const db = firebase.firestore();
	db.collection('Quizzes').doc(docID).update({
		isStarted: true
	});
};
