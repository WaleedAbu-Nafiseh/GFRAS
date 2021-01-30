import React, { useEffect } from 'react';
import { Checkbox, Spinner } from '@chakra-ui/core';
import Table from '../../../components/table/ReactTable';
import { useAttendanceContext } from '../AttendanceContext';
import { getStudentsAttendance } from '../../../API/students/getStudentsAttendance';
import { useQuery } from 'react-query';
import { attendanceTableSelector } from '../selectors';
import { CardContainer } from '../../../components/chart-wrapper/ChartWrapper';
import { TableLoader } from '../../../components/loaders/TableLoader';

const tableInitialState = {
	sortBy: [
		{
			id: 'fullName',
			desc: false
		}
	]
};

export const columns = [
	{
		Header: 'Student Name',
		accessor: 'fullName'
	},
	{
		Header: 'Present',
		accessor: 'isPresent',
		Cell: (cell) => {
			const {
				studentsAttendance,
				setStudentsAttendance
			} = useAttendanceContext();

			const isPresent = studentsAttendance.findIndex(({ id }) => {
				return cell.row.values.id === id;
			});

			useEffect(() => {
				if (cell.row.values.isPresent && isPresent === -1) {
					setStudentsAttendance([
						...studentsAttendance,
						{
							studentName: cell.row.values.fullName,
							id: cell.row.values.id
						}
					]);
				}
			}, [cell.row, isPresent, setStudentsAttendance, studentsAttendance]);

			return (
				<Checkbox
					size='sm'
					colorScheme='green'
					border='1px solid black'
					isChecked={!cell.row.values.isPresent ? isPresent !== -1 : true}
					onChange={() => {
						if (!cell.row.values.isPresent) {
							if (isPresent !== -1) {
								setStudentsAttendance(
									studentsAttendance.filter(
										({ id }) => cell.row.values.id !== id
									)
								);
							} else {
								setStudentsAttendance([
									...studentsAttendance,
									{
										studentName: cell.row.values.fullName,
										id: cell.row.values.id
									}
								]);
							}
						}
					}}
				/>
			);
		},
		disableSortBy: true
	},
	{
		Header: 'Student ID',
		accessor: 'id',
		isVisible: false
	}
];

async function getData(_apiKey, params) {
	return await getStudentsAttendance(params);
}

export const AttendanceTable = ({ selectedMenuItem }) => {
	const { data, setStudentsAttendance } = useAttendanceContext();
	const { data: students } = useQuery(
		['attendance-formatted-data', { data, selectedDate: selectedMenuItem }],
		getData
	);

	useEffect(() => {
		if (students && students.length > 0) {
			const presentStudents = Object.assign(
				{},
				...students.map(({ fullName, id, isPresent }) => {
					if (isPresent) {
						return {
							studentName: fullName,
							id
						};
					}
				})
			);
			setStudentsAttendance([presentStudents]);
		}
	}, [selectedMenuItem, students]);
	const tableData =
		students &&
		attendanceTableSelector(
			{ students, courseData: data },
			{
				selectedMenuItem
			}
		);

	return (
		<CardContainer
			status={tableData ? 'success' : 'loading'}
			Loader={<TableLoader />}
		>
			<Table
				columns={columns}
				data={tableData}
				initialState={tableInitialState}
			/>
		</CardContainer>
	);
};
