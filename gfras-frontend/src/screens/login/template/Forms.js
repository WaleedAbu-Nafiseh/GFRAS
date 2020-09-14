import React, { useContext, useState } from 'react';
import { SignIn } from '../organisms';
import { Heading, Flex, Button, Text } from '@chakra-ui/core';
import { useIntl } from 'react-intl';
import { SignUp } from '../organisms/SignUp';
import { AuthContext } from '../../../components/auth-provider';

export function Forms() {
	const { formatMessage } = useIntl();
	const [showSignIn, setShowSignIn] = useState(true);
	const { setErrMessage } = useContext(AuthContext);

	return (
		<>
			<Flex direction='column'>
				<Flex direction='column' align='center'>
					<Heading display='inline' color='rgba(0,0,0,0.74)'>
						{showSignIn
							? formatMessage({ id: 'login.signIn.signInToGfras' })
							: formatMessage({ id: 'login.signUp.signUpToGfras' })}
					</Heading>
				</Flex>
				{showSignIn ? <SignIn /> : <SignUp />}
				<Flex mt='26px' justify='center' align='center'>
					<Text fontSize={16} fontWeight='bold' color='rgba(0,0,0,0.6)'>
						{showSignIn
							? formatMessage({ id: 'landingPage.signIn.newToGfras' })
							: formatMessage({
									id: 'landingPage.signUp.alreadyHaveAnAccount'
							  })}
					</Text>
					<Button
						bg='transparent'
						onClick={() => {
							setErrMessage('');
							setShowSignIn((prevState) => !prevState);
						}}
						fontSize={16}
						color='rgb(0,115,207)'
						_focus={{ bg: 'none' }}
						_hover={{ bg: 'none' }}
						_active={{ bg: 'none' }}
					>
						{showSignIn
							? formatMessage({ id: 'landingPage.signUp.signUpButton' })
							: formatMessage({ id: 'landingPage.signIn.signInButton' })}
					</Button>
				</Flex>
			</Flex>
		</>
	);
}
