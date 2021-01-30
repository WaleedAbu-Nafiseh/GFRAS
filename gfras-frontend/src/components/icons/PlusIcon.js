import * as React from 'react';
import { createIcon } from '@chakra-ui/core';

export const PlusIcon = createIcon({
	displayName: 'PlusIcon',
	path: (
		<g>
			{/*<path*/}
			{/*	fill='#3182ce'*/}
			{/*	d='M256,0C115.3,0,0,115.3,0,256s115.3,256,256,256s256-115.3,256-256S396.7,0,256,0z'*/}
			{/*/>*/}
			{/*<path*/}
			{/*	fill='#ff6d40'*/}
			{/*	d='M512,256c0,140.7-115.3,256-256,256V0C396.7,0,512,115.3,512,256z'*/}
			{/*/>*/}
			<polygon
				fill='#ff6d40'
				points='406,226 406,286 286,286 286,406 226,406 226,286 106,286 106,226 226,226 226,106 286,106 286,226 '
			/>
			<polygon
				fill='#198a9e'
				points='406,226 406,286 286,286 286,406 256,406 256,106 286,106 286,226 '
			/>
		</g>
	),
	viewBox: '0 0 512 512'
});
