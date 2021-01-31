import React from 'react';
import { Flex, Spinner as ChakraSpinner } from '@chakra-ui/core';

export function Spinner() {
	return (
		<Flex w='full' h='full' justify='center' align='center'>
			<ChakraSpinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='blue.500'
				size='xl'
			/>
		</Flex>
	);
}
