import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Search from './search';
import { scaleHeight, scale, verticalScale, GlobalStyle, moderateScale } from 'utils';
import Item from './item';
import { CustomerContext } from 'screen/Customer/layout';
import { ContextMain } from 'screen/Main';
import { Text } from 'components';
const { width } = Dimensions.get('window');

const data = [
	{
		code: 1001,
		content: 'Thứ Hai - 5/5/2019'
	}
];

export default class TabList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeIndex: ''
		};
	}

	setActive(index) {
		this.setState({ activeIndex: index });
	}

	renderItem(toggleOrderInput, setInforOrder) {
		const { activeIndex } = this.state;
		return data.map((dt, index) => {
			return (
				<Item
					onPress={() => {
						this.setActive(index);
						toggleOrderInput(0);
						setInforOrder(true);
					}}
					isActive={activeIndex === index ? true : false}
					key={index}
					code={dt.code}
					content={dt.content}
				/>
			);
		});
	}

	render() {
		return (
			<ContextMain.Consumer>
				{(contextMain) => (
					<CustomerContext.Consumer>
						{(context) => {
							const { toggleOrderInput } = context;
							return (
								<View style={styles.container}>
									<Search />
									<ScrollView showsVerticalScrollIndicator={false}>
										{this.renderItem(toggleOrderInput, contextMain.setInforOrder)}
										<TouchableOpacity
											activeOpacity={0.8}
											onPress={() => {
												contextMain.setInforOrder(true)
												toggleOrderInput(1);
												this.setActive('');
											}}
											style={styles.button}
										>
											<Text style={styles.txtButton} i18nKey={'textCustomerButtonInputOrder'} />
										</TouchableOpacity>
										<View style={{ height: 150 }} />
									</ScrollView>
								</View>
							);
						}}
					</CustomerContext.Consumer>
				)}
			</ContextMain.Consumer>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		marginVertical: scaleHeight('2%'),
		width: width / 2 - scale(10)
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		width: moderateScale(140, 0.25),
		height: verticalScale(35),
		backgroundColor: '#B4112C',
		marginTop: verticalScale(15)
	},
	txtButton: {
		color: '#ffffff',
		fontWeight: '600',
		fontSize: moderateScale(16),
		fontFamily: GlobalStyle.Medium
	}
});
