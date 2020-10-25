import React from 'react';
import CoursesProvider from '../CoursesContext';
import { Text, Spinner } from '@chakra-ui/core';
import { QuizTemplate } from '../template/QuizTemplate';
import QuizProvider, { useQuizContext } from '../QuizContext';
import AttendanceProvider from '../AttendanceContext';
import CourseDetailsProvider from '../CourseDetailsContext';

function PageContainer() {
	const { isError, isLoading } = useQuizContext();

	if (isError) return <Text m='auto'>Something went wrong</Text>;
	if (isLoading) return <Spinner m='auto' />;
	if (!isError && !isLoading) return <QuizTemplate />;
	return null;
}

function CourseDetails() {
	return (
		<CoursesProvider>
			<CourseDetailsProvider>
				<QuizProvider>
					<AttendanceProvider>
						<PageContainer />
					</AttendanceProvider>
				</QuizProvider>
			</CourseDetailsProvider>
		</CoursesProvider>
	);
}

export default CourseDetails;
