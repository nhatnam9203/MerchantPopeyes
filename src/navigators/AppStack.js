import AuthStack from './AuthStack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SplashScreen, HomeScreen, MethodPoints, DetailMethodPoint, Customer ,MainScreen} from '../screen';

export default createAppContainer(
	createStackNavigator(
		{
			// Splash: SplashScreen,
			// Home: HomeScreen,
			// MethodPoint: MethodPoints,
			// DetailMethodPoint: DetailMethodPoint,
			// Customer: Customer,
			// SearchPhone,
			MainScreen,
			AuthStack
		},
		{
			backBehavior: 'order',
			initialRouteName: 'AuthStack',
			headerMode: 'none'
		}
	)
);
