import { QuizIcon } from '../../components/icons/Quiz';
import React from 'react';
import { QuizListIcon } from '../../components/icons/QuizzesList';

export const sideMenuItems = [
	{
		title: 'Your Courses'
	},
	{ title: 'Create New Course' }
];

export const courseDetails = [
	{
		label: 'Create Quiz',
		id: 'create-quiz',
		icon: <QuizIcon boxSize='40px' />,
		canSideMenuExpand: true
	},
	{
		label: 'Quiz List',
		id: 'quiz-list',
		icon: <QuizListIcon boxSize='35px' />,
		canSideMenuExpand: false
	}
];

export const YOUR_COURSES = 'Your Courses';
export const CREATE_NEW_COURSE = 'Create New Course';
