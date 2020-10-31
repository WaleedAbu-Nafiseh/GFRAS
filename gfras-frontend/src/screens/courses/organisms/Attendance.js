import React, { useState } from 'react';
import {
	Flex,
	Text,
	Button,
	Divider,
	Tooltip,
	Spinner,
	Icon
} from '@chakra-ui/core';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useAttendanceContext } from '../AttendanceContext';
import { startNewAttendance } from '../../../API/attendance/startNewAttendance';
import { format, isAfter, parse } from 'date-fns';
import { AttendanceTable } from '../molecules/AttendanceTable';
import { AttendanceDropdown } from '../molecules/AttendanceDropDown';
import { CSVLink } from 'react-csv';
import { DownloadIcon } from '../../../components/icons/Download';
import { BackButton } from '../atoms/BackButton';

const csvHeaders = [{ label: 'Student Name', key: 'studentName' }];

export function Attendance() {
	const { courseID } = useParams();
	const { formatMessage } = useIntl();
	const {
		data,
		refetchAttendanceList,
		studentsAttendance
	} = useAttendanceContext();

	let dropDownItems = '';

	if (data && data.attendance) {
		dropDownItems = Object.keys(data.attendance);
		dropDownItems.sort((a, b) => {
			return isAfter(
				parse(a, 'dd-MM-yyyy', new Date()),
				parse(b, 'dd-MM-yyyy', new Date())
			)
				? -1
				: 1;
		});
	}

	const [selectedMenuItem, setSelectedMenuItem] = useState(
		data && data.attendance ? dropDownItems[0] : ''
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleStartNewAttendance = async () => {
		setIsLoading(true);
		await startNewAttendance({
			courseID,
			date: format(new Date(), 'dd-MM-yyyy'),
			time: format(new Date(), 'HH:mm')
		}).then(() => {
			setSelectedMenuItem(format(new Date(), 'dd-MM-yyyy'));
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
								id: 'course.attendance.attendanceList.takeAttendance'
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

	return (
		<Flex w='full' direction='column'>
			<Flex w='full' justify='space-between'>
				<BackButton />
				<Flex alignItems='center'>
					<CSVLink
						data={studentsAttendance}
						headers={csvHeaders}
						filename={`${data.courseName}-Attendance Sheet-${selectedMenuItem}.csv`}
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
						menuItems={dropDownItems}
					/>
				</Flex>
			</Flex>
			<Flex w='full' p='20px' maxH='calc(100% - 200px)'>
				<AttendanceTable selectedMenuItem={selectedMenuItem} />
			</Flex>
			<Flex borderTop='2px solid #EFEFEF' mx='20px'>
				<Button
					minW='100px'
					mt='10px'
					bg='#ff5722'
					_hover={{ bg: '#fc4216' }}
					isDisabled={true}
					color='white'
				>
					{formatMessage({
						id: 'course.courseDetails.attendance.submitButtonLabel'
					})}
				</Button>
				<Button
					minW='100px'
					ml='20px'
					mt='10px'
					bg='#277da1'
					_hover={{ bg: '#00688d' }}
					color='white'
					onClick={() => {
						handleStartNewAttendance();
					}}
				>
					{formatMessage({
						id: 'course.attendance.attendanceList.takeNewAttendance'
					})}
				</Button>
			</Flex>
		</Flex>
	);
}
