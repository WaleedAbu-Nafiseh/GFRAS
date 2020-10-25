import React from 'react';
import { Checkbox } from '@chakra-ui/core';

export const tableInitialState = {
	sortBy: [
		{
			id: 'studentName',
			desc: false
		}
	]
};

export const columns = [
	{
		Header: 'Student Name',
		accessor: 'studentName'
	},
	{
		Header: 'Present',
		accessor: 'present',
		Cell: (cell) => {
			return <Checkbox size='sm' colorScheme='red' border='1px solid black' />;
		},
		disableSortBy: true
	}
];

export const sortingTableData = [
	{
		studentName: 'Yousef',
		present: 'ada'
	},
	{
		studentName: 'Mohammed',
		present: ''
	},
	{
		studentName: 'Adel',
		present: ''
	},
	{
		studentName: 'Khaled',
		present: ''
	}
];
