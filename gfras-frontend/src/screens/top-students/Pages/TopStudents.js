import React from 'react';
import TopStudentsProvider from '../TopStudentsContext';
import { Text } from '@chakra-ui/core';
import { useTopStudentsContext } from '../TopStudentsContext';
import { TopStudentsTemplate } from '../template/TopStudentsTemplate';
import { Spinner } from '../../../components/loaders/Spinner';

function PageContainer() {
	const { isLoading, isError } = useTopStudentsContext();

	if (isError) return <Text>Something went wrong</Text>;
	if (isLoading) return <Spinner />;
	if (!isError && !isLoading) return <TopStudentsTemplate />;
}

const TopStudents = () => {
	return (
		<TopStudentsProvider>
			<PageContainer />
		</TopStudentsProvider>
	);
};

export default TopStudents;
