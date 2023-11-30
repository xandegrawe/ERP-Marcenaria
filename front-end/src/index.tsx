import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AdminLayout from './layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { GlobalProvider } from 'contexts/GlobalContext';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<BrowserRouter>
				<Switch>
					<GlobalProvider>
						<Route path={`/admin`} component={AdminLayout} />
					</GlobalProvider>
				</Switch>
			</BrowserRouter>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
