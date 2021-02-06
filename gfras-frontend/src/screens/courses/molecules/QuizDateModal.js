import React, { useState } from 'react';
import { Button, Flex } from '@chakra-ui/core';
import { Modal } from '../../../components/modal/modal';
import DatePicker from 'react-date-picker';
import { format } from 'date-fns';
import { CalendarIcon } from '../../../components/icons/CalendarIcon';

function ModalFooter({
	setIsOpen,
	onSubmitCreateQuestion,
	quizStartDate,
	isLoading
}) {
	const startDate = format(quizStartDate, 'dd-MM-yyyy');
	return (
		<Flex w='full' h='full' mr='auto' justify='flex-end'>
			<Button
				outline='none'
				_focus={{ outline: 'none' }}
				_active={{ border: 'none', outline: 'none' }}
				bg='red.500'
				color='white'
				_hover={{ bg: 'red.400' }}
				isDisabled={isLoading}
				onClick={() => setIsOpen(false)}
				mr='10px'
			>
				Cancel
			</Button>
			<Button
				_hover={{ bg: '#1a73e8cf' }}
				bg='#1a73e8'
				color='white'
				loadingText='Creating'
				isLoading={isLoading}
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
			<DatePicker
				minDate={new Date()}
				calendarIcon={<CalendarIcon />}
				value={startDate}
				onChange={setStartDate}
			/>
		</Flex>
	);
}

function QuizDateModal({
	isOpen,
	setIsOpen,
	onSubmitCreateQuestion,
	isLoading
}) {
	const [startDate, setStartDate] = useState(new Date());

	return (
		<Modal
			headerTitle='Set Reminder'
			isOpen={isOpen}
			modalBodyStyle={{ overflow: 'visible' }}
			modalBody={
				<ModalBody setStartDate={setStartDate} startDate={startDate} />
			}
			modalFooter={
				<ModalFooter
					isLoading={isLoading}
					quizStartDate={startDate}
					setIsOpen={setIsOpen}
					onSubmitCreateQuestion={onSubmitCreateQuestion}
				/>
			}
		/>
	);
}

export default QuizDateModal;
