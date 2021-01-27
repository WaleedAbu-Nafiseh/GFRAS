import firebase from 'firebase';

export const getStudentsData = async ({ studentsID }) => {
	const db = firebase.firestore();
	const studentsRef = db.collection('students');
	let studentsData = [];

	for (const studentID of studentsID) {
		await studentsRef
			.doc(studentID)
			.get()
			.then((res) => {
				studentsData.push({ ...res.data(), studentDocumentID: studentID });
			});
	}
	return studentsData;
};
