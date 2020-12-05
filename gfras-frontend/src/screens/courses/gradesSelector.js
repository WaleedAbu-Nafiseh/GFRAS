import { createSelector } from 'reselect';

const getFinishedQuizzes = ({ quizzesData }) => {
	const finishedQuizzes = quizzesData.filter(
		({ finished }) => finished === true
	);

	const dropdownData = finishedQuizzes.map(({ quizTitle, quizID }) => ({
		menuID: quizID,
		title: quizTitle
	}));
	dropdownData.sort((a, b) => (a.title > b.title ? 1 : -1));

	return { finishedQuizzes, dropdownData };
};

export const finishedQuizzesSelector = createSelector(
	getFinishedQuizzes,
	(data) => data
);
