import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { GlobalProvider } from 'contexts/GlobalContext';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<HashRouter>
				<Switch>
					<GlobalProvider>
						<Route path={`/admin`} component={AdminLayout} />
						<Redirect from='/' to='/admin' />
					</GlobalProvider>
				</Switch>
			</HashRouter>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
