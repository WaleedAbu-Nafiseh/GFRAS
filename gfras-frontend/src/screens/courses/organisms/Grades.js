import React, { useState } from 'react';
import { BackButton } from '../atoms/BackButton';
import { useQuizContext } from '../QuizContext';
import { finishedQuizzesSelector } from '../gradesSelector';
import { GradesDropdown } from '../../../components/dropdown/GradesDropdown';
import {
	Divider,
	Flex,
	Icon,
	IconButton,
	Text,
	Tooltip
} from '@chakra-ui/core';
import GradesTable from '../molecules/GradesTable';
import { Spinner } from '../../../components/loaders/Spinner';
import { DownloadIcon } from '../../../components/icons/Download';
import { CSVLink } from 'react-csv';
import { useIntl } from 'react-intl';
import { useAttendanceContext } from '../AttendanceContext';

const csvHeaders = [
	{ label: 'Student ID', key: 'studentUniversityId' },
	{ label: 'Student Name', key: 'studentName' },
	{ label: 'Grade', key: 'grade' }
];

function Grades() {
	const { formatMessage } = useIntl();
	const [tableData, setTableData] = useState([]);
	const { data, isLoading } = useQuizContext();
	const { data: attendanceData } = useAttendanceContext();

	console.log({ data, attendanceData });
	const { finishedQuizzes, dropdownData } =
		data &&
		finishedQuizzesSelector({
			quizzesData: data
		});
	const [selectedQuizGrades, setSelectedQuizGrades] = useState(dropdownData[0]);
	const isDisabled = !selectedQuizGrades;

	if (isLoading) {
		return <Spinner />;
	}
	console.log({ tableData });
	return (
		<Flex direction='column' w='full' h='full'>
			<Flex w='full' justify='flex-end'>
				{/*<BackButton />*/}
				<Flex mt='10px' align='center'>
					{isDisabled ? (
						<IconButton
							mt='10px'
							isDisabled={true}
							_hover={{ bg: 'transparent' }}
							_focus={{ bg: 'transparent' }}
							_active={{ bg: 'transparent' }}
							bg='transparent'
							color='rgba(0,0,0,0.74)'
							boxSize='16px'
							as={DownloadIcon}
						/>
					) : (
						<CSVLink
							data={tableData}
							headers={csvHeaders}
							filename={`${attendanceData.courseName}-Attendance Sheet-${
								!isDisabled ? selectedQuizGrades.title : ''
							}.csv`}
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
					<GradesDropdown
						menuItems={dropdownData}
						selectedMenuItem={!isDisabled ? selectedQuizGrades.title : ''}
						setSelectedMenuItem={setSelectedQuizGrades}
					/>
				</Flex>
			</Flex>
			<Flex w='full' p='30px'>
				<GradesTable
					setTableData={setTableData}
					tableData={tableData}
					selectedQuizGrades={selectedQuizGrades}
				/>
			</Flex>
			{isDisabled && (
				<Text textAlign='center' fontSize='20px' fontWeight={500}>
					No Quiz has been Taken
				</Text>
			)}
		</Flex>
	);
}

export default Grades;
