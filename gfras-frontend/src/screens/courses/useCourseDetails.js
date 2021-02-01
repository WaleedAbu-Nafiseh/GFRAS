import { useState } from 'react';

export function useCourseDetails() {
	const [isSideMenuExpanded, setIsSideMenuExpanded] = useState(false);
	const [selectedCourseDetail, setSelectedCourseDetail] = useState('dashboard');

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
