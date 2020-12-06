import React from 'react';
import { Flex } from '@chakra-ui/core';
import { quizzesDetailsIcons } from '../quizzesDetails.config';
import { HandleQuizDetailsSideMenu } from '../atoms/HandleQuizDetailsSideMenu';

const QuizListSideMenu = () => {
	return (
		<Flex mt='55px' w='full' h='full' direction='column'>
			{quizzesDetailsIcons.map(({ label, id, icon, canSideMenuExpand }) => {
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

export default QuizListSideMenu;
