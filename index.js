/**
 * @format
 */
/* 
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App); */
import React, { Component } from 'react'
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import AppNavigators from './src/navigators/AppStack';
import configureStore from './src/redux/store';
import { name as appName } from './app.json';
import NavigatorServices from './src/navigators/NavigatorServices';
import { Loading, Connection } from "./src/components";

// ß

// var updateDialogOptions = {
//     updateTitle: "You have an update",
//     optionalUpdateMessage: "Update available. Install now?",
//     optionalIgnoreButtonLabel: "Ignore",
//     optionalInstallButtonLabel: "Yes",
//   };
  
console.disableYellowBox = true;

class App extends Component {

    // componentDidMount() {
    //     CodePush.sync({
    //       updateDialogOptions,
    //       updateDialog: true,
    //       installMode: CodePush.InstallMode.IMMEDIATE,
    //       checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    //     })
    //   }

    render() {
        const { store, persistor } = configureStore();
        return (
            <Provider store={store}>
                <PersistGate
                    loading={<View style={{ flex: 1, backgroundColor: 'transparent' }} />}
                    persistor={persistor}>
                    <Connection>
                        <AppNavigators
                            ref={navigatorRef => {
                                NavigatorServices.setContainer(navigatorRef);
                            }}
                        />
                        {/* <Loading /> */}
                    </Connection>
                </PersistGate>
            </Provider>
        );
    }
}

// const Root = CodePush(App)

AppRegistry.registerComponent(appName, () => App);