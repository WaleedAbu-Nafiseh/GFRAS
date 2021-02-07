import React from 'react';
import { RaceChart } from '../../../components/race-chart/RaceChart';
import { useTopStudentsContext } from '../TopStudentsContext';
import { topStudentsSelector } from '../selectors';
import { Flex, Heading } from '@chakra-ui/core';

export const Race = () => {
	const res = useTopStudentsContext();
	const selectorData = topStudentsSelector({ students: res.data });
	console.log(selectorData);
	return (
		<>
			<Heading alignSelf='center'>Top Students</Heading>
			<Flex p='70px 100px' w='full' h='full' justify='center'>
				<RaceChart barData={selectorData} />
			</Flex>
		</>
	);
};
