import firebase from 'firebase';

export const createNewCourses = async ({
	instructorID,
	courseName,
	quizzes,
	CSVFileData,
	students = []
}) => {
	const db = firebase.firestore();
	const courses = db.collection('Courses');
	const studentsRef = db.collection('students');
	const studentsDocumentID = await [];
	let courseDocumentID = '';

	await courses
		.add({
			InstructorID: instructorID,
			courseName,
			quizzes,
			students
		})
		.then((res) => {
			courseDocumentID = res.id;
			CSVFileData &&
				CSVFileData.map(async (student) => {
					await studentsRef
						.where('studentUniversityId', '==', `${student.studentid}`)
						.get()
						.then((querySnapshot) => {
							querySnapshot.forEach(async function (doc) {
								const newData = doc.data();
								newData['Courses'] = [...newData['Courses'], res.id];
								studentsDocumentID.push(doc.id);
								await studentsRef.doc(doc.id).set({ ...newData });
							});
						});
				});
		});

	await courses
		.doc(courseDocumentID)
		.get()
		.then(async (res) => {
			await courses.doc(courseDocumentID).set({
				...res.data(),
				students: [...studentsDocumentID]
			});
		});

	return courses;
};
