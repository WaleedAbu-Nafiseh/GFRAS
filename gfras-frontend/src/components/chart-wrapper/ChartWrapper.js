import React from 'react';
import {
	Flex,
	Tooltip,
	Divider,
	Text,
	CircularProgress,
	Heading
} from '@chakra-ui/core';
import { InfoOutlineIcon } from '../icons/InfoIcon';

export function InfoButtons({
	ToolTipText,
	withDivider = true,
	onDownLoad,
	isDisabled,
	children,
	onHover,
	...rest
}) {
	return (
		<Flex justifyContent='flex-end' align='center'>
			{children}
			{withDivider && (
				<Divider
					d={{ base: 'block', md: 'none' }}
					h='16px'
					w='2px'
					mx={3}
					color='rgba(0,0,0,0.12)'
					opacity={1}
					orientation='vertical'
				/>
			)}
			<Tooltip
				p={2}
				bg='white'
				label={ToolTipText}
				closeOnClick={false}
				hasArrow
				placement='bottom-end'
				boxShadow='0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.2)'
				aria-label='chart-info'
				borderRadius='12px'
				color='rgba(18,18,18,0.87)'
				fontSize='xs'
				onOpen={onHover}
			>
				<InfoOutlineIcon boxSize='16px' color='rgba(0,0,0,0.74)' />
			</Tooltip>
		</Flex>
	);
}

export function ChartWrapper({ width, children, ...rest }) {
	return (
		<Flex
			w='full'
			bg='white'
			border='1px solid'
			direction='column'
			borderColor='gray.100'
			borderRadius='16px'
			alignItems='center'
			overflow='auto'
			overflowX='hidden'
			height='fit-content'
			{...rest}
		>
			{children}
		</Flex>
	);
}

const Header = ({ children, title, ...rest }) => {
	return (
		<Flex w='full' wrap='wrap' justify='space-between' align='center' {...rest}>
			{title && (
				<Heading
					as='h4'
					size='sm'
					color='gray.500'
					isTruncated
					fontSize={['14px', '18px']}
					flex={{ base: 1, md: '0 auto' }}
				>
					{title}
				</Heading>
			)}
			{children}
		</Flex>
	);
};

const Content = ({ children, ...rest }) => {
	return (
		<Flex
			direction='column'
			boxSizing='border-box'
			w='100%'
			maxH='full'
			flex='1'
			{...rest}
		>
			{children}
		</Flex>
	);
};

const Footer = ({ children, withDivider = true, ...rest }) => {
	return (
		<Flex w='full' direction='column' {...rest}>
			{withDivider && (
				<Divider
					w='full'
					pl={10}
					my={3}
					ml='-20px'
					borderColor='rgba(0,0,0,0.12)'
				/>
			)}
			{children}
		</Flex>
	);
};

export function CardContainer({ error, status, Loader, children }) {
	if (status === 'loading' || status === 'idle')
		return (
			<>
				{Loader ? (
					Loader
				) : (
					<CircularProgress
						gridArea='main'
						isIndeterminate
						m='auto'
						color='primary.500'
					/>
				)}
			</>
		);

	if (status === 'success') return <>{children}</>;
	else return null;
}

ChartWrapper.Header = Header;
ChartWrapper.Content = Content;
ChartWrapper.Footer = Footer;
