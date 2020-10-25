import React, { useState } from 'react';
import {
	Flex,
	Text,
	Button,
	Divider,
	Tooltip,
	Spinner,
	IconButton,
	Icon
} from '@chakra-ui/core';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '../../../components/icons/ChevronLeft';
import { useAttendanceContext } from '../AttendanceContext';
import { startNewAttendance } from '../../../API/attendance/startNewAttendance';
import { format } from 'date-fns';
import { AttendanceTable } from '../molecules/AttendanceTable';
import { AttendanceDropdown } from '../molecules/AttendanceDropDown';
import { CSVLink } from 'react-csv';
import { DownloadIcon } from '../../../components/icons/Download';

const csvHeaders = [{ label: 'Student Name', key: 'studentName' }];

export function Attendance() {
	const { courseID } = useParams();
	const { formatMessage } = useIntl();
	const {
		data,
		refetchAttendanceList,
		studentsAttendance
	} = useAttendanceContext();
	const [selectedMenuItem, setSelectedMenuItem] = useState(
		data && data.attendance ? Object.keys(data.attendance)[0] : ''
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleStartNewAttendance = async () => {
		setIsLoading(true);
		await startNewAttendance({
			courseID,
			date: format(new Date(), 'dd-MM-yyyy'),
			time: format(new Date(), 'HH:mm')
		}).then(() => {
			refetchAttendanceList();
			setIsLoading(false);
		});
	};

	if (!data || isLoading) {
		return <Spinner />;
	}

	if (!data.hasOwnProperty('attendance')) {
		return (
			<Flex
				w='full'
				h='full'
				direction='column'
				align='center'
				justify='center'
			>
				{data.students.length > 0 ? (
					<>
						<Text fontSize={20} fontWeight={500}>
							{formatMessage({
								id: 'course.attendance.attendanceList.emptyList'
							})}
						</Text>
						<Button
							w='fit-content'
							bg='#3182ce'
							mt='10px'
							_hover={{ bg: '#006ace' }}
							onClick={() => {
								handleStartNewAttendance();
							}}
						>
							{formatMessage({
								id: 'course.courseDetails.attendance.downloadButton'
							})}
						</Button>
					</>
				) : (
					<Text fontSize={20} fontWeight={500}>
						{formatMessage({
							id: 'course.attendance.attendanceList.noStudents'
						})}
					</Text>
				)}
			</Flex>
		);
	}
	//TODO: react table for attendance with two columns student name and present checkbox
	return (
		<Flex w='full' direction='column'>
			<Flex w='full' justify='space-between'>
				<IconButton
					ml='25px'
					fontSize='25px'
					w='20px'
					onClick={() => (window.location.href = '/courses')}
					mt='5px'
					isRound
					icon={<ChevronLeftIcon />}
				/>

				<Flex alignItems='center'>
					<CSVLink
						data={studentsAttendance}
						headers={csvHeaders}
						filename={`Algorithms-${selectedMenuItem}.csv`}
					>
						<Tooltip
							hasArrow
							label={formatMessage({
								id: 'course.courseDetails.attendance.downloadButton'
							})}
							placement='bottom'
							borderRadius='5px'
							boxShadow=' 0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.2)'
							color='black'
							bg='white'
						>
							<Icon
								mt='10px'
								color='rgba(0,0,0,0.74)'
								boxSize='16px'
								as={DownloadIcon}
							/>
						</Tooltip>
					</CSVLink>
					<Divider
						mx='10px'
						h='20px'
						color='rgba(0,0,0,0.12)'
						mt='10px'
						orientation='vertical'
					/>
					<AttendanceDropdown
						selectedMenuItem={selectedMenuItem}
						setSelectedMenuItem={setSelectedMenuItem}
						menuItems={Object.keys(data.attendance)}
					/>
				</Flex>
			</Flex>
			<Flex w='full' p='20px'>
				<AttendanceTable selectedMenuItem={selectedMenuItem} />
			</Flex>
		</Flex>
	);
}
