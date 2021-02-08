import React from 'react';
import { ResponsiveBar } from 'nivo';
import { Flex } from '@chakra-ui/core';

const BarComponent = (props) => {
	return (
		<g transform={`translate(${props.x},${props.y})`}>
			<rect
				x={-3}
				y={7}
				width={props.width}
				height={props.height}
				fill='rgba(0, 0, 0, .07)'
			/>
			<rect width={props.width} height={props.height} fill={props.color} />
			<rect
				x={props.width - 5}
				width={5}
				height={props.height}
				fill={props.borderColor}
				fillOpacity={0.2}
			/>

			<text
				x={props.width - 16}
				y={props.height / 2 - 8}
				textAnchor='end'
				dominantBaseline='central'
				fill='black'
				style={{
					fontWeight: 900,
					fontSize: 15
				}}
			>
				{props.data.data.studentName}
			</text>
			<text
				x={props.width - 30}
				y={props.height / 2 + 10}
				textAnchor='end'
				dominantBaseline='central'
				fill='#302d2d'
				style={{
					fontWeight: 900,
					fontSize: 15
				}}
			>
				Grade:
			</text>
			<text
				x={props.width - 16}
				y={props.height / 2 + 10}
				textAnchor='end'
				dominantBaseline='central'
				fill={props.borderColor}
				style={{
					fontWeight: 400,
					fontSize: 13
				}}
			>
				{props.data.value}
			</text>
		</g>
	);
};

export const RaceChart = ({ barData, chartHeight }) => {
	const yearData = [...barData].sort((a, b) => a.value - b.value);
	const x = [
		{
			id: '1160563',
			studentName: 'Mariam Mustafa',
			value: 4
		},
		{
			id: '1163093',
			studentName: 'Ali Abu Al Rub',
			value: 6
		}
	];

	return (
		<Flex direction='column' align='center' w='full' h={chartHeight || '300px'}>
			<ResponsiveBar
				layout='horizontal'
				margin={{ top: 26, right: 12, bottom: 26, left: 60 }}
				data={x}
				gridXValues={[0, 6]}
				indexBy='id'
				keys={['value']}
				colors={[
					'#ffffbf',
					'#e6f598',
					'#abdda4',
					'#66c2a5',
					'#3288bd',
					'#f46d43'
				]}
				colorBy='indexValue'
				borderColor='black'
				enableGridY={false}
				axisBottom={null}
				padding={0.3}
				isInteractive={false}
				barComponent={BarComponent}
				motionStiffness={170}
				motionDamping={26}
			/>
		</Flex>
	);
};
