import AuthStack from './AuthStack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MainScreen } from '../screen';
import AddressStack from './AddressStack';

export default createAppContainer(
	createStackNavigator(
		{
			MainScreen,
			AuthStack,
			AddressStack
		},
		{
			backBehavior: 'order',
			initialRouteName: 'AuthStack',
			headerMode: 'none'
		}
	)
);
