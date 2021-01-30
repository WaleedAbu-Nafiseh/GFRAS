import React from 'react';
import { ThemeProvider as ChakraThemProvider, CSSReset } from '@chakra-ui/core';
import { theme } from './theme';

function ThemeProvider({ children }) {
	return (
		<ChakraThemProvider theme={theme}>
			<CSSReset />
			{children}
		</ChakraThemProvider>
	);
}

export default ThemeProvider;
