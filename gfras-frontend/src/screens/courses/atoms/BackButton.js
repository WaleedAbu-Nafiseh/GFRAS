import React from 'react';
import { Button, Flex, IconButton } from '@chakra-ui/core';
import { ChevronLeftIcon } from '../../../components/icons/ChevronLeft';

export const BackButton = () => {
	return (
		<Flex mt='5px'>
			<IconButton
				ml='20px'
				bg='transparent'
				fontSize='25px'
				w='20px'
				onClick={() => (window.location.href = '/courses')}
				icon={<ChevronLeftIcon />}
				_focus={{ border: '0', bg: 'transparent' }}
				_hover={{ bg: 'transparent' }}
			/>
			<Button
				ml={'-20px'}
				bg='transparent'
				fontSize={17}
				onClick={() => (window.location.href = '/courses')}
				_focus={{ border: '0', bg: 'transparent' }}
				_hover={{ textDecoration: 'underline', bg: 'transparent' }}
			>
				Back
			</Button>
		</Flex>
	);
};
