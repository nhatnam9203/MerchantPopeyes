import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from 'utils';
import Left from './Left';
import Right from './Right';
import { scaleWidth, GlobalStyle } from 'utils';

export default class layout extends Component {
	render() {
		const props = Object.assign({}, this.props, {
			...this.state,
			goToCollectPoint: this.goToCollectPoint,
			goToOrderHistoryRight: this.goToOrderHistoryRight,
			goToOrderListRight: this.goToOrderListRight
		});

		return (
			<View style={styles.container}>
				<View style={styles.contentLeft}>
					<Left {...props} />
				</View>

				<View style={styles.contentRight}>
					<Right {...props} ref={this.Right} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: scale(8),
		zIndex: 9999
	},
	contentLeft: {
		flex: 1,
		zIndex: 9,
		marginTop: 9,
		backgroundColor: '#FCFCFC',
		borderRightWidth: 1,
		borderRightColor: '#dddddd'
	},
	contentRight: {
		flex: 1,
		backgroundColor: '#FCFCFC'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		padding: scale(10),
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd'
	},
	imgHeader: {
		width: 28,
		height: 28,
		resizeMode: 'contain'
	},
	txtHeader: {
		marginLeft: scaleWidth(2),
		fontSize: scaleWidth(2.3),
		color: '#404040',
		fontWeight: '500',
		fontFamily: GlobalStyle.Medium
	}
});
