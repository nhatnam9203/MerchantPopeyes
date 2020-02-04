import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { scaleWidth } from 'utils';
import Icon from 'react-native-vector-icons/AntDesign';
import NavigatorService from '../../../../../navigators/NavigatorServices'
import {LoadingTask} from 'components'
import ConnectRedux from 'reduxApp/ConnectRedux'

class HeadeeAddress extends Component {
	render() {
		const { headerText, onBack, loading } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<View style={styles.header}>
					<TouchableOpacity onPress={onBack}>
						<Icon name="arrowleft" size={scaleWidth(3.3)} color={'#ffffff'} />
					</TouchableOpacity>
					<Text style={styles.headerText}>{headerText}</Text>
					<TouchableOpacity onPress={() => NavigatorService.navigate('MainScreen')}>
						<Text style={styles.headerText}>Huỷ</Text>
					</TouchableOpacity>
				</View>

				<View style={{ flex: 1 }}>{this.props.children}</View>

				{loading && <LoadingTask />}
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.app.loading,
});

export default ConnectRedux(mapStateToProps, HeadeeAddress);

const styles = StyleSheet.create({
	header: {
		height: scaleWidth(8),
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#B80423',
		padding: scaleWidth(2)
	},
	headerRightText: {},
	headerText: {
		color: 'white',
		fontSize: scaleWidth(2.5)
	}
});
