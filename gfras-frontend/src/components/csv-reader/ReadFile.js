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

export const ReadFile = ({ setCSVFileData, ...rest }) => {
	const { formatMessage } = useIntl();

	const handleForce = (data, fileInfo) => {
		setCSVFileData(data);
	};

	return (
		<Flex direction='column' fontWeight={500} ml='50px' mt='22px' {...rest}>
			<Text color='rgba(18,18,18,0.38)'>
				{formatMessage({ id: 'course.createNewCourse.addStudents' })}
			</Text>
			<Flex direction='column' marginTop='7px'>
				<CSVReader
					onError={(err) => console.log(err)}
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
