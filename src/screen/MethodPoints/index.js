import React, { Component } from 'react';
import ConnectRedux from '../../redux/ConnectRedux';
import { View, StyleSheet } from 'react-native';

import Button from './button';

class MethodPoints extends Component {
	render() {
		return (
			<View style={styles.content}>
				<Button
					onPress={() => {
						this.props.navigateTo('DetailMethod');
						this.props.openBarcode();
					}}
					title="textBarcode"
				/>
				<Button
					onPress={() => {
						this.props.navigateTo('DetailMethod');
						this.props.openSearchPhone();
					}}
					title="textPhone"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	}
});

const mapStateToProps = (state) => ({
	token: state.dataLocal
});
export default ConnectRedux(mapStateToProps, MethodPoints);
