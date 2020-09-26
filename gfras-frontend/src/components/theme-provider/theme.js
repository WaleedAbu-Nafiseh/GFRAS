import { extendTheme } from '@chakra-ui/core';

export const theme = extendTheme({
	styles: {
		global: {
			html: {
				h: 'full'
			},
			body: {
				h: 'full',
				margin: '0',
				'#root': {
					h: 'full',
					display: 'flex',
					flexDir: 'column'
				}
			}
		}
	}
});
