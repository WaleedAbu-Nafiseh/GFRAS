import React, { useEffect, useState } from 'react';
import { Flex, Heading } from '@chakra-ui/core';
import { useAttendanceContext } from '../AttendanceContext';
import { getStudentsGradeSheet } from '../../../API/students/getStudentsGradeSheet';
import { useParams } from 'react-router-dom';
import { selectStudentsDetailsTable } from '../selectors';
import { getStudentsData } from '../../../API/students/getStudentsData';
import Table from '../../../components/table/ReactTable';
import { TableLoader } from '../../../components/loaders/TableLoader';
import { useIntl } from 'react-intl';
import {
	CardContainer,
	InfoButtons
} from '../../../components/chart-wrapper/ChartWrapper';

const tableInitialState = {
	sortBy: [
		{
			id: 'studentID',
			desc: false
		}
	]
};

const columns = [
	{
		Header: 'Student ID',
		accessor: 'studentID'
	},
	{
		Header: 'Student Name',
		accessor: 'fullName'
	},
	{
		Header: 'Attendance',
		accessor: 'attendance'
	},
	{
		Header: 'Total Marks',
		accessor: 'totalMarks'
	}
];

function StudentsDetailsTable() {
	const { formatMessage: f } = useIntl();
	const { data } = useAttendanceContext();
	const [studentsGradesSheet, setStudentsSheet] = useState();
	const [studentsData, setStudentsData] = useState();
	const { courseID } = useParams();

	useEffect(() => {
		getStudentsGradeSheet({ courseID }).then((r) => {
			setStudentsSheet(r);
		});
		getStudentsData({ studentsID: data.students }).then((res) => {
			setStudentsData(res);
		});
	}, [setStudentsSheet]);
	const tableData =
		studentsGradesSheet &&
		data &&
		studentsData &&
		selectStudentsDetailsTable({ studentsGradesSheet, data, studentsData });

	return (
		<Flex w='full' h='full' mt='20px' direction='column'>
			<Flex w='full' h='full' align='center'>
				<Heading as='h3' mr='10px' fontSize='22px' fontWeight='700' isTruncated>
					{f({
						id: 'course.courseDetails.dashboard.table.studentsDetails.title'
					})}
				</Heading>
				<InfoButtons
					ToolTipText={f({
						id: 'course.courseDetails.dashboard.table.studentsDetails.tooltip'
					})}
				/>
			</Flex>
			<CardContainer
				status={tableData ? 'success' : 'loading'}
				Loader={<TableLoader />}
			>
				<Table
					data={tableData}
					columns={columns}
					initialState={tableInitialState}
				/>
			</CardContainer>
		</Flex>
	);
}

export default StudentsDetailsTable;
