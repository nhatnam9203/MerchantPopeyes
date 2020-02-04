import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import InforUser from './InforUser';
import image from 'assets';
import TabList from './TabList';
import TabHistory from './TabHistory';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'components';
import { scaleWidth, moderateScale, verticalScale } from 'utils';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

AndroidKeyboardAdjust.setAdjustPan();
AndroidKeyboardAdjust.setUnchanged();

class InforCustomer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabbar: 1,
			isKeyBoard: false
		};
	}

	// showKeyBoard = () => {
	// 	this.setState({
	// 		isKeyBoard: true
	// 	});
	// };

	// hideKeyBoard = () => {
	// 	this.setState({
	// 		isKeyBoard: false
	// 	});
	// 	this.refs.scrollLeft.scrollTo(0);
	// };

	renderTab() {
		return (
			<View style={styles.tabContainer}>
				<TouchableOpacity
					onPress={() => this.setState({ tabbar: 1 })}
					style={{
						width: moderateScale(100, 0.25)
					}}
				>
					<Text
						style={[
							styles.tabItem,
							{
								color: this.state.tabbar === 1 ? '#B60B28' : '#585858',
								borderBottomColor: this.state.tabbar === 1 ? '#F26C32' : 'white'
							}
						]}
					>
						Danh sách
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => this.setState({ tabbar: 2 })}
					style={{
						width: moderateScale(100, 0.25)
					}}
				>
					<Text
						style={[
							styles.tabItem,
							{
								color: this.state.tabbar === 2 ? '#B60B28' : '#585858',
								borderBottomColor: this.state.tabbar === 2 ? '#F26C32' : 'white'
							}
						]}
					>
						Lịch sử
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	render() {
		const { tabbar } = this.state;
		const { inforCustomer } = this.props;
		return (
			<ScrollView showsVerticalScrollIndicator={false} ref={'scrollLeft'} style={styles.content}>
				<InforUser inforCustomer={inforCustomer} />
				<Title name={'textTitleInvoice'} image={image.Order} />
				{this.renderTab()}
				{tabbar === 1 && <TabList {...this.props} />}
				{tabbar === 2 && <TabHistory {...this.props} />}
			</ScrollView>
		);
	}
}

const Title = ({ name, image }) => (
	<View style={styles.container}>
		<Image source={image} resizeMode="contain" style={{ width: 28, height: 28 }} />
		<Text style={styles.title} i18nKey={name} />
	</View>
);

const styles = StyleSheet.create({
	content: { marginHorizontal: 0, flex: 1 },
	tabContainer: {
		flexDirection: 'row',
		display: 'flex',
		width: '100%',
		paddingVertical: 15
	},
	tabItem: {
		fontSize: scaleWidth(2),
		borderBottomWidth: 5,
		textAlign: 'center'
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: verticalScale(24)
	},
	title: {
		fontSize: scaleWidth(2.3),
		fontWeight: 'bold',
		margin: 15,
		color: '#404040'
	}
});

export default InforCustomer;
