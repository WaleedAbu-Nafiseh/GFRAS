import React from 'react';
import { Flex } from '@chakra-ui/core';
import { DisplayQuestion } from '../organisms/DisplayQuestion';

export function StartedQuizTemplate() {
	return (
		<Flex w='full' h='full'>
			<DisplayQuestion />
		</Flex>
	);
}
