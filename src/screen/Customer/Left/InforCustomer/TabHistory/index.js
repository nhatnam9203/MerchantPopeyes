import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Search from '../TabList/search';
import { scale, verticalScale } from 'utils';
import Item from './item';
import ConnectRedux from 'reduxApp/ConnectRedux';
const { width } = Dimensions.get('window');

class TabHistory extends Component {
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

	onPressItem(index) {
		this.setActive(index);
		this.props.goToOrderHistoryRight();
		this.props.actions.customer.detailOrderHistory(item);
		// this.props.actions.order.inforOrder(true);
	}

	renderItemHistory() {
		const { activeIndex } = this.state;

		const { orderList, orderListHistoryFilter } = this.props;
		
		console.log({orderList})

		let data = [];

		let tempOrders = orderList.filter((obj) => obj.pos_order_id !== 0 && obj.items.length > 0);;

		if (tempOrders.length === 0 || !orderList) {
			return <Text style={styles.textNoItem}>Không có đơn hàng</Text>;
		} else {
			if (orderListHistoryFilter.length > 0) {
				data = orderListHistoryFilter;
			} else {
				data = tempOrders;
			}
		}

		return data.map((dt, index) => {
			return (
				<Item
					onPress={() => this.onPressItem(index)}
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
			<View
				style={{
					width: width / 2 - scale(10)
				}}
			>
				<Search text={this.state.searchValue} onChange={(searchValue) => this.onChangeSearch(searchValue)} />
				<ScrollView showsVerticalScrollIndicator={false}>
					{this.renderItemHistory()}
					<View style={{ height: 180 }} />
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	orderList: state.customer.orderList,
	orderListHistoryFilter: state.customer.orderListHistoryFilter
});

export default ConnectRedux(mapStateToProps, TabHistory);

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
	},
	textNoItem: {
		marginTop: 10,
		fontSize: scale(10),
		letterSpacing: 0.3
	}
});
