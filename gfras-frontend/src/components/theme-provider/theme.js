import { extendTheme } from '@chakra-ui/core';

export const theme = extendTheme({
	styles: {
		global: {
			html: {
				h: '100%'
			},
			body: {
				h: '100%',
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
