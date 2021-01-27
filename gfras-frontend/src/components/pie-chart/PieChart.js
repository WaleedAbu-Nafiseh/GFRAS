import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Flex, useBreakpointValue } from '@chakra-ui/core';

const pieChartDefaultDefs = [
	{
		id: 'dots',
		type: 'patternDots',
		background: 'inherit',
		color: '#9ce8d6',
		size: 3,
		padding: 3
	},
	{
		id: 'lines',
		type: 'patternLines',
		background: 'inherit',
		color: '#b1d9d0',
		rotation: -40,
		lineWidth: 1,
		spacing: 7
	}
];

const defaultFill = [
	{ index: 0, type: 'lines' },
	{ index: 1, type: 'dots' }
];

const pieBorderColor = {
	from: 'color',
	modifiers: [['darker', 0.2]]
};
const radialLabelsLinkColor = { from: 'color' };

export const PieChart = ({
	customColorName,
	customFill,
	data,
	keys,
	chartHeight,
	...rest
}) => {
	const breakPointValue = useBreakpointValue({
		base: {
			enableRadialLabels: false,
			margin: { top: 20, right: 40, bottom: 10, left: 40 }
		},
		md: {
			enableRadialLabels: true,
			margin: { top: 29, right: 40, bottom: 20, left: 40 }
		}
	});

	return (
		<>
			<Flex
				direction='column'
				align='center'
				w='full'
				h={chartHeight || '300px'}
			>
				<ResponsivePie
					startAngle={-290}
					data={data}
					innerRadius={0.6}
					borderWidth={1}
					borderColor={pieBorderColor}
					radialLabelsTextXOffset={3}
					fill={defaultFill}
					radialLabelsTextColor='rgba(0,0,0,0.38)'
					defs={pieChartDefaultDefs}
					radialLabelsLinkOffset={-8}
					radialLabelsLinkHorizontalLength={11}
					radialLabelsLinkColor={radialLabelsLinkColor}
					enableSliceLabels={false}
					theme={theme}
					isInteractive={false}
					{...breakPointValue}
					{...rest}
				/>
			</Flex>
		</>
	);
};
