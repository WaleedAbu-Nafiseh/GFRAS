import React, { useContext } from 'react';
import {
	Input,
	Flex,
	FormControl,
	FormLabel,
	Button,
	Text
} from '@chakra-ui/core';
import { useIntl } from 'react-intl';
import { AuthContext } from '../../../components/auth-provider';
import { useForm } from 'react-hook-form';

export function SignIn() {
	const { formatMessage } = useIntl();
	const { errMessage, signIn, isLoading } = useContext(AuthContext);
	const { register, handleSubmit, watch } = useForm();
	const onSubmit = handleSubmit(({ email, password }) => {
		signIn({ email: email, password: password });
	});
	return (
		<Flex direction='column' pt='40px'>
			<FormControl>
				<form onSubmit={onSubmit}>
					{!!errMessage && (
						<Text color='#E02020' fontSize={15} mb='10px' textAlign='center'>
							{formatMessage({ id: errMessage })}
						</Text>
					)}
					<FormLabel
						color={!!errMessage ? 'rgba(224,32,32,.38)' : 'rgba(18,18,18,0.38)'}
					>
						{formatMessage({ id: 'login.form.email' })}
					</FormLabel>
					<Input
						type='email'
						id='email'
						errorBorderColor='rgba(224,32,32,.38)'
						name='email'
						isInvalid={!!errMessage}
						borderRadius='7px'
						ref={register({ required: true })}
					/>
					<FormLabel
						color={!!errMessage ? 'rgba(224,32,32,.38)' : 'rgba(18,18,18,0.38)'}
						mt='10px'
					>
						{formatMessage({ id: 'login.form.password' })}
					</FormLabel>
					<Input
						type='password'
						errorBorderColor='rgba(224,32,32,.38)'
						isInvalid={!!errMessage}
						id='password'
						name='password'
						borderRadius='7px'
						ref={register({ required: true })}
					/>
					<Button
						mt={10}
						w='full'
						isDisabled={!watch('email') || !watch('password')}
						isLoading={isLoading}
						borderRadius='7px'
						type='submit'
						bg='rgb(0,127,255)'
						_hover={{ bg: 'rgb(0,115,207)' }}
						color='white'
					>
						{formatMessage({ id: 'landingPage.signIn.signInButton' })}
					</Button>
				</form>
			</FormControl>
		</Flex>
	);
}
