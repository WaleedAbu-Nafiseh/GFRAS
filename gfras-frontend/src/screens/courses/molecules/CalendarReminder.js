import React, { useState } from 'react';
import { CalendarEvents } from '../../../components/calendar-events/CalendarEvents';
import 'react-big-calendar/lib/sass/styles.scss';
import { Flex, Spinner } from '@chakra-ui/core';
import { selectReminders } from '../selectors';
import { useReminderContext } from '../ReminderContext';
import EventDetailsModal from '../atoms/EventDetailsModal';

function CalendarReminder() {
	const { isLoading, reminders } = useReminderContext();
	const [isOpenEventDetailsModal, setIsOpenEventDetailsModal] = useState(false);
	const [clickedEventDetails, setClickedEventDetails] = useState();
	const events = !isLoading && selectReminders({ reminders });

	if (isLoading) {
		return (
			<Flex w='full' h='full' align='center' justify='center'>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
					size='xl'
				/>
			</Flex>
		);
	}

	return (
		<Flex w='full' h='full' direction='column' mt='30px'>
			{isOpenEventDetailsModal && (
				<EventDetailsModal
					setIsOpenEventDetailsModal={setIsOpenEventDetailsModal}
					selectedEvent={clickedEventDetails}
					isOpenEventDetailsModal={isOpenEventDetailsModal}
				/>
			)}
			<CalendarEvents
				events={events}
				onSelectEvent={(value) => {
					setIsOpenEventDetailsModal(true);
					setClickedEventDetails(value);
				}}
			/>
		</Flex>
	);
}

export default CalendarReminder;
