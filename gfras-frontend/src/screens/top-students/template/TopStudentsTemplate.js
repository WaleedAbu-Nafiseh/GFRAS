import React from 'react';
import { Flex } from '@chakra-ui/core';
import { Race } from '../organisms/Race';

export function TopStudentsTemplate() {
	return (
		<Flex w='full' h='full' mx='auto' direction='column' justify='center'>
			<Race />
		</Flex>
	);
}
