import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import ConnectRedux from 'reduxApp/ConnectRedux';
import DropdownAlert from 'react-native-dropdownalert';
import LottieView from 'lottie-react-native';
import { scaleWidth } from 'utils';

const WrapComponent = (HocComponent) => {
	class Network extends Component {
		constructor(props) {
			super(props);
			this.state = {
				isNework: true
			};
		}

		componentDidMount() {
			this.fetchNetwork();
			this.subcribeNetwork();
		}

		renderAlertNetWork() {
			return (
				<React.Fragment>
					<DropdownAlert
						renderImage={() => (
							<View style={styles.imgAlert}>
								<LottieView source={require('../assets/json/fatchicken.json')} autoPlay loop={true} />
							</View>
						)}
						showCancel={false}
						successColor={'#F6F8FA'}
						titleStyle={{ color: '#333', fontWeight: 'bold', fontSize: 20 }}
						messageStyle={{ color: '#333', fontWeight: 'bold', fontSize: 20 }}
						ref={(ref) => (this.dropDownAlertRef = ref)}
					/>

					<DropdownAlert
						renderImage={() => (
							<View style={styles.imgAlert}>
								<LottieView source={require('../assets/json/fatchicken.json')} autoPlay loop={true} />
							</View>
						)}
						showCancel={false}
						successColor={'#F26C32'}
						titleStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }}
						messageStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }}
						ref={(ref) => (this.dropDownAlertRef2 = ref)}
					/>
				</React.Fragment>
			);
		}

		fetchNetwork() {
			NetInfo.fetch().then((state) => {
				const { isNetwork } = this.state;
				if (state.isConnected === false) {
					this.dropDownAlertRef.alertWithType(
						'success',
						'Mất mạng :(',
						'Hiện tại không có kết nối internet !!!'
					);
				}
				if (state.isConnected === true && isNetwork === false) {
					this.dropDownAlertRef2.alertWithType(
						'success',
						'Có mạng lại rồi :)',
						'Đã kết nối lại internet !!!'
					);
				}
				this.setState({ isNetwork: state.isConnected });
			});
		}

		subcribeNetwork() {
			NetInfo.addEventListener(async (state) => {
				const { isNetwork } = this.state;
				if (state.isConnected === false) {
					this.dropDownAlertRef.alertWithType(
						'success',
						'Mất mạng :(',
						'Hiện tại không có kết nối internet !!!'
					);
				}
				if (state.isConnected === true && isNetwork === false) {
					this.dropDownAlertRef2.alertWithType(
						'success',
						'Có mạng lại rồi :)',
						'Đã kết nối lại internet !!!'
					);
				}
				this.setState({ isNetwork: state.isConnected });
			});
		}

		render() {
			const props = {
				...this.props,
				isNetwork: this.state.isNework
			};

			return (
				<React.Fragment>
					{this.renderAlertNetWork()}
					<HocComponent {...props} />
				</React.Fragment>
			);
		}
	}

	const NetworkPage = ConnectRedux(null, Network);
	return NetworkPage;
};

const styles = StyleSheet.create({
	imgAlert: {
		width: 70,
		height: 70
	}
});

export default WrapComponent;
