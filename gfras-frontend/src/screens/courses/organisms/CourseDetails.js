import React from 'react';
import { SideMenu } from '../../../components/side-menu/SideMenu';
import { Flex } from '@chakra-ui/core';
import { courseDetails } from '../courses.config';
import { CourseDetailsSideMenuButton } from '../atoms/CourseDetailsSideMenuButton';

export function CourseDetails() {
	return (
		<SideMenu
			maxW='100px'
			zIndex='1000'
			borderRight='1px solid rgb(240,240,240)'
			boxShadow='none'
		>
			<Flex direction='column' align='center' w='full' mt='10px'>
				{courseDetails.map(({ label, id, icon, canSideMenuExpand }) => {
					return (
						<CourseDetailsSideMenuButton
							key={id}
							id={id}
							canSideMenuExpand={canSideMenuExpand}
							icon={icon}
							label={label}
						/>
					);
				})}
			</Flex>
		</SideMenu>
	);
}
