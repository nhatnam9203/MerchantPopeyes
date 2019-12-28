import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Button from './button';
import ModalPromotion from './ModalPromotion'
export default class Layout extends Component {
	render() {
		return (
			<Header
				onPress={() => this.props.navigation.goBack()}
				isRight={true}
				isBotLeft={true}
				isBack={true}
				goBack={this.goBack}
			>
				<View style={styles.content}>
					<Button onPress={() => this.gotoDetail('Mã khách hàng', 'Barcode')} title="Barcode" />
					{/* <Button onPress={() => this.props.navigation.navigate('SearchPhone')} title="Số điện thoại" /> */}
				</View>
				{this.renderModalPromotion()}
			</Header>
		);
	}

	renderModalPromotion(){
		return(
			<ModalPromotion />
		)
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
