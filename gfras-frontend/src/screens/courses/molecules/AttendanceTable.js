import React, { useEffect } from 'react';
import { Checkbox, Flex } from '@chakra-ui/core';
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
				setStudentsAttendance,
				setCompareStudentsAttendance,
				compareStudentsAttendance,
				changesOnOldValues
			} = useAttendanceContext();
			const isStudentChecked =
				studentsAttendance.findIndex(({ id }) => id === cell.row.values.id) !==
				-1;
			const isPresent = studentsAttendance.findIndex(({ id }) => {
				return cell.row.values.id === id;
			});

			useEffect(() => {
				if (cell.row.values.isPresent && isPresent === -1) {
					setCompareStudentsAttendance((prevStudentsAttendance) => [
						...prevStudentsAttendance,
						{
							studentName: cell.row.values.fullName,
							id: cell.row.values.id
						}
					]);
					setStudentsAttendance((prevStudentsAttendance) => [
						...prevStudentsAttendance,
						{
							studentName: cell.row.values.fullName,
							id: cell.row.values.id
						}
					]);
				}
			}, []);

			// useEffect(() => {
			// 	if (!isStudentChecked && cell.row.values.isPresent) {
			// 		setChangesOnOldValues((prevState) => [
			// 			...prevState,
			// 			cell.row.values.id
			// 		]);
			// 	} else if (isStudentChecked && cell.row.values.isPresent) {
			// 		setChangesOnOldValues((prevState) =>
			// 			prevState.filter(({ id }) => id !== cell.row.values.id)
			// 		);
			// 	}
			// }, [cell.row.values.id]);
			return (
				<Checkbox
					size='sm'
					{...(!isStudentChecked &&
						cell.row.values.isPresent && { border: '1px solid red' })}
					isChecked={isStudentChecked}
					onChange={() => {
						if (isStudentChecked) {
							setCompareStudentsAttendance((prevState) => {
								return prevState.filter(({ id }) => cell.row.values.id !== id);
							});
							setStudentsAttendance((prevState) => {
								return prevState.filter(({ id }) => cell.row.values.id !== id);
							});
						} else {
							setCompareStudentsAttendance((prevState) => {
								return [
									...prevState,
									{
										id: cell.row.values.id,
										studentName: cell.row.values.fullName
									}
								];
							});
							setStudentsAttendance((prevState) => {
								return [
									...prevState,
									{
										id: cell.row.values.id,
										studentName: cell.row.values.fullName
									}
								];
							});
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
		<>
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
		</>
	);
};
