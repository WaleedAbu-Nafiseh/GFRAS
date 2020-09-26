import firebase from 'firebase';

export const createNewCourses = async ({
	instructorID,
	courseName,
	quizzes,
	students = []
}) => {
	const db = firebase.firestore();
	const courses = db.collection('Courses');
	await courses.add({
		InstructorID: instructorID,
		courseName,
		quizzes,
		students
	});

	return courses;
};
