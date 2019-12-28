import React, { Component } from 'react';
import ConnectRedux from '../../redux/ConnectRedux';
import { Text, View, Image, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Button from './button';
import { ContextMain } from '../Main';


class MethodPoints extends Component {
	render() {
		return (
			<ContextMain.Consumer>
				{(context) => (
					<View style={styles.content}>
						<Button
							onPress={() => {
								context.navigateRoute(2);
								context.openBarcode();
							}}
							title="textBarcode"
						/>
						<Button
							onPress={() => {
								context.navigateRoute(2);
								context.openSearchPhone();
							}}
							title="textPhone"
						/>
					</View>
				)}
			</ContextMain.Consumer>
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
