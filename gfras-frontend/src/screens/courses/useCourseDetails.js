import { useState } from 'react';

export function useCourseDetails() {
	const [isSideMenuExpanded, setIsSideMenuExpanded] = useState(true);
	const [selectedCourseDetail, setSelectedCourseDetail] = useState(
		'create-quiz'
	);

	const [selectedQuizzesDetails, setSelectedQuizzesDetails] = useState(
		'quizzes-list'
	);

	return {
		isSideMenuExpanded,
		setIsSideMenuExpanded,
		selectedCourseDetail,
		setSelectedCourseDetail,
		selectedQuizzesDetails,
		setSelectedQuizzesDetails
	};
}
