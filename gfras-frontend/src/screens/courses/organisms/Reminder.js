import React from 'react';
import { Flex } from '@chakra-ui/core';
import CreateReminder from '../molecules/CreateReminder';
import CalendarReminder from '../molecules/CalendarReminder';
import ReminderProvider from '../ReminderContext';

function Reminder() {
	return (
		<ReminderProvider>
			<Flex w='full' h='full' p='20px' direction='column'>
				<CreateReminder />
				<CalendarReminder />
			</Flex>
		</ReminderProvider>
	);
}

export default Reminder;
