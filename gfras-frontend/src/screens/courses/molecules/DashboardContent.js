import React from 'react';
import { Flex } from '@chakra-ui/core';
import {
	ChartWrapper,
	InfoButtons
} from '../../../components/chart-wrapper/ChartWrapper';
import { useIntl } from 'react-intl';
import OverallAttendancePercentage from '../atoms/OverallAttendancePercentage';
import StudentsDetailsTable from '../atoms/StudentsDetailsTable';

function ChartWrapperHeader() {
	const { formatMessage: f } = useIntl();

	return (
		<ChartWrapper.Header title='Course Details Dashboard'>
			<InfoButtons
				ToolTipText={f({
					id: 'course.courseDetails.dashboard.container.tooltip'
				})}
			/>
		</ChartWrapper.Header>
	);
}

function ChartWrapperContent() {
	return (
		<ChartWrapper.Content p='30px'>
			<OverallAttendancePercentage />
			<StudentsDetailsTable />
		</ChartWrapper.Content>
	);
}

function DashboardContent() {
	return (
		<Flex w='full' h='full'>
			<ChartWrapper p='20px'>
				<ChartWrapperHeader />
				<ChartWrapperContent />
			</ChartWrapper>
		</Flex>
	);
}

export default DashboardContent;
