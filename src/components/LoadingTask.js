import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { scaleWidth } from '../utils';

export default class LoadingTask extends Component {
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
					backgroundColor: 'transparent',
					zIndex: 99999
				}}
			>
				<View
					style={{
						backgroundColor: 'rgba(0,0,0,0.6)',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 8,
						padding: scaleWidth(4)
					}}
				>
					<ActivityIndicator color="white" size="large" />
					<Text style={{
						color : 'white',
						fontSize : scaleWidth(2.5),
						marginTop : scaleWidth(1),
						letterSpacing : 0.6
					}}>Loading</Text>
				</View>
			</View>
		);
	}
}
