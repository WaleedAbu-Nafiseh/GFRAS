import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import CSVReader from 'react-csv-reader';
import { useIntl } from 'react-intl';

const papaparseOptions = {
	header: true,
	dynamicTyping: true,
	skipEmptyLines: true,
	transformHeader: (header) => header.toLowerCase().replace(/\W/g, '')
};

export const ReadFile = ({ setCSVFileData, isOptional = false, ...rest }) => {
	const { formatMessage } = useIntl();

	const handleForce = (data, fileInfo) => {
		setCSVFileData(data);
	};

	return (
		<Flex direction='column' fontWeight={500} ml='50px' mt='22px' {...rest}>
			<Text color='rgba(18,18,18,0.38)'>
				<Flex w='full' align='center'>
					{formatMessage({ id: 'course.createNewCourse.addStudents' })}
					<Text fontSize='14px' ml='10px'>
						{isOptional && '(optional field)'}
					</Text>
				</Flex>
			</Text>
			<Flex direction='column' marginTop='7px'>
				<CSVReader
					inputStyle={{
						padding: '5px',
						display: 'block',
						border: '1px solid #ccc',
						borderRadius: '5px'
					}}
					onFileLoaded={handleForce}
					parserOptions={papaparseOptions}
				/>
				<Text fontSize={12} color='red.500'>
					{formatMessage({ id: 'course.createNewCourse.csvFilesOnly' })}
				</Text>
			</Flex>
		</Flex>
	);
};
