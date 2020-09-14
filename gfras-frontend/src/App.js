import React, { useContext } from 'react';
import { ChakraProvider } from '@chakra-ui/core';
import { IntlProvider } from 'react-intl';
import messages_en from './translations/en.json';
import UnAuthenticated from './UnAuthenticated';
import { AuthContext } from './components/auth-provider';
import { AuthenticatedApp } from './Authenticated';

function App() {
	const { isAuthenticated } = useContext(AuthContext);
	return (
		<IntlProvider locale='en' messages={messages_en}>
			<ChakraProvider resetCSS>
				{isAuthenticated ? <AuthenticatedApp /> : <UnAuthenticated />}
			</ChakraProvider>
		</IntlProvider>
	);
}

export default App;
