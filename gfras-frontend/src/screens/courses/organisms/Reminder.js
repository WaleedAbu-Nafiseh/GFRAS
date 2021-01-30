import React from 'react';
import { Flex } from '@chakra-ui/core';
import CreateReminder from '../molecules/CreateReminder';
import CalendarReminder from '../molecules/CalendarReminder';

function Reminder() {
	return (
		<Flex w='full' h='full' p='20px' direction='column'>
			<CreateReminder />
			<CalendarReminder />
		</Flex>
	);
}

export default Reminder;
