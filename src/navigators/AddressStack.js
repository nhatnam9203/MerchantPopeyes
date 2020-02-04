import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import City from '../screen/Customer/Left/CreateCustomer/components/City'
import District from '../screen/Customer/Left/CreateCustomer/components/District';
import Wards from '../screen/Customer/Left/CreateCustomer/components/Wards';
import Street from '../screen/Customer/Left/CreateCustomer/components/Street';

export default createAppContainer(
	createStackNavigator(
		{
			City,
			District,
			Wards,
			Street
		},
		{
			initialRouteName: 'City',
			headerMode: 'none',
			transitionConfig: () => fromRight()
		}
	)
);
