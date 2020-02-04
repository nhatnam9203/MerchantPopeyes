import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { moderateScale, GlobalStyle, scaleWidth } from 'utils';
import ConnectRedux from 'reduxApp/ConnectRedux';

class InforHistory extends PureComponent {
	render() {
		return (
			<View style={styles.wrap}>
				<View style={styles.row}>
					<Text style={styles.title}>Mã đơn hàng</Text>
					<Text style={styles.content}>#{detailOrderHistory.order_id}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.title}>Thời gian</Text>
					<Text style={styles.content}>{detailOrderHistory.datetime}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.title}>Số tiền thanh toán</Text>
					<Text style={styles.content}>{detailOrderHistory.grand_total} đ</Text>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	detailOrderHistory : state.customer.detailOrderHistory
})



const styles = StyleSheet.create({
	wrap: {
		padding: 20,
		flex: 1
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: moderateScale(15, 0.25)
	},
	title: {
		fontSize: scaleWidth(1.7),
		letterSpacing: 0.3,
		fontFamily: GlobalStyle.Medium
	},
	content: {
		fontSize: scaleWidth(1.7),
		letterSpacing: 0.3,
		fontFamily: GlobalStyle.Normal
	}
});

export default ConnectRedux(mapStateToProps, InforHistory);
