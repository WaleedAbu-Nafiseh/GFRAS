import React, { useState } from 'react';
import { ReadFile } from '../../../components/csv-reader/ReadFile';
import { Button, Flex, Switch, FormControl, FormLabel } from '@chakra-ui/core';
import { useIntl } from 'react-intl';
import { addNewStudents } from '../../../API/students/addNewStudents';
import { useParams } from 'react-router-dom';
import {
	useFailureToast,
	useSuccessToast
} from '../../../custom-hooks/useSuccessToast';
import { BackButton } from '../atoms/BackButton';
import AddNewStudentsCsv from '../molecules/AddNewStudentsCSV';

function AddStudents() {
	const [isAddManually, setIsAddManually] = useState(false);
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
			{/*<BackButton />*/}

			<Flex direction='column' mt='60px' ml='90px'>
				<FormControl display='flex' alignItems='center'>
					<FormLabel fontSize='20px'>Add Manually</FormLabel>
					<Switch
						defaultChecked={false}
						onChange={() => setIsAddManually((prevState) => !prevState)}
						isChecked={isAddManually}
						border='none'
						outline='none'
						colorScheme='green'
						size='lg'
					/>
				</FormControl>
				<AddNewStudentsCsv
					isLoading={isLoading}
					CSVFileData={CSVFileData}
					handleSubmitNewStudents={handleSubmitNewStudents}
					setCSVFileData={setCSVFileData}
				/>
			</Flex>
		</>
	);
}

export default AddStudents;
