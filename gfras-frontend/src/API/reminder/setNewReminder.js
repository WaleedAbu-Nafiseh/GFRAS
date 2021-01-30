import firebase from 'firebase';

export const setNewReminder = async ({
	courseID,
	description,
	title,
	date,
	time
}) => {
	const db = firebase.firestore();
	const reminderRef = db.collection('Reminder');

	const result = await reminderRef.add({
		courseID,
		description,
		title,
		date,
		time
	});

	return result;
};
