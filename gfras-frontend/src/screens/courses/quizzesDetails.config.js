import React from 'react';
import { QuizListIcon } from '../../components/icons/QuizzesList';
import { QuizzesGradesIcon } from '../../components/icons/Grades';
import { FolderIcon } from '../../components/icons/Folder';

export const quizzesDetailsIcons = [
	{
		label: 'Quizzes List',
		id: 'quizzes-list',
		icon: <QuizListIcon boxSize='40px' />
	},
	{
		label: 'Grades',
		id: 'quizzes-grades',
		icon: <QuizzesGradesIcon boxSize='40px' />
	},
	{
		label: 'Archived Quizzes',
		id: 'archived-quizzes',
		icon: <FolderIcon boxSize='40px' />
	}
];
