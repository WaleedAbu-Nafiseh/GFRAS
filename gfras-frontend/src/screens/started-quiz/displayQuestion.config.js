import React from 'react';
import { Jupiter } from '../../components/icons/Jupiter';
import { Mars } from '../../components/icons/Mars';
import { Neptune } from '../../components/icons/Neptune';
import { Mercury } from '../../components/icons/Mercury';

export const optionsBackgroundColors = [
	'#03254c',
	'#1167b1',
	'#187bcd',
	'#2a9df4'
];
export const hoverOptionsBackgroundColor = [
	'#11256b',
	'#1257B1',
	'#1c69cd',
	'#2d8ff4'
];

const iconsStyle = {
	position: 'absolute',
	left: '3',
	top: '24.5px',
	alignSelf: 'center'
};

export const ANSWER_OPTIONS = [
	{ name: 'optionA', icon: <Mars {...iconsStyle} /> },
	{ name: 'optionB', icon: <Neptune {...iconsStyle} /> },
	{ name: 'optionC', icon: <Jupiter {...iconsStyle} /> },
	{ name: 'optionD', icon: <Mercury {...iconsStyle} /> }
];
