import React, { useState } from 'react';
import { BackButton } from '../atoms/BackButton';
import { useQuizContext } from '../QuizContext';
import { finishedQuizzesSelector } from '../gradesSelector';
import { GradesDropdown } from '../../../components/dropdown/GradesDropdown';
import { Flex, Box } from '@chakra-ui/core';
import GradesTable from '../molecules/GradesTable';

function Grades() {
	const { data } = useQuizContext();
	const { finishedQuizzes, dropdownData } = finishedQuizzesSelector({
		quizzesData: data
	});
	console.log(data, dropdownData);
	const [selectedQuizGrades, setSelectedQuizGrades] = useState(dropdownData[0]);
	return (
		<Flex direction='column' w='full' h='full'>
			<Flex w='full'>
				<BackButton />
				<Flex ml='auto' mt='10px'>
					<GradesDropdown
						menuItems={dropdownData}
						selectedMenuItem={selectedQuizGrades.title}
						setSelectedMenuItem={setSelectedQuizGrades}
					/>
				</Flex>
			</Flex>
			<Flex w='full' h='full' p='30px'>
				<GradesTable selectedQuizGrades={selectedQuizGrades} />
			</Flex>
		</Flex>
	);
}

export default Grades;
