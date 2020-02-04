import React, { Component } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import Item from './itemInfor';
import { scaleWidth, scale, verticalScale, GlobalStyle } from 'utils';
import PointModal from './PointModal';
import images from 'assets';
import { Text } from 'components';
import { TouchableRipple } from 'react-native-paper';
import moment from 'moment';

function currency(x) {
	return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(x);
}

export default class Infor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModal: false
		};
	}

	getTotal() {
		const { detailOrder } = this.props;
		if (detailOrder) {
			const { items } = detailOrder;
			let total = 0;
			items.forEach((it) => {
				total += parseInt(it.itemprice) * parseInt(it.qty_ordered);
			});
			return currency(total);
		}
	}

	getPoints() {
		return Math.floor(this.getTotal() / 10000);
	}

	submitOrder = async () => {
		const { detailOrder, merchant } = this.props;
		const { customer_id, order_id } = detailOrder;
		const { store_id } = merchant;

		let total = 0;
		detailOrder.items.forEach((it) => {
			total += parseInt(it.itemprice) * parseInt(it.qty_ordered);
		});

		this.props.actions.customer.submitOrder({
			customer_id,
			pos_order_id: order_id,
			store_id,
			amount: total,
			resolve,
			rejects
		});

		// const _promise = await new Promise((resolve, rejects) => {
		// 	this.props.actions.customer.submitOrder({
		// 		customer_id,
		// 		pos_order_id: order_id,
		// 		store_id,
		// 		amount: total,
		// 		resolve,
		// 		rejects
		// 	});
		// });

		// if (_promise.success) {
		// 	this.setState({
		// 		isModal: !this.state.isModal
		// 	});
		// }
	};

	formatCurrency(str) {
		let chuoi = '';
		for (let i = 0; i < str.length; i++) {
			if (str[i] !== '.') {
				chuoi += str[i];
			} else {
				break;
			}
		}
		return chuoi + ' đ';
	}

	openModalOrder = () => {
		this.setState({ isModal: true });
	};

	closeModalOrder = () => {
		this.setState({ isModal: false });
		this.props.actions.customer.resetSubmitOrder();
	};

	componentDidUpdate(prevProps) {
		const { isSubmitOrder } = this.props;
		if (prevProps.isSubmitOrder !== isSubmitOrder && isSubmitOrder === true) {
			this.openModalOrder();
		}
	}

	/* render danh sách OrderList */
	renderOrderList() {
		const { detailOrder } = this.props;
		if (detailOrder) {
			const { items } = detailOrder;
			return items.map((dt, index) => {
				return (
					<View style={styles.orderItem} key={index}>
						<Text style={[ styles.textOrder ]}>{dt.itemname}</Text>

						<Text style={[ styles.textOrder, { width: '25%', textAlign: 'center' } ]}>
							{parseInt(dt.qty_ordered)}
						</Text>

						<Text style={[ styles.textOrder, { width: '25%', textAlign: 'right' } ]}>
							{currency(parseInt(dt.itemprice))}
						</Text>
					</View>
				);
			});
		}
	}

	renderBottom() {
		const { detailOrder } = this.props;
		const { points_of_order } = detailOrder;
		return (
			<React.Fragment>
				{/* Total */}
				<View style={styles.wrapList}>
					<Text style={styles.total} i18nKey={'textCustomerTotal'} />
					<Text style={styles.total}>{this.getTotal()}</Text>
				</View>

				{/* Điểm thưởng */}
				<View style={styles.wrapPoint}>
					<Text style={styles.point} i18nKey={'textCustomerPoint'} />
					<Image source={images.Level} style={styles.imgLevel} />
					<Text style={[ styles.point, { marginLeft: scaleWidth(2) } ]}>{points_of_order}</Text>
				</View>

				{/* Button submit tích điểm */}
	{/* 			<TouchableRipple rippleColor="red" onPress={this.submitOrder} style={styles.button}>
					<Text style={styles.buttonText} i18nKey={'textPoint'} />
				</TouchableRipple> */}
			</React.Fragment>
		);
	}

	render() {
		const { isModal } = this.state;
		const { detailOrder, inforCustomer } = this.props;
		const { pickup_store_info } = detailOrder;
		const time = `${moment(detailOrder.datetime).format('dddd')} , ${moment(detailOrder.datetime).format(
			'DD/MM/YYYY'
		)}`;

		if (!detailOrder) return null;
		else
			return (
				<View
					style={{
						paddingHorizontal: scale(8),
						flex: 1
					}}
				>
					<ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
						<Item name={'textCustomerCode'} value={detailOrder.coupon_code} />
						<Item name={'textCustomerTime'} value={time} />
						<Item
							name={'textCustomerStore'}
							value={
								pickup_store_info && pickup_store_info.length > 0 ? pickup_store_info[0].store_name : ''
							}
						/>
						<Item
							name={''}
							value={
								pickup_store_info && pickup_store_info.length > 0 ? pickup_store_info[0].address : ''
							}
						/>
						<View style={{ marginTop: verticalScale(10) }}>
							<Item name={'textCustomerProduct'} value="" />
							<View style={{ marginTop: verticalScale(7) }} />
							{this.renderOrderList()}
							{this.renderBottom()}
						</View>
						<View style={{ height: 200 }} />
					</ScrollView>

					<PointModal inforCustomer={inforCustomer} close={this.closeModalOrder} isModal={isModal} />
				</View>
			);
	}
}

const styles = StyleSheet.create({
	orderItem: {
		display: 'flex',
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd',
		flexDirection: 'row',
		marginTop: verticalScale(7),
		paddingBottom: verticalScale(7)
	},
	textOrder: {
		width: '50%',
		fontWeight: '300',
		fontSize: scaleWidth(1.7),
		color: '#8f8f8f',
		fontFamily: GlobalStyle.Regular
	},
	imgLevel: {
		width: scaleWidth(2.5),
		height: scaleWidth(2.5),
		marginLeft: scaleWidth(2)
	},
	wrapList: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: verticalScale(13)
	},
	total: {
		color: '#B4112C',
		fontWeight: 'bold',
		fontSize: scaleWidth(1.9),
		fontFamily: GlobalStyle.Weight
	},
	wrapPoint: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: verticalScale(14),
		alignItems: 'center'
	},
	point: {
		color: '#4D4D4D',
		fontWeight: 'bold',
		fontSize: scaleWidth(2.1),
		fontFamily: GlobalStyle.Weight,
		letterSpacing: 0.6
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: scaleWidth(15),
		height: scaleWidth(5),
		backgroundColor: '#B4112C',
		borderRadius: 5,
		marginTop: scaleWidth(2)
	},
	buttonText: {
		color: '#ffffff',
		fontWeight: '700',
		fontSize: scaleWidth(1.8),
		letterSpacing: 0.3,
		fontFamily: GlobalStyle.Medium
	}
});
