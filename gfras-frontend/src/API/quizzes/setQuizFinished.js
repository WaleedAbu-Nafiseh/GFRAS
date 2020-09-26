import firebase from 'firebase';

export const setQuizFinished = async ({ quizID }) => {
	const db = firebase.firestore();
	const quizRef = db.collection('Quizzes').doc(quizID);

	await quizRef.get().then(async (res) => {
		const quizzesData = res.data();

		const lastQuestion = quizzesData.questions.length;
		quizzesData.questions[lastQuestion - 1].showQuestion = false;
		await db.collection('Quizzes').doc(quizID).update({
			isStarted: false,
			questions: quizzesData.questions
		});
	});
};
