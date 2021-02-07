import React from 'react';
import { EditIcon } from '../../../components/icons/Edit';
import { DeleteIcon } from '../../../components/icons/Delete';
import { CloseIcon } from '../../../components/icons/Close';
import { Flex, IconButton, Tooltip, Text } from '@chakra-ui/core';
import { Modal } from '../../../components/modal/modal';
import { format } from 'date-fns';
import { TimeIcon } from '../../../components/icons/Time';
import { LeftAlignIcon } from '../../../components/icons/LeftAlign';

const DATE_WEEK_DAY_FORMAT = 'EEEE, MMMM dd';

function EventDetailsModalHeader({ setIsOpenEventDetailsModal }) {
	const buttons = [
		// {
		// 	tooltipLabel: 'Edit Reminder',
		// 	id: 'edit-reminder',
		// 	icon: <EditIcon />,
		// 	onClick: () => console.log('edit reminder clicked')
		// },
		// {
		// 	tooltipLabel: 'Delete Reminder',
		// 	id: 'delete-reminder',
		// 	icon: <DeleteIcon />,
		// 	onClick: () => console.log('delete reminder clicked')
		// },
		{
			// tooltipLabel: 'Close',
			id: 'close',
			icon: <CloseIcon boxSize='12px' />,
			onClick: () => setIsOpenEventDetailsModal(false)
		}
	];
	return (
		<Flex w='full' h='full' justify='flex-end'>
			{buttons.map(({ tooltipLabel, icon, onClick, id }) => {
				return (
					// <Tooltip label={tooltipLabel} key={id}>
					<IconButton
						{...(id === 'close' && { ml: '10px' })}
						w='fit-content'
						bg='transparent'
						isRound
						onClick={onClick}
						outline='none'
						_focus={{ outline: 'none' }}
						icon={icon}
					/>
					// </Tooltip>
				);
			})}
		</Flex>
	);
}

function EventDetailsModalBody({ selectedEvent }) {
	const { title, end, desc } = selectedEvent;
	return (
		<Flex w='full' h='full' direction='column'>
			<Text fontSize={22} color='#3c4043' pl='63px'>
				{title}
			</Text>
			<Flex w='full' h='full' align='center' mt='20px'>
				<TimeIcon ml='28px' />
				<Flex w='full' h='full' direction='column' ml='19px'>
					<Text
						color='#3c4043'
						fontWeight={400}
						fontSize={16}
						alignSelf='flex-start'
					>
						{format(end, DATE_WEEK_DAY_FORMAT)}
					</Text>
					<Text fontSize='12px' color='#70757a'>
						{format(end, 'h:mm aa')}
					</Text>
				</Flex>
			</Flex>
			<Flex w='full' h='full' align='flex-start' mt='20px'>
				<LeftAlignIcon ml='28px' mt='8px' />
				<Text
					fontSize='15px'
					color='#3c4043'
					ml='19px'
					overflowWrap='break-word'
					mr='10px'
				>
					{desc}
				</Text>
			</Flex>
		</Flex>
	);
}

function EventDetailsModal({
	isOpenEventDetailsModal,
	setIsOpenEventDetailsModal,
	selectedEvent
}) {
	return (
		<Modal
			headerProps={{ mx: 'unset' }}
			modalOverLayBackground='transparent'
			headerTitle={
				<EventDetailsModalHeader
					setIsOpenEventDetailsModal={setIsOpenEventDetailsModal}
				/>
			}
			modalBody={<EventDetailsModalBody selectedEvent={selectedEvent} />}
			isOpen={isOpenEventDetailsModal}
			modalContentStyle={{ p: 1, maxW: '448px' }}
		/>
	);
}

export default EventDetailsModal;
