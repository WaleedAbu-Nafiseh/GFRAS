import React from 'react';
import { RaceChart as TopStudentsChart } from './RaceChart';

export default {
	title: 'Race Chart',
	component: TopStudentsChart
};

const barData = [
	{ id: 'Tokyo', value: 10000000 },
	{ id: 'Osaka', value: 9000000 },
	{ id: 'Nara', value: 8000000 },
	{ id: 'Kyoto', value: 7000000 },
	{ id: 'Kobe', value: 5000000 },
	{ id: 'Sapporo', value: 3000000 }
];

export const RaceChart = () => {
	return <TopStudentsChart barData={barData} />;
};
