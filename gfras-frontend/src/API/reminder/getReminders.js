import firebase from 'firebase';

export const getReminders = async ({ courseID }) => {
	const db = firebase.firestore();
	const reminderRef = db.collection('Reminder');

	const remindersList = [];

	await reminderRef
		.where('courseID', '==', courseID)
		.get()
		.then((res) => {
			res.forEach((doc) => {
				remindersList.push({ ...doc.data(), documentID: doc.id });
			});
		});
	return remindersList;
};
