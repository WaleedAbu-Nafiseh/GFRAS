import React from 'react';
import {
	Modal as ChakraModal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/core';

export function Modal({
	isOpen,
	onClose,
	modalFooter,
	headerTitle,
	modalBody,
	headerProps,
	isModalVerticallyCentered = false,
	modalContentStyle,
	footerPosition,
	bodyLineSeparator = '0px',
	modalBodyStyle,
	modalOverLayBackground
}) {
	return (
		<ChakraModal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			closeOnOverlayClick={false}
			closeOnEsc
			scrollBehavior='inside'
		>
			<ModalOverlay
				bg={modalOverLayBackground || 'rgba(255,255,255,0.8)'}
				zIndex={1000}
				w='100%'
				h='100%'
			>
				<ModalContent
					p={5}
					w='fit-content'
					minW={['full', '340px']}
					maxW='800px'
					minH='298px'
					maxH='800px'
					borderRadius='16px'
					boxShadow='0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.2)'
					{...modalContentStyle}
				>
					<ModalHeader
						mx='auto'
						color='rgba(0,0,0,0.6)'
						fontSize={18}
						fontWeight='600'
						p={0}
						{...headerProps}
					>
						{headerTitle}
					</ModalHeader>
					<ModalBody
						px={0}
						overflow='auto'
						borderBottom={bodyLineSeparator}
						borderTop={bodyLineSeparator}
						{...modalBodyStyle}
					>
						{modalBody}
					</ModalBody>
					<ModalFooter p={{ sm: 0 }} {...footerPosition}>
						{modalFooter}
					</ModalFooter>
				</ModalContent>
			</ModalOverlay>
		</ChakraModal>
	);
}
