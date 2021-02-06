import React, { useEffect, useState } from 'react';
import { getStudentsGrades } from '../../../API/quizzes/getStudentsGrades';
import Table from '../../../components/table/ReactTable';
import { Flex } from '@chakra-ui/core';
import { Spinner } from '../../../components/loaders/Spinner';
import { TableLoader } from '../../../components/loaders/TableLoader';

const tableInitialState = {
	sortBy: [
		{
			id: 'studentUniversityId',
			desc: false
		}
	]
};

const columns = [
	{
		Header: 'Student ID',
		accessor: 'studentUniversityId'
	},
	{
		Header: 'Student Name',
		accessor: 'studentName'
	},
	{
		Header: 'Student Grade',
		accessor: 'grade'
	}
];

function GradesTable({ selectedQuizGrades, tableData, setTableData }) {
	const [isLoading, setIsLoading] = useState(false);
	const isDisabled = !selectedQuizGrades;
	console.log(tableData);
	useEffect(() => {
		!isDisabled && setIsLoading(true);
		!isDisabled &&
			getStudentsGrades({ quizId: selectedQuizGrades.menuID }).then((res) => {
				setIsLoading(false);
				setTableData(res);
			});
	}, [selectedQuizGrades]);

	if (isLoading) {
		return <TableLoader />;
	}

	return tableData.length > 0 || isDisabled ? (
		<Table
			data={tableData}
			columns={columns}
			initialState={tableInitialState}
		/>
	) : (
		<Flex h='full' w='full' fontWeight='600' align='center' justify='center'>
			No students attempt the quiz
		</Flex>
	);
}

export default GradesTable;
