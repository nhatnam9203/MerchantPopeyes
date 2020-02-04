import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Search from './search';
import { scale, verticalScale, GlobalStyle, scaleWidth } from 'utils';
import Item from './item';
import { Text } from 'components';
import ConnectRedux from 'reduxApp/ConnectRedux';
import { TouchableRipple } from 'react-native-paper';
import { PopupYesNo } from 'components';
const { width } = Dimensions.get('window');

class TabList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: '',
			isDelete: false,
			contentDelete: '',
			searchValue: ''
		};
	}

	search = (valueSearch) => {
		this.props.actions.customer.searchOrderList(valueSearch);
	};

	setActive(index) {
		this.setState({ activeIndex: index });
	}

	deleteItem(content) {
		const { isDelete } = this.state;
		this.setState({ isDelete: !isDelete });
		this.setState({ contentDelete: content });
	}

	onPressItem(index, item) {
		this.setActive(index);
		this.props.goToOrderListRight();
		this.props.actions.order.inforOrder(true);
		this.props.actions.customer.detailOrder(item);
	}

	renderItemOrder() {
		const { activeIndex } = this.state;
		const { orderList, orderListFilter } = this.props;
		let data = [];

		let tempOrders = orderList.filter((obj)=>obj.pos_order_id === 0);

		if (tempOrders.length === 0 || !orderList) {
			return <Text style={styles.textNoItem}>Không có đơn hàng</Text>;
		} else {
			if (orderListFilter.length > 0) {
				data = orderListFilter;
			} else {
				data = tempOrders;
			}
		}

		return data.filter((dt) => dt.items.length > 0).map((dt, index) => {
			return (
				<Item
					onPressDelete={(content) => this.deleteItem(content)}
					onPress={() => this.onPressItem(index, dt)}
					isActive={activeIndex === index ? true : false}
					key={index}
					code={dt.order_id}
					content={dt.datetime}
				/>
			);
		});
	}

	renderButtonCollectPoint() {
		return (
			<TouchableRipple
				hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
				rippleColor="red"
				onPress={this.createCollectPoint}
				style={styles.button}
			>
				<Text style={styles.txtButton} i18nKey={'textCustomerButtonInputOrder'} />
			</TouchableRipple>
		);
	}

	createCollectPoint = () => {
		this.props.goToCollectPoint();
		this.setActive('');
		this.props.actions.order.inforOrder(true);
	};

	render() {
		return (
			<React.Fragment>
				<View style={styles.container}>
					<Search onPressSearch={this.search} />
					<ScrollView showsVerticalScrollIndicator={false}>
						{this.renderItemOrder()}
						{this.renderButtonCollectPoint()}
						<View style={{ height: 150 }} />
					</ScrollView>
				</View>
				<PopupYesNo
					title={this.state.title}
					content={this.state.contentDelete}
					isModal={this.state.isDelete}
					onPressYes={() => this.deleteItem('')}
					onPressNo={() => this.deleteItem('')}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	orderList: state.customer.orderList,
	orderListFilter: state.customer.orderListFilter
});

export default ConnectRedux(mapStateToProps, TabList);

const styles = StyleSheet.create({
	container: {
		width: width / 2 - scale(10)
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		width: scaleWidth(18),
		height: scaleWidth(5),
		backgroundColor: '#B4112C',
		marginTop: verticalScale(15)
	},
	txtButton: {
		color: '#ffffff',
		fontWeight: '600',
		fontSize: scaleWidth(1.8),
		fontFamily: GlobalStyle.Medium
	},
	textNoItem: {
		fontSize: scaleWidth(2),
		marginTop: scaleWidth(1.8)
	}
});
