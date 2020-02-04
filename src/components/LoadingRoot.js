import React, { Component } from 'react';
import { Text, View, ActivityIndicator,Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { scaleWidth } from '../utils';

export default class LoadingRoot extends Component {
	render() {
		return (
			<View
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'rgba(255,255,255,0.4)',
					zIndex: 99999
				}}
			>
				<LottieView source={require('../assets/json/10389-bike-ride.json')} autoPlay loop />
				{/* <View
					style={{
						backgroundColor: 'rgba(0,0,0,0.4)',
						borderRadius: 15,
						height: scaleWidth(15),
						width: scaleWidth(15),
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					
						<ActivityIndicator color={'red'} size='large' />
				</View> */}
			</View>
		);
	}
}
