import React from 'react';
import { ReadFile } from '../../../components/csv-reader/ReadFile';
import { Button, Flex } from '@chakra-ui/core';
import { useIntl } from 'react-intl';

function AddNewStudentsCsv({
	setCSVFileData,
	CSVFileData,
	handleSubmitNewStudents,
	isLoading
}) {
	const { formatMessage } = useIntl();

	return (
		<>
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
		</>
	);
}

export default AddNewStudentsCsv;
