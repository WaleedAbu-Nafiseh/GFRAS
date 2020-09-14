import React, { Suspense } from 'react';
import { Flex, Spinner } from '@chakra-ui/core';
import * as ROUTES from './constant';
import { Switch, Route, Redirect } from 'react-router-dom';

export function AuthenticatedApp() {
	return (
		<Suspense
			fallback={
				<Flex width='full' justify='center' height='900px' align='center'>
					<Spinner />
				</Flex>
			}
		>
			<Switch>
				<Route path={ROUTES.DASHBOARD} render={() => <>Authenticated</>} />
				<Redirect from='/' to={ROUTES.DASHBOARD} />
			</Switch>
		</Suspense>
	);
}
