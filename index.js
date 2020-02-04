/**
 * @format
 */
/* 
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App); */
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import AppNavigators from './src/navigators/AppStack';
import configureStore from './src/redux/store';
import { name as appName } from './app.json';
import NavigatorServices from './src/navigators/NavigatorServices';
import { Provider as PaperProvider } from 'react-native-paper';

console.disableYellowBox = true;

class App extends Component {
	render() {
		const { store, persistor } = configureStore();
		return (
			<Provider store={store}>
				<PersistGate
					loading={<View style={{ flex: 1, backgroundColor: 'transparent' }} />}
					persistor={persistor}
				>
					<PaperProvider>
						<AppNavigators
							ref={(navigatorRef) => {
								NavigatorServices.setContainer(navigatorRef);
							}}
						/>
					</PaperProvider>
				</PersistGate>
			</Provider>
		);
	}
}

AppRegistry.registerComponent(appName, () => App);
