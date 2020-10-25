import React, { useEffect } from 'react';
import { Checkbox } from '@chakra-ui/core';
import { tableInitialState } from '../../../components/table/mocks';
import Table from '../../../components/table/ReactTable';
import { useAttendanceContext } from '../AttendanceContext';
import { getStudentsAttendance } from '../../../API/students/getStudentsAttendance';
import { useQuery } from 'react-query';
import { attendanceTableSelector } from '../selectors';

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
	const {
		data,
		studentsAttendance,
		setStudentsAttendance
	} = useAttendanceContext();
	const { data: students } = useQuery(
		['attendance-formatted-data', { data, selectedDate: selectedMenuItem }],
		getData
	);
	console.log(studentsAttendance);

	useEffect(() => {
		console.log(data, students);
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
			console.log(presentStudents);
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
	return tableData ? (
		<Table
			columns={columns}
			data={tableData}
			initialState={tableInitialState}
		/>
	) : null;
};
