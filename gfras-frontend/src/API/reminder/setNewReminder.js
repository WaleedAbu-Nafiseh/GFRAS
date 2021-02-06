import firebase from 'firebase';
import axios from 'axios';

export const setNewReminder = async ({
	courseID,
	description,
	courseName,
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

	//"/:courseId/:courseName/:type/:data"
	const url = `http://localhost:7000/customNotifications/${courseID}/${courseName}/taskReminder/${description}/${time}/${date}/${title}`;

	await axios.get(url);

	return result;
};
