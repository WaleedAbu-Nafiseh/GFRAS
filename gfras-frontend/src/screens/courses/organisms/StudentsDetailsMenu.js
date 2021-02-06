import React from 'react';
import { Flex } from '@chakra-ui/core';
import { HandleQuizDetailsSideMenu } from '../atoms/HandleQuizDetailsSideMenu';
import { studentsDetailsIcons } from '../studentsDetails.config';

const StudentsDetailsSideMenu = () => {
	return (
		<Flex mt='55px' w='full' h='full' direction='column'>
			{studentsDetailsIcons.map(({ label, id, icon, canSideMenuExpand }) => {
				return (
					<HandleQuizDetailsSideMenu
						key={id}
						id={id}
						canSideMenuExpand={canSideMenuExpand}
						icon={icon}
						label={label}
					/>
				);
			})}
		</Flex>
	);
};

export default StudentsDetailsSideMenu;
