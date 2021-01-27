import React from 'react';
import { Flex } from '@chakra-ui/core';
import DashboardContent from '../molecules/DashboardContent';

function DashboardLayout() {
	return (
		<Flex w='full' h='full' p='30px'>
			<DashboardContent />
		</Flex>
	);
}

export default DashboardLayout;
