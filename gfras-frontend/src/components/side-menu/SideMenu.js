import React from 'react';
import { Flex } from '@chakra-ui/core';

export function SideMenu({ children, ...rest }) {
	return (
		<Flex
			w='200px'
			h='full'
			borderRight='1px solid white'
			boxShadow='0 0 24px 0 rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)'
			bg='white'
			{...rest}
		>
			{children}
		</Flex>
	);
}
