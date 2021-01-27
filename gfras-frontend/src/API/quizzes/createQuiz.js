import firebase from 'firebase';
import axios from 'axios';
export const createQuiz = async ({
	questionAndOptions,
	courseID,
	quizTitle,
	quizStartDate
}) => {
	const db = firebase.firestore();
	const quizzes = db.collection('Quizzes');

	const questions = questionAndOptions.map((questionAndOptions) => {
		delete questionAndOptions.correctAnswerKey;
		return questionAndOptions;
	});
	const result = await quizzes.add({
		questions,
		finished: false,
		isStarted: false,
		courseID,
		quizTitle,
		startDate: quizStartDate
	});
	const courses = db.collection('Courses').doc(courseID);

	await courses.get().then(async (doc) => {
		if (doc.exists) {
			let quizzes = [...doc.data().quizzes, result.id];
			await courses.set({
				...doc.data(),
				quizzes: [...quizzes]
			});
		}
	});
	const url = `http://localhost:7000/reminder/quiz/${courseID}`;

	await axios.get(url);
	return result;
};
