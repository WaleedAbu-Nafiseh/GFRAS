import React from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import { Box, Flex, Icon } from '@chakra-ui/core';
import { ChevronDownIcon } from '../icons/ArrowDown';
import { ChevronUpIcon } from '../icons/ArrowUp';
import { ArrowUpDownIcon } from '../icons/ArrowUpDownIcon';

function THeadRow({ headers, getHeaderGroupProps }) {
	return (
		<Box as='tr' {...getHeaderGroupProps()}>
			{headers.map(
				(
					{
						Header,
						getHeaderProps,
						getSortByToggleProps,
						toggleSortBy,
						isSorted,
						isSortedDesc,
						render,
						canSort
					},
					index
				) => (
					<Box
						as='th'
						p={2}
						bg='#ff6d40'
						color='white'
						borderBottom='2px solid #EFEFEF'
						fontSize='md'
						{...getHeaderProps(getSortByToggleProps())}
						onClick={() => {
							toggleSortBy && toggleSortBy(!isSortedDesc, false);
						}}
						key={`${Header}-${index}`}
					>
						<Flex alignItems='center'>
							{render('Header')}
							{canSort && (
								<Icon
									ml={2}
									boxSize='20px'
									color={isSorted ? 'white' : 'rgba(0,0,0,0.87)'}
									as={
										isSorted
											? isSortedDesc
												? ChevronDownIcon
												: ChevronUpIcon
											: ArrowUpDownIcon
									}
								/>
							)}
						</Flex>
					</Box>
				)
			)}
		</Box>
	);
}

function TBodyRow({ row }) {
	const { canExpand, getRowProps, cells, isExpanded } = row;

	return (
		<Box
			as='tr'
			height={canExpand ? '48px' : '32px'}
			fontSize={16}
			boxShadow={isExpanded ? '0 0 2px 0 rgba(0,0,0,0.5)' : ''}
			borderRadius='6px'
			transition='all 0.3s'
			{...getRowProps()}
			{...(canExpand &&
				row.getToggleRowExpandedProps({
					style: {
						backgroundColor: isExpanded ? '#DFDAFF' : '#F5F5F5',
						boxShadow: isExpanded ? '0 0 2px 0 rgba(0,0,0,0.5)' : 'none'
					}
				}))}
			_odd={{
				backgroundColor: 'rgba(0,0,0,0.04)'
			}}
		>
			{cells.map((cell, index) => {
				const {
					column: { Header }
				} = cell;
				return (
					<Box
						as='td'
						p={2}
						_first={{
							borderRadius: '6px 0 0 6px'
						}}
						_last={{
							borderRadius: '0 6px 6px 0'
						}}
						{...cell.getCellProps()}
						key={`${Header}-${index}`}
					>
						{cell.render('Cell')}
					</Box>
				);
			})}
		</Box>
	);
}

function Table({ columns, data, initialState: init }) {
	const cols = React.useMemo(() => [...columns], [columns]);

	const initialState = React.useMemo(() => init, [init]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		setHiddenColumns
	} = useTable(
		{
			columns: cols,
			data,
			initialState
		},
		useSortBy,
		useExpanded
	);

	React.useEffect(() => {
		setHiddenColumns(
			columns
				.filter((column) => {
					return !(!!column.isVisible || !column.hasOwnProperty('isVisible'));
				})
				.map((column) => column.accessor)
		);
	}, [setHiddenColumns, columns]);

	return (
		<Box
			as='table'
			padding={0}
			w='100%'
			{...getTableProps({
				style: {
					borderCollapse: 'separate',
					borderSpacing: '0 8px'
				}
			})}
		>
			<Box as='thead' textAlign='left'>
				{headerGroups.map(({ headers, getHeaderGroupProps }, index) => {
					return (
						<THeadRow
							headers={headers}
							getHeaderGroupProps={getHeaderGroupProps}
							key={`thead-table-row-${index}`}
						/>
					);
				})}
			</Box>
			<Box as='tbody' {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return <TBodyRow row={row} key={`tbody-table-row-${row.id}`} />;
				})}
			</Box>
		</Box>
	);
}

export default Table;
