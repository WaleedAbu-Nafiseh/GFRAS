import { Flex, Skeleton } from '@chakra-ui/core';
import React from 'react';

export function TableLoader({ ...rest }) {
	return (
		<Flex flexDirection='column' w='full' my={4} {...rest}>
			<Skeleton width='full' h='32px' mb={1} />
			<Skeleton width='full' h='32px' mb={1} />
			<Skeleton width='full' h='32px' mb={1} />
			<Skeleton width='full' h='32px' mb={1} />
			<Skeleton width='full' h='32px' mb={1} />
			<Skeleton width='full' h='32px' mb={1} />
		</Flex>
	);
}
