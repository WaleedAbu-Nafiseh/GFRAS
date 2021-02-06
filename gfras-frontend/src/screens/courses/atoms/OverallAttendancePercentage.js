import React from 'react';
import { Flex, Text, Skeleton } from '@chakra-ui/core';
import { useAttendanceContext } from '../AttendanceContext';
import { useIntl } from 'react-intl';
import { InfoButtons } from '../../../components/chart-wrapper/ChartWrapper';
import { selectDashboardOverallAttendance } from '../selectors';

function OverallAttendancePercentage() {
	const { formatMessage: f, formatNumber } = useIntl();
	const { data, isLoading } = useAttendanceContext();
	const averageOfStudentsAttendance = selectDashboardOverallAttendance({
		data
	});

	if (isLoading) {
		return (
			<Skeleton w='270px' h='118px'>
				asokdoak{' '}
			</Skeleton>
		);
	}

	return (
		<Flex
			w='270px'
			h='118px'
			boxShadow='0 0 24px 0 rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)'
			borderRadius='1px solid'
			color='#505d6f'
			fontWeight='bold'
			direction='column'
			fontSize={24}
		>
			<Text w='full' h='full' m='31px 17px 2px'>
				{formatNumber(
					isNaN(+averageOfStudentsAttendance)
						? 0
						: +averageOfStudentsAttendance / 100,
					{
						style: 'percent',
						maximumFractionDigits: 2
					}
				)}
			</Text>
			<Flex w='full' h='full' fontWeight='normal'>
				<Text h='full' mx='17px' isTruncated>
					{f({
						id: 'course.courseDetails.dashboard.average.studentAttendance'
					})}
				</Text>
				<InfoButtons
					ToolTipText={f({
						id:
							'course.courseDetails.dashboard.average.studentAttendance.tooltip'
					})}
				/>
			</Flex>
		</Flex>
	);
}

export default OverallAttendancePercentage;
