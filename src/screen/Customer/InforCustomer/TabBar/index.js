import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Dimensions, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import TabHistory from './TabHistory';
import TabList from './TabList';
import { scale, moderateScale, GlobalStyle } from 'utils';
import Configs from 'configs';
const { COLOR_MAIN_APP: { ORANGE, PLACEHOLDER } } = Configs;
const { width } = Dimensions.get('window');

const WrapTabbar = (language) => {
	return createAppContainer(
		createMaterialTopTabNavigator(
			{
				TabList: {
					screen: TabList,
					navigationOptions: {
						tabBarLabel: language === 'vi' ? 'Danh sách' : 'Order List'
					}
				},
				TabHistory: {
					screen: TabHistory,
					navigationOptions: {
						tabBarLabel: language === 'vi' ? 'Lịch sử' : 'History'
					}
				}
			},
			{
				initialRouteName: 'TabList',
				tabBarOptions: {
					activeTintColor: '#B60B28',
					inactiveTintColor: PLACEHOLDER,
					upperCaseLabel: false,
					labelStyle: {
						fontWeight: Platform.OS === 'android' ? '500' : '700',
						fontFamily: GlobalStyle.Medium,
						textAlign: 'center',
						fontSize: moderateScale(16),
						letterSpacing: 0.6
					},
					indicatorStyle: {
						borderBottomColor: ORANGE,
						borderBottomWidth: 4
					},
					tabStyle: {
						borderBottomWidth: 0,
						width: moderateScale(130)
					},
					scrollEnabled: false,
					style: {
						backgroundColor: 'white',
						width: width / 2 - scale(12),
						padding: moderateScale(5),
						elevation: 0
					}
				}
			}
		)
	);
};

export default WrapTabbar;
