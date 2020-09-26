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
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../components/auth-provider';

export function SignUp() {
	const { formatMessage } = useIntl();
	const { errMessage, isLoading, signUp } = useContext(AuthContext);
	const { register, handleSubmit, watch } = useForm();
	const onSubmit = handleSubmit((user) => {
		signUp({ email: user.email, password: user.password });
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
						isInvalid={!!errMessage}
						id='email'
						name='email'
						errorBorderColor='rgba(224,32,32,.38)'
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
						isInvalid={!!errMessage}
						errorBorderColor='rgba(224,32,32,.38)'
						id='password'
						name='password'
						borderRadius='7px'
						ref={register({ required: true })}
					/>
					<Button
						mt={10}
						isDisabled={!watch('email') || !watch('password')}
						w='full'
						isLoading={isLoading}
						type='submit'
						borderRadius='7px'
						bg='rgb(0,127,255)'
						color='white'
						_hover={{ bg: 'rgb(0,115,207)' }}
					>
						{formatMessage({ id: 'landingPage.signUp.signUpButton' })}
					</Button>
				</form>
			</FormControl>
		</Flex>
	);
}
