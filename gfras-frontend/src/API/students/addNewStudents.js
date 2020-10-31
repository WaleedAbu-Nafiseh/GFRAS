import firebase from 'firebase';

export const addNewStudents = async ({ CSVFileData, courseID }) => {
	const db = firebase.firestore();
	const courses = db.collection('Courses').doc(courseID);
	const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
	const studentsRef = db.collection('students');
	const studentsDocumentID = await [];

	return await courses.get().then((res) => {
		CSVFileData &&
			CSVFileData.map(async (student, index) => {
				await studentsRef
					.where('studentUniversityID', '==', `${student.studentid}`)
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach(async function (doc) {
							if (!doc.data().Courses.includes(courseID)) {
								const newData = doc.data();
								newData['Courses'] = [...newData['Courses'], res.id];
								studentsDocumentID.push(doc.id);
								await studentsRef.doc(doc.id).set({ ...newData });
							}
						});
					})
					.then(async () => {
						if (index === CSVFileData.length - 1) {
							if (studentsDocumentID.length > 0) {
								await courses.update({
									students: arrayUnion(...studentsDocumentID)
								});
							}
						}
					});
			});
	});
};
