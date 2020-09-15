import firebase from 'firebase';

export const createNewCourses = ({
	instructorID,
	courseName,
	quizzes,
	students
}) => {
	const db = firebase.firestore();
	const courses = db.collection('Courses');
	courses.add({ instructorID, courseName, quizzes, students });
};
