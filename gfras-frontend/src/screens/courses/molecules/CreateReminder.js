import React, { useState } from 'react';
import { Flex, Button, Text, Input, Textarea } from '@chakra-ui/core';
import { PlusIcon } from '../../../components/icons/PlusIcon';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { Modal } from '../../../components/modal/modal';
import DatePicker from 'react-date-picker';
import { CalendarIcon } from '../../../components/icons/CalendarIcon';
import TimePicker from 'react-time-picker';
import { setNewReminder } from '../../../API/reminder/setNewReminder';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useReminderContext } from '../ReminderContext';
import {
	useFailureToast,
	useSuccessToast
} from '../../../custom-hooks/useSuccessToast';
import { useAttendanceContext } from '../AttendanceContext';

function ReminderButton({ setIsCreateReminderModalOpen }) {
	const { formatMessage: f } = useIntl();

	return (
		<Button
			onClick={() => setIsCreateReminderModalOpen(true)}
			w='auto'
			h='48px'
			outline='none'
			_focus={{ outline: 'none' }}
			_active={{ border: 'none', outline: 'none' }}
			borderRadius='30px'
			bg='white'
			leftIcon={<PlusIcon ml='-14px' w='48px' h='36px' />}
			boxShadow='0 0 24px 0 rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)'
		>
			<Text color='#3c4043' fontSize='15px'>
				{f({ id: 'course.courseDetails.reminder.createReminder' })}
			</Text>
		</Button>
	);
}

function ModalBody({
	setIsCalendarOpened,
	date,
	onChangeDate,
	time,
	onChangeTime,
	register
}) {
	const { formatMessage: f } = useIntl();

	return (
		<Flex w='full' h='full' direction='column'>
			<Input
				w='300px'
				placeholder={f({
					id: 'course.courseDetails.reminder.modal.createReminder.addTitle'
				})}
				id='title'
				name='title'
				ref={register({ required: true })}
			/>
			<Flex
				w='full'
				h='full'
				mt='10px'
				position='relative'
				justify='space-between'
			>
				<DatePicker
					// ref={register({ required: true })}
					format='dd-MM-y'
					minDate={new Date()}
					value={date}
					calendarIcon={<CalendarIcon />}
					onCalendarClose={() => setIsCalendarOpened(false)}
					onCalendarOpen={() => setIsCalendarOpened(true)}
					onChange={(newDate) => onChangeDate(newDate)}
				/>
				<TimePicker
					onChange={(value) => {
						onChangeTime(value);
					}}
					format='h:mm a'
					// ref={register({ required: true })}
					value={time}
					disableClock
					required
				/>
			</Flex>
			<Textarea
				id='description'
				name='description'
				ref={register({ required: true })}
				mt='10px'
				placeholder='Add description'
				size='sm'
			/>
		</Flex>
	);
}

function UnsavedChangesFooter({
	setShowUnsavedChangesModal,
	setIsCreateReminderModalOpen
}) {
	return (
		<Flex w='full' h='full' justify='flex-end'>
			<Button
				bg='transparent'
				outline='none'
				color='gray.400'
				_focus={{ outline: 'none' }}
				_active={{ border: 'none', outline: 'none' }}
				border='none'
				onClick={() => setShowUnsavedChangesModal(false)}
			>
				Cancel
			</Button>
			<Button
				bg='transparent'
				outline='none'
				_focus={{ outline: 'none' }}
				_active={{ border: 'none', outline: 'none' }}
				color='blue.500'
				border='none'
				onClick={() => {
					setShowUnsavedChangesModal(false);
					setIsCreateReminderModalOpen(false);
				}}
			>
				Discard
			</Button>
		</Flex>
	);
}

function UnsavedChangeModal({
	setShowUnsavedChangesModal,
	setIsCreateReminderModalOpen
}) {
	return (
		<Modal
			modalContentStyle={{ minH: '32px', minW: '30px' }}
			headerTitle='Discard unsaved changes?'
			modalFooter={
				<UnsavedChangesFooter
					setShowUnsavedChangesModal={setShowUnsavedChangesModal}
					setIsCreateReminderModalOpen={setIsCreateReminderModalOpen}
				/>
			}
			isOpen={true}
		/>
	);
}

function ModalFooter({
	watch,
	setIsCreateReminderModalOpen,
	isLoading,
	onCreateReminder
}) {
	const { formatMessage: f } = useIntl();
	const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);

	const onCancelCreateReminder = () => {
		if (watch('title') || watch('description')) {
			setShowUnsavedChangesModal(true);
		} else {
			setIsCreateReminderModalOpen(false);
		}
	};

	return (
		<Flex w='full' h='full' justify='flex-end'>
			{showUnsavedChangesModal && (
				<UnsavedChangeModal
					setShowUnsavedChangesModal={setShowUnsavedChangesModal}
					setIsCreateReminderModalOpen={setIsCreateReminderModalOpen}
				/>
			)}
			<Button
				mr='10px'
				_hover={{ bg: 'red.400' }}
				bg='red.500'
				color='white'
				outline='none'
				_focus={{ outline: 'none' }}
				_active={{ border: 'none', outline: 'none' }}
				onClick={onCancelCreateReminder}
			>
				{f({
					id: 'course.courseDetails.reminder.modal.createReminder.cancelButton'
				})}
			</Button>
			<Button
				isLoading={isLoading}
				loadingText='Submitting'
				isDisabled={!watch('title') || !watch('description')}
				onClick={onCreateReminder}
				type='submit'
				_hover={{ bg: '#1a73e8cf' }}
				bg='#1a73e8'
				color='white'
			>
				{f({
					id: 'course.courseDetails.reminder.modal.createReminder.createButton'
				})}
			</Button>
		</Flex>
	);
}

function ReminderModal({
	setIsCreateReminderModalOpen,
	isCreateReminderModalOpen
}) {
	const { refetchReminders } = useReminderContext();
	const {
		data: { courseName }
	} = useAttendanceContext();
	const { courseID } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit, watch } = useForm();
	const { formatMessage: f } = useIntl();
	const [isCalenderOpened, setIsCalendarOpened] = useState(false);
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(format(new Date(), 'HH:mm'));
	const successToast = useSuccessToast();
	const failureToast = useFailureToast();
	const onSubmit = handleSubmit(({ title, description }) => {
		setIsLoading(true);
		setNewReminder({
			description,
			courseName,
			title,
			date: format(date, 'dd-MM-yyyy'),
			time,
			courseID
		})
			.then((res) => {
				const splitDate = format(date, 'dd-MM-yyyy').split('-');
				const splitTime = time.split(':');
				setIsLoading(false);
				setIsCreateReminderModalOpen(false);
				refetchReminders();

				successToast({
					title: `Reminder created at ${format(date, 'MMM d')} ${format(
						new Date(
							+splitDate[2],
							+splitDate[1] - 1,
							+splitDate[0],
							+splitTime[0],
							+splitTime[1]
						),
						'h:mm aa'
					)}`
				});
			})
			.catch((err) => {
				const splitDate = format(date, 'dd-MM-yyyy').split('-');
				const splitTime = time.split(':');
				setIsLoading(false);
				setIsCreateReminderModalOpen(false);
				successToast({
					title: `Reminder created at ${format(date, 'MMM d')} ${format(
						new Date(
							+splitDate[2],
							+splitDate[1] - 1,
							+splitDate[0],
							+splitTime[0],
							+splitTime[1]
						),
						'h:mm aa'
					)}`
				});
				// failureToast({
				// 	title: 'An error occurred',
				// 	description: err.message
				// });
			});
	});

	return (
		<Modal
			modalOverLayBackground={'transparent'}
			headerTitle={f({
				id: 'course.courseDetails.reminder.modal.createReminder.title'
			})}
			modalBody={
				<ModalBody
					register={register}
					setIsCalendarOpened={setIsCalendarOpened}
					date={date}
					onChangeDate={setDate}
					time={time}
					onChangeTime={setTime}
				/>
			}
			modalFooter={
				<ModalFooter
					onCreateReminder={onSubmit}
					watch={watch}
					isLoading={isLoading}
					setIsCreateReminderModalOpen={setIsCreateReminderModalOpen}
				/>
			}
			modalBodyStyle={{ overflow: isCalenderOpened ? 'visible' : 'auto' }}
			isOpen={isCreateReminderModalOpen}
		/>
	);
}

function CreateReminder() {
	const [isCreateReminderModalOpen, setIsCreateReminderModalOpen] = useState(
		false
	);

	return (
		<Flex w='fit-content' h='fit-content'>
			<ReminderButton
				setIsCreateReminderModalOpen={setIsCreateReminderModalOpen}
			/>
			<ReminderModal
				setIsCreateReminderModalOpen={setIsCreateReminderModalOpen}
				isCreateReminderModalOpen={isCreateReminderModalOpen}
			/>
		</Flex>
	);
}

export default CreateReminder;
