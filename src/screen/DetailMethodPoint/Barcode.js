import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { ButtonDefault } from 'components';
import image from 'assets';
import { scale, verticalScale, GlobalStyle, scaleWidth, scaleHeight } from 'utils';
import { Text, TextInput } from 'components';
import ConnectRedux from 'reduxApp/ConnectRedux';
import Scanner from './Scanner';

class Barcode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marginTopWrapInput: scaleHeight(10),
			hideTitle: false,
			code: '5789784970047172',
			isScanner: false
		};
	}

	componentDidMount() {
		this.showKey = Keyboard.addListener('keyboardDidShow', this.showKeyBoard);
		this.hideKey = Keyboard.addListener('keyboardDidHide', this.hideKeyBoard);
	}

	componentWillUnmount() {
		this.showKey.remove();
		this.hideKey.remove();
	}

	showKeyBoard = (e) => {
		this.setState({
			marginTopWrapInput: scaleWidth(0),
			hideTitle: true
		});
	};

	hideKeyBoard = (e) => {
		this.setState({
			marginTopWrapInput: scaleHeight(10),
			hideTitle: false
		});
	};

	changeBarcode = (barcode) => {
		this.props.actions.customer.onChangeBarcode(barcode);
	};

	submitBarcode = async () => {
		const { barcode } = this.props;
		if (barcode.trim() !== '') {
			const resBarcode = await new Promise((resolve, reject) => {
				this.props.actions.customer.getCustomerBarcode({
					code: barcode,
					resolve,
					reject
				});
			});

			if (parseInt(resBarcode.codeNumber) === 200 && resBarcode.data[0].length > 0) {
				const _promise = await new Promise((resolve, reject) => {
					this.props.actions.customer.getOrderList({
						customer_id: resBarcode.data[0].customer_id,
						resolve,
						reject
					});
				});

				if (_promise) {
					this.props.actions.customer.onChangeBarcode('');
					this.props.actions.customer.checkSearchPhone('yes');
				}
			}
		}
	};

	openScanner = () => {
		this.props.actions.customer.onChangeScanCustomer(true);
	};

	closeScanner = () => {
		this.props.actions.customer.onChangeScanCustomer(false);
	};

	render() {
		const { barcode, isScanCustomer } = this.props;
		const { hideTitle } = this.state;

		if (isScanCustomer) {
			return <Scanner ScanOK={this.closeScanner} />;
		} else {
			return (
				<View
					style={{
						marginTop: this.state.marginTopWrapInput
					}}
				>
					{!hideTitle && <Text style={styles.title} i18nKey="textTitleBarcode" />}

					<View style={[ styles.wrapInput ]}>
						<TextInput
							value={barcode}
							onChangeText={this.changeBarcode}
							placeholderTextColor="#dddddd"
							i18nKey={'textBarcode'}
							style={styles.input}
						/>

						<TouchableOpacity onPress={this.openScanner} style={styles.imgBarcode}>
							<Image
								source={image.Barcode}
								resizeMode="contain"
								style={{
									width: scale(22),
									height: verticalScale(22)
								}}
							/>
						</TouchableOpacity>
					</View>

					<ButtonDefault style={styles.button} i18nKey={'textContinue'} onPress={this.submitBarcode} />
				</View>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	barcode: state.customer.barcode,
	isScanCustomer: state.customer.isScanCustomer,
	Info: state.customer.Info
});

export default ConnectRedux(mapStateToProps, Barcode);

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		fontSize: scaleWidth(2.3),
		textAlign: 'center',
		color: '#404040',
		fontFamily: GlobalStyle.Weight
	},
	wrapInput: {
		width: scaleWidth(42),
		height: scaleWidth(6),
		display: 'flex',
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop: scaleWidth(8)
	},
	input: {
		flex: 7,
		backgroundColor: '#ffffff',
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		paddingHorizontal: scaleWidth(2),
		borderWidth: 1,
		borderColor: '#dddddd',
		fontSize: scaleWidth(2),
		fontFamily: GlobalStyle.Regular
	},
	imgBarcode: {
		flex: 1.7,
		backgroundColor: '#F06C3C',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	},
	button: {
		marginTop: scaleWidth(4),
		height: scaleWidth(6),
		width: scaleWidth(42)
	}
});
