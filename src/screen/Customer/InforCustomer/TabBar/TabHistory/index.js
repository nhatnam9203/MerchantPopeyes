import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions,KeyboardAvoidingView } from 'react-native';
import Search from '../TabList/search';
import { scaleHeight, scale, verticalScale } from 'utils';
import Item from '../TabList/item';
import { CustomerContext } from 'screen/Customer/layout';
import { ContextMain } from 'screen/Main';

const { width } = Dimensions.get('window');

const data = [
	{
		code: 1001,
		content: 'Thứ Hai - 5/5/2019'
	},
	{
		code: 1002,
		content: 'Thứ Hai - 5/5/2019'
	},
	{
		code: 1003,
		content: 'Thứ Hai - 5/5/2019'
	},
	{
		code: 1004,
		content: 'Thứ Hai - 5/5/2019'
	},
	{
		code: 1005,
		content: 'Thứ Hai - 5/5/2019'
	}
];

export default class TabList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: '',
			searchValue: ''
		};
	}

	onChangeSearch(searchValue) {
		this.setState({
			searchValue
		});
	}

	setActive(index) {
		this.setState({ activeIndex: index });
	}

	renderItem(toggleOrderInput, setInforOrder) {
		const { activeIndex, searchValue } = this.state;

		// const dataList = this.state.searchValue
		// 	? data.filter((dt) => dt.code.toString().indexOf(searchValue.toString()) !== -1)
		// 	: data;

		const dataList = data;


		if(dataList.length === 0){
			return <Text style={{
				marginTop : 10,
				fontSize : scale(10),
				letterSpacing : 0.3
			}}>Không có đơn hàng</Text>
		}

		return dataList.map((dt, index) => {
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
								<View
									style={{
										marginVertical: scaleHeight('2%'),
										width: width / 2 - scale(12)
									}}
								>
									<Search
										text={this.state.searchValue}
										onChange={(searchValue) => this.onChangeSearch(searchValue)}
									/>
									<ScrollView showsVerticalScrollIndicator={false}>
										{this.renderItem(toggleOrderInput, contextMain.setInforOrder)}
										<View style={{ height: 180 }} />
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
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		width: scale(80),
		height: verticalScale(35),
		backgroundColor: '#B4112C',
		marginTop: verticalScale(15)
	},
	txtButton: {
		color: '#ffffff',
		fontWeight: '600',
		fontSize: scale(8)
	}
});
