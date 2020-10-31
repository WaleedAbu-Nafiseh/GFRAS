import React, { useState } from 'react';
import { ReadFile } from '../../../components/csv-reader/ReadFile';
import { Button, Flex } from '@chakra-ui/core';
import { useIntl } from 'react-intl';
import { addNewStudents } from '../../../API/students/addNewStudents';
import { useParams } from 'react-router-dom';
import {
	useFailureToast,
	useSuccessToast
} from '../../../custom-hooks/useSuccessToast';
import { BackButton } from '../atoms/BackButton';

function AddStudents() {
	const [CSVFileData, setCSVFileData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { formatMessage } = useIntl();
	const { courseID } = useParams();
	const successToast = useSuccessToast();
	const failureToast = useFailureToast();

	const handleSubmitNewStudents = async () => {
		setIsLoading(true);
		await addNewStudents({ courseID, CSVFileData })
			.then((res) => {
				document.querySelector('.csv-input').value = '';
				setIsLoading(false);
				successToast({
					title: 'Added Successfully',
					description: 'Students Added Successfully'
				});
			})
			.catch((err) => {
				document.querySelector('.csv-input').value = '';
				setIsLoading(false);
				failureToast({
					title: 'An error occurred',
					description: err.message
				});
			});
	};

	return (
		<>
			<BackButton />

			<Flex direction='column' mt='60px'>
				<ReadFile ml={0} setCSVFileData={setCSVFileData} />
				<Button
					isDisabled={CSVFileData.length === 0}
					bg='#ff5722'
					_hover={{ bg: '#fc4216' }}
					color='white'
					borderRadius='7px'
					width='200px'
					mt={10}
					onClick={handleSubmitNewStudents}
					isLoading={isLoading}
				>
					{formatMessage({ id: 'course.addNewStudents.button.label' })}
				</Button>
			</Flex>
		</>
	);
}

export default AddStudents;
