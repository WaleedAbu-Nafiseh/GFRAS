import { useState } from 'react';

export function useCourseDetails() {
	const [isSideMenuExpanded, setIsSideMenuExpanded] = useState(true);
	const [selectedCourseDetail, setSelectedCourseDetail] = useState(
		'create-quiz'
	);

	return {
		isSideMenuExpanded,
		setIsSideMenuExpanded,
		selectedCourseDetail,
		setSelectedCourseDetail
	};
}
