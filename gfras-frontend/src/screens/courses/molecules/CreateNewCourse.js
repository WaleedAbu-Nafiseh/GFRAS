import React, { useState } from 'react';
import { Flex, FormLabel, Input, Stack, Button } from '@chakra-ui/core';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { createNewCourses } from '../../../API/courses/createNewCourses';
import { useCoursesContext } from '../CoursesContext';
import { ReadFile } from '../../../components/csv-reader/ReadFile';
import {
	useFailureToast,
	useSuccessToast
} from '../../../custom-hooks/useSuccessToast';

export function CreateNewCourse() {
	const { register, handleSubmit, watch, reset } = useForm();
	const [CSVFileData, setCSVFileData] = useState();
	const { formatMessage } = useIntl();
	const [isLoading, setIsLoading] = useState(false);
	const { refetchCreateNewCourse } = useCoursesContext();
	const successToast = useSuccessToast();
	const failureToast = useFailureToast();

	const resetStates = () => {
		setIsLoading(false);
		refetchCreateNewCourse();
		setCSVFileData('');
		reset();
	};

	const onSubmit = handleSubmit(
		({ courseName, quizzes = [], students = [] }) => {
			setIsLoading(true);
			createNewCourses({
				instructorID: localStorage.getItem('instructorID'),
				courseName,
				quizzes: [...quizzes],
				students: [...students],
				CSVFileData
			})
				.then((res) => {
					resetStates();
					successToast({
						title: formatMessage({
							id: 'course.toastMessage.createNewCourse.courseCreated.title'
						}),
						description: formatMessage(
							{
								id:
									'course.toastMessage.createNewCourse.courseCreated.description'
							},
							{
								courseName
							}
						)
					});
					document.querySelector('.csv-input').value = '';
				})
				.catch((err) => {
					resetStates();
					failureToast({
						title: formatMessage({
							id: 'toastMessage.errorOccurred.title'
						}),
						description: err.message
					});
				});
		}
	);

	const createNewCourseForm = [
		{
			label: formatMessage({ id: 'courses.createNewCourse.courseName' }),
			id: 'course-name',
			inputName: 'courseName'
		}
	];

	return (
		<Flex pl={10} w='full'>
			<form onSubmit={onSubmit}>
				<Stack direction={['column', 'row']} spacing='150px' mt={'25px'}>
					{createNewCourseForm.map(({ label, id, inputName }) => {
						return (
							<Flex direction='column' key={`${label}-${id}`}>
								<FormLabel color={'rgba(18,18,18,0.38)'}>{label}</FormLabel>
								<Input
									type='text'
									id={id}
									name={inputName}
									borderRadius='7px'
									ref={register({ required: true })}
								/>
							</Flex>
						);
					})}
				</Stack>
				<Button
					mt={10}
					w='full'
					isDisabled={!watch('courseName')}
					width='200px'
					isLoading={isLoading}
					borderRadius='7px'
					type='submit'
					bg='#ff5722'
					_hover={{ bg: '#fc4216' }}
					color='white'
				>
					{formatMessage({ id: 'courses.createNewCourse.createNewCourseBtn' })}
				</Button>
			</form>
			<ReadFile setCSVFileData={setCSVFileData} />
		</Flex>
	);
}
