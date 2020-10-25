import React from 'react';
import Table from './ReactTable';
import { tableInitialState, columns, sortingTableData } from './mocks';

export default {
	title: 'Table',
	component: Table
};

export const Sort = () => {
	return (
		<Table
			columns={columns}
			data={sortingTableData}
			initialState={tableInitialState}
		/>
	);
};
