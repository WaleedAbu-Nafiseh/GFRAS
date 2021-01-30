import React, { useEffect, useState } from 'react';
import { CalendarEvents } from '../../../components/calendar-events/CalendarEvents';
import 'react-big-calendar/lib/sass/styles.scss';
import { Flex, Spinner } from '@chakra-ui/core';
import { getReminders } from '../../../API/reminder/getReminders';
import { useParams } from 'react-router-dom';
import { selectReminders } from '../selectors';

function CalendarReminder() {
	const [reminders, setReminders] = useState();
	const { courseID } = useParams();

	useEffect(() => {
		getReminders({ courseID }).then((res) => {
			setReminders(res);
		});
	}, []);
	const events = reminders && selectReminders({ reminders });

	return (
		<Flex w='full' h='full' direction='column' mt='30px'>
			{events ? (
				<CalendarEvents events={events} />
			) : (
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
					size='xl'
				/>
			)}
		</Flex>
	);
}

export default CalendarReminder;
