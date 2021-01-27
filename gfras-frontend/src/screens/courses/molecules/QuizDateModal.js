import React, { useState } from 'react';
import { Button, Flex } from '@chakra-ui/core';
import { Modal } from '../../../components/modal/modal';
import DatePicker from 'react-date-picker';
import { format } from 'date-fns';

function ModalFooter({ setIsOpen, onSubmitCreateQuestion, quizStartDate }) {
	const startDate = format(quizStartDate, 'dd-MM-yyyy');
	return (
		<Flex w='full' h='full' mr='auto'>
			<Button onClick={() => setIsOpen(false)} mr='10px'>
				Cancel
			</Button>
			<Button
				onClick={() => onSubmitCreateQuestion({ quizStartDate: startDate })}
			>
				Create
			</Button>
		</Flex>
	);
}

function ModalBody({ startDate, setStartDate }) {
	return (
		<Flex mt='40px' h='full' w='full'>
			{' '}
			<DatePicker
				minDate={new Date()}
				value={startDate}
				onChange={setStartDate}
			/>
		</Flex>
	);
}

function QuizDateModal({ isOpen, setIsOpen, onSubmitCreateQuestion }) {
	const [startDate, setStartDate] = useState(new Date());

	return (
		<Modal
			headerTitle='Set Reminder'
			isOpen={isOpen}
			modalBody={
				<ModalBody setStartDate={setStartDate} startDate={startDate} />
			}
			modalFooter={
				<ModalFooter
					quizStartDate={startDate}
					setIsOpen={setIsOpen}
					onSubmitCreateQuestion={onSubmitCreateQuestion}
				/>
			}
		/>
	);
}

export default QuizDateModal;