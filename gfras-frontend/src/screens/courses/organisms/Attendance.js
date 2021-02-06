import React, { useState } from 'react';
import {
	Flex,
	Text,
	Button,
	Divider,
	Tooltip,
	Icon,
	Input,
	IconButton
} from '@chakra-ui/core';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useAttendanceContext } from '../AttendanceContext';
import { startNewAttendance } from '../../../API/attendance/startNewAttendance';
import { format, isAfter, parse } from 'date-fns';
import { AttendanceTable } from '../molecules/AttendanceTable';
import { DropDown } from '../../../components/dropdown/DropDown';
import { CSVLink } from 'react-csv';
import { DownloadIcon } from '../../../components/icons/Download';
import { BackButton } from '../atoms/BackButton';
import { submitAttendance } from '../../../API/attendance/submitAttendance';
import { Spinner } from '../../../components/loaders/Spinner';
import { useForm } from 'react-hook-form';
import {
	useFailureToast,
	useSuccessToast
} from '../../../custom-hooks/useSuccessToast';

const csvHeaders = [{ label: 'Student Name', key: 'studentName' }];

export function Attendance() {
	const { register, watch } = useForm();
	const successToast = useSuccessToast();
	const failureToast = useFailureToast();
	const { courseID } = useParams();
	const { formatMessage } = useIntl();
	const {
		data,
		refetchAttendanceList,
		studentsAttendance,
		compareStudentsAttendance,
		setCompareStudentsAttendance
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

	const submitNewAttendance = async () => {
		setIsLoading(true);
		await submitAttendance({
			courseID,
			date: selectedMenuItem,
			time: format(new Date(), 'HH:mm'),
			presentStudents: studentsAttendance,
			attendancePoint: watch('attendance-point'),
			comparePresentStudents: compareStudentsAttendance
		})
			.then(() => {
				setSelectedMenuItem(format(new Date(), 'dd-MM-yyyy'));
				refetchAttendanceList();
				setIsLoading(false);
				setCompareStudentsAttendance([]);
				successToast({
					title: 'Attendance',
					description: 'Student Attendance Submitted successfully'
				});
			})
			.catch((err) => {
				failureToast({
					title: formatMessage({
						id: 'toastMessage.errorOccurred.title'
					}),
					description: err.message
				});
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
	const isDisabled = !dropDownItems || dropDownItems.length === 0;
	console.log({ studentsAttendance });
	return (
		<Flex w='full' direction='column'>
			<Flex w='full' justify='flex-end'>
				{/*<BackButton />*/}
				<Flex alignItems='center'>
					{isDisabled ? (
						<IconButton
							mt='10px'
							isDisabled={true}
							bg='transparent'
							_hover={{ bg: 'transparent' }}
							_focus={{ bg: 'transparent' }}
							_active={{ bg: 'transparent' }}
							color='rgba(0,0,0,0.74)'
							boxSize='16px'
							as={DownloadIcon}
						/>
					) : (
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
					)}
					<Divider
						mx='10px'
						h='20px'
						color='rgba(0,0,0,0.12)'
						mt='10px'
						orientation='vertical'
					/>
					<DropDown
						selectedMenuItem={selectedMenuItem}
						setSelectedMenuItem={setSelectedMenuItem}
						menuItems={dropDownItems}
					/>
				</Flex>
			</Flex>
			<Flex w='full' p='30px' maxH='calc(100% - 200px)'>
				<AttendanceTable selectedMenuItem={selectedMenuItem} />
			</Flex>
			{isDisabled && (
				<Text textAlign='center' fontSize='20px' fontWeight={500}>
					No Data to Display
				</Text>
			)}
			<Input
				type='number'
				w='200px'
				isDisabled={isDisabled}
				ml='30px'
				mb='10px'
				placeHolder='Attendance Point'
				id='attendance-point'
				errorBorderColor='rgba(224,32,32,.38)'
				name='attendance-point'
				borderRadius='7px'
				ref={register({ required: true })}
			/>
			<Flex borderTop='2px solid #EFEFEF' mx='20px'>
				<Button
					minW='100px'
					mt='10px'
					bg='#ff5722'
					isDisabled={
						compareStudentsAttendance.length === 0 || !watch('attendance-point')
					}
					_hover={{ bg: '#fc4216' }}
					onClick={() => submitNewAttendance()}
					color='white'
				>
					{formatMessage({
						id: 'course.courseDetails.attendance.submitButtonLabel'
					})}
				</Button>
				<Tooltip
					shouldWrapChildren
					bg='red.600'
					isDisabled={!dropDownItems.includes(format(new Date(), 'dd-MM-yyyy'))}
					label='Attendance can be created once a day'
					hasArrow
					arrowSize={15}
				>
					<Button
						minW='100px'
						ml='20px'
						mt='10px'
						bg='#277da1'
						isDisabled={dropDownItems.includes(
							format(new Date(), 'dd-MM-yyyy')
						)}
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
				</Tooltip>
			</Flex>
		</Flex>
	);
}
