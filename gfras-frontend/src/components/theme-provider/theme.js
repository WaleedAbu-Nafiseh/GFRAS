import { extendTheme } from '@chakra-ui/core';
import { components } from './components/index';

export const theme = extendTheme({
	styles: {
		global: {
			html: {
				overflow: 'hidden',
				h: '100%'
			},
			body: {
				overflow: 'hidden',
				h: '100%',
				margin: '0',
				scrollbarWidth: 'thin',
				scrollbarColor: ' #c3c3c3 transparent',
				'#root': {
					overflow: 'hidden'
				}
			}
		}
	},
	components
});
