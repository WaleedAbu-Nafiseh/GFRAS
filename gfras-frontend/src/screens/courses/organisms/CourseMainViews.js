import React from 'react';
import { YourCourse, CreateNewCourse } from '../molecules';
import { YOUR_COURSES } from '../courses.config';

export function CourseMainViews({
	activeSideMenuButton,
	setActiveSideMenuButton
}) {
	return activeSideMenuButton === YOUR_COURSES ? (
		<YourCourse setActiveSideMenuButton={setActiveSideMenuButton} />
	) : (
		<CreateNewCourse />
	);
}
