import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import messages_en from './translations/en.json';
import UnAuthenticated from './UnAuthenticated';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<BrowserRouter>
			<IntlProvider locale='en' messages={messages_en}>
				<ChakraProvider resetCSS>
					{isAuthenticated ? <>Authenticated</> : <UnAuthenticated />}
				</ChakraProvider>
			</IntlProvider>
		</BrowserRouter>
	);
}

export default App;
