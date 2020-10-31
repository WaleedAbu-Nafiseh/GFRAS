import firebase from 'firebase';

export const getStudentsAttendance = async ({ data, selectedDate }) => {
	const db = firebase.firestore();
	const studentsRef = db.collection('students').get();
	const studentsData = [];
	await studentsRef.then((res) => {
		res.forEach(async (docs) => {
			const index =
				data.attendance &&
				data.attendance[selectedDate] &&
				data.attendance[selectedDate].findIndex(
					({ studentID }) => studentID === docs.id
				);

			if (index !== -1 && index !== undefined) {
				studentsData.push({
					...docs.data(),
					id: docs.id,
					fullName: `${docs.data().firstName} ${docs.data().lastName}`,
					isPresent: data.attendance[selectedDate][index].isPresent
				});
			}
		});
	});

	return studentsData;
};
