import firebase from 'firebase';

export const getQuestion = async ({ quizID, questionNumber }) => {
	const db = firebase.firestore();
	const quizRef = db.collection('Quizzes').doc(quizID);
	let question = {};
	let noOfQuestions = 1;

	await quizRef.get().then(async (res) => {
		const quizzesData = res.data();
		if (questionNumber > 0) {
			quizzesData.questions[questionNumber - 1].showQuestion = false;
		}
		quizzesData.questions[questionNumber].showQuestion = true;
		question = quizzesData.questions[questionNumber];
		noOfQuestions = quizzesData.questions.length;
		await db.collection('Quizzes').doc(quizID).update({
			questions: quizzesData.questions
		});
	});
	return { questionData: question, noOfQuestions };
};
