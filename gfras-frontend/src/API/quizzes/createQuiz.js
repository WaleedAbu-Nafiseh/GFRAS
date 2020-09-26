import firebase from 'firebase';

export const createQuiz = async ({
	questionAndOptions,
	courseID,
	quizTitle
}) => {
	const db = firebase.firestore();
	const quizzes = db.collection('Quizzes');

	const questions = questionAndOptions.map((questionAndOptions) => {
		delete questionAndOptions.correctAnswerKey;
		return questionAndOptions;
	});
	const result = await quizzes.add({
		questions,
		isStarted: false,
		courseID,
		quizTitle
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
	return result;
};
