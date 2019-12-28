import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Item from './itemInfor';
import { scaleWidth, scale, verticalScale, GlobalStyle } from 'utils';
import PointModal from './PointModal';
import images from 'assets';
import { moderateScale } from 'utils';
import { Text } from 'components';
import { ContextMain } from  '../../../Main'

const data = [
	{
		name: 'Combo gà sốt kiểu Pháp',
		quantity: 1,
		price: '92.000'
	},
	{
		name: 'Combo gà sốt kiểu Ý',
		quantity: 1,
		price: '92.000'
	}
];

export default class Infor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModal: false
		};
	}

	/* render danh sách OrderList */
	renderOrderList() {
		return data.map((dt, index) => {
			return (
				<View style={styles.orderItem} key={index}>
					<Text style={[ styles.textOrder ]}>{dt.name}</Text>
					<Text style={[ styles.textOrder, { width: '25%', textAlign: 'center' } ]}>{dt.quantity}</Text>
					<Text style={[ styles.textOrder, { width: '25%', textAlign: 'right' } ]}>{`${dt.price} đ`}</Text>
				</View>
			);
		});
	}

	toggleModal() {
		const { isModal } = this.state;
		this.setState({
			isModal: !isModal
		});
	}

	renderBottom() {
		return (
			<React.Fragment>
				{/* Total */}
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: verticalScale(13)
					}}
				>
					<Text style={styles.total} i18nKey={'textCustomerTotal'} />
					<Text style={styles.total}>184.000 đ</Text>
				</View>

				{/* Điểm thưởng */}
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						marginTop: verticalScale(14),
						alignItems: 'center'
					}}
				>
					<Text style={styles.point} i18nKey={'textCustomerPoint'} />
					<Image
						source={images.Level}
						style={{ width: scale(12), height: scale(12), marginLeft: scale(12) }}
					/>
					<Text style={[ styles.point, { marginLeft: scale(12) } ]}>184</Text>
				</View>

				{/* Button submit tích điểm */}
				<TouchableOpacity onPress={() => this.toggleModal()} style={styles.button}>
					<Text style={styles.buttonText} i18nKey={'textPoint'} />
				</TouchableOpacity>
			</React.Fragment>
		);
	}

	render() {
		const { isModal } = this.state;
		return (
			<ContextMain.Consumer>
				{(context) => (
					<View
						style={{
							paddingHorizontal: scale(8),
							flex: 1
						}}
					>
						{context.state.Customer.isData && (
							<ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
								<Item name={'textCustomerCode'} value={'#1001'} />
								<Item value={'Thứ 2, 26/05/2019'} name={'textCustomerTime'} />
								<Item name={'textCustomerStore'} value={'POPEYES VINMARK CỘNG HÒA'} />
								<Item name={''} value={'15-17 Cộng Hòa, P.4, Quận Tân Bình, Tp.HCM'} />
								<View style={{ marginTop: verticalScale(10) }}>
									<Item name={'textCustomerProduct'} value="" />
									<View style={{ marginTop: verticalScale(7) }} />
									{this.renderOrderList()}
									{this.renderBottom()}
								</View>
								<View style={{ height: 200 }} />
							</ScrollView>
						)}
						<PointModal close={() => this.toggleModal()} isModal={isModal} />
					</View>
				)}
			</ContextMain.Consumer>
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
		fontSize: moderateScale(14, 0.25),
		color: '#8f8f8f',
		fontFamily: GlobalStyle.Regular
	},
	total: {
		color: '#B4112C',
		fontWeight: 'bold',
		fontSize: scaleWidth('1.7%'),
		fontFamily: GlobalStyle.Weight
	},
	point: {
		color: '#4D4D4D',
		fontWeight: 'bold',
		fontSize: moderateScale(20),
		fontFamily: GlobalStyle.Weight,
		letterSpacing: 0.6
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: verticalScale(35),
		width: scale(75),
		backgroundColor: '#B4112C',
		borderRadius: 5,
		marginTop: verticalScale(15)
	},
	buttonText: {
		color: '#ffffff',
		fontWeight: '700',
		fontSize: moderateScale(16),
		letterSpacing: 0.3,
		fontFamily: GlobalStyle.Medium
	}
});
