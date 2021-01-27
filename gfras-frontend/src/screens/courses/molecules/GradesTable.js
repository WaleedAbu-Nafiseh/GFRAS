import React, { useEffect, useState } from 'react';
import { getStudentsGrades } from '../../../API/quizzes/getStudentsGrades';
import Table from '../../../components/table/ReactTable';
import { Flex } from '@chakra-ui/core';

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

function GradesTable({ selectedQuizGrades }) {
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		getStudentsGrades({ quizId: selectedQuizGrades.menuID }).then((res) => {
			setTableData(res);
		});
	}, [selectedQuizGrades]);

	return tableData.length > 0 ? (
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
