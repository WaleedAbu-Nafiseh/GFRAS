import React from 'react';
import { Flex, FormLabel, Input, Stack, Button } from '@chakra-ui/core';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { createNewCourses } from '../../../API/createNewCourses';

export function CreateNewCourse() {
	const { register, handleSubmit, errors, watch } = useForm();
	const { formatMessage } = useIntl();
	const onSubmit = handleSubmit(({ courseName, quizzes, students }) => {
		createNewCourses({
			instructorID: localStorage.getItem('instructorID'),
			courseName,
			quizzes: [quizzes],
			students: [students]
		});
	});

	const [
		onCreateNewCourse,
		{ isSuccess, isLoading, isIdle, reset, isError }
	] = useMutation(onSubmit);

	const createNewCourseForm = [
		{
			label: formatMessage({ id: 'courses.createNewCourse.courseName' }),
			id: 'course-name',
			inputName: 'courseName'
		},
		{
			label: formatMessage({ id: 'courses.createNewCourse.quizID' }),
			id: 'quizzes-id',
			inputName: 'quizzes'
		},
		{
			label: formatMessage({ id: 'courses.createNewCourse.students' }),
			id: 'students',
			inputName: 'students'
		}
	];

	return (
		<Flex pl={10}>
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
					isDisabled={
						!watch('courseName') || !watch('quizzes') || !watch('students')
					}
					width='200px'
					borderRadius='7px'
					type='submit'
					bg='rgb(0,127,255)'
					_hover={{ bg: 'rgb(0,115,207)' }}
					color='white'
				>
					{formatMessage({ id: 'courses.createNewCourse.createNewCourseBtn' })}
				</Button>
			</form>
		</Flex>
	);
}
