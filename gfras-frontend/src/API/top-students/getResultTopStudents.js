import firebase from 'firebase';

export const getStudentsMarksResultFromStudentsCollection = async ({
	result
}) => {
	const db = firebase.firestore();
	const studentsRef = db.collection('students');
	const studentsData = [];

	async function process_tasks() {
		for (const doc of result.docs) {
			const points = doc.data().points;
			await studentsRef
				.doc(doc.data().studentId)
				.get()
				.then((res) => {
					studentsData.push({ ...res.data(), points });
				});
		}
	}

	try {
		await process_tasks().then(() => {});
		return studentsData;
	} catch (err) {
		console.log('Error getting documents', err);
	}
};
