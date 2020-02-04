import { SigninScreen, SplashScreen } from '../screen';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
export default createStackNavigator(
	{
		Signin: SigninScreen,
		Splash: SplashScreen
	},
	{
		initialRouteName: 'Splash',
		headerMode: 'none'
	}
);
