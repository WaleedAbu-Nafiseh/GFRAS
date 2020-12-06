import firebase from 'firebase';

export const getStudentsGrades = async ({ quizId }) => {
	const db = firebase.firestore();
	const gradeSheetRef = db.collection('GradeSheet');
	const studentsTableData = [];

	await gradeSheetRef
		.where('quizId', '==', quizId)
		.get()
		.then(async (res) => {
			for (const doc of res.docs) {
				const { points: grade } = doc.data();
				await db
					.collection('students')
					.doc(doc.data().studentId)
					.get()
					.then((studentsRes) => {
						console.log(studentsRes.data());
						const {
							firstName,
							lastName,
							studentUniversityId
						} = studentsRes.data();
						studentsTableData.push({
							studentName: `${firstName} ${lastName}`,
							studentUniversityId,
							grade
						});
					});
			}
		});

	return studentsTableData;
};
