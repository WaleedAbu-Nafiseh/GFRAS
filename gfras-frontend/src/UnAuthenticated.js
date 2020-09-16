import React, { Suspense } from 'react';
import { Flex, Spinner } from '@chakra-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as ROUTES from './constant';

const Login = React.lazy(
	() => import('./screens/login/pages') /* webpackChunkName: "Login" */
);

function UnAuthenticated() {
	return (
		<Suspense
			fallback={
				<Flex width='full' justify='center' height='900px' align='center'>
					<Spinner />
				</Flex>
			}
		>
			<Switch>
				<Route path={ROUTES.LOGIN} render={() => <Login />} />
				<Redirect from='/' to={ROUTES.LOGIN} />
			</Switch>
		</Suspense>
	);
}

export default UnAuthenticated;
