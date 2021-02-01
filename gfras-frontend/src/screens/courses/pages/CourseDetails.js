import React from 'react';
import CoursesProvider from '../CoursesContext';
import { Text } from '@chakra-ui/core';
import { QuizTemplate } from '../template/QuizTemplate';
import QuizProvider, { useQuizContext } from '../QuizContext';
import AttendanceProvider from '../AttendanceContext';
import CourseDetailsProvider from '../CourseDetailsContext';
import { Spinner } from '../../../components/loaders/Spinner';

function PageContainer() {
	const { isError, isLoading } = useQuizContext();

	if (isError) return <Text m='auto'>Something went wrong</Text>;
	if (isLoading) return <Spinner />;
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
