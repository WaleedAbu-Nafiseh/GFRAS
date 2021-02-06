import React from 'react';
import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	Icon,
	Skeleton
} from '@chakra-ui/core';
import { ChevronDownIcon } from '../icons/ArrowDown';
import { CheckIcon } from '../icons/Check';

export const GradesDropdown = ({
	selectedMenuItem,
	setSelectedMenuItem,
	menuItems
}) => {
	if (!menuItems) {
		return <Skeleton w='150px' mr='30px' mt='10px' />;
	}

	const isDisabled = !menuItems || menuItems.length === 0;

	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton
						isDisabled={isDisabled}
						as={Button}
						w='fit-content'
						h='1.5rem'
						rightIcon={
							<ChevronDownIcon
								transform={isOpen ? 'rotate(180deg)' : 'rotate(0)'}
							/>
						}
						mr='30px'
						mt='10px'
					>
						{isDisabled ? 'No Quiz has been Taken' : selectedMenuItem}
					</MenuButton>
					<MenuList maxH='200px' overflow='auto'>
						{menuItems.map(({ title, menuID }, id) => (
							<MenuItem
								onClick={() => {
									setSelectedMenuItem({ title, menuID });
								}}
								key={`${title}-${id}`}
							>
								{title}
								{selectedMenuItem === title && (
									<Icon ml='auto' boxSize='16px' as={CheckIcon} />
								)}
							</MenuItem>
						))}
					</MenuList>
				</>
			)}
		</Menu>
	);
};
