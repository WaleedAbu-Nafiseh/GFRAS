import React from 'react';
import { Input, Flex, FormControl, FormLabel, Button } from '@chakra-ui/core';
import { useIntl } from 'react-intl';

export function SignIn() {
	const { formatMessage } = useIntl();
	return (
		<Flex direction='column' pt='40px'>
			<FormControl>
				<form>
					<FormLabel color='rgba(18,18,18,0.38)'>
						{formatMessage({ id: 'login.form.email' })}
					</FormLabel>
					<Input type='email' borderRadius='7px' />
					<FormLabel color='rgba(18,18,18,0.38)' mt='10px'>
						{formatMessage({ id: 'login.form.password' })}
					</FormLabel>
					<Input type='password' borderRadius='7px' />
				</form>
				<Button
					mt={10}
					w='full'
					borderRadius='7px'
					bg='rgb(0,127,255)'
					_hover={{ bg: 'rgb(0,115,207)' }}
					color='white'
				>
					{formatMessage({ id: 'landingPage.signIn.signInButton' })}
				</Button>
			</FormControl>
		</Flex>
	);
}
