import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { scale, verticalScale, GlobalStyle, scaleWidth } from 'utils';
import PointModal from './PointModal';
import images from 'assets';
import { Text } from 'components';
import { TouchableRipple } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import moment from 'moment';
import { store } from 'reduxApp/store';

export default class InforInpur extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModal: false,
			code: '',
			time: moment().format('hh:mm A') + ' ' + moment().format('DD/MM/YYYY'),
			amountPayment: '0'
		};
	}

	openModal = () => {
		this.setState({
			isModal: true
		});
	};

	closeModal = () => {
		this.setState({
			isModal: false
		});
		this.props.actions.customer.collectPointSuccess(false);
		this.setState({
			code: '',
			amountPayment: '',
			time: moment().format('hh:mm A') + ' ' + moment().format('DD/MM/YYYY')
		});
	};

	_collectPoint = () => {
		const { code, time, amountPayment } = this.state;
		const { customer_id } = this.props.inforCustomer;
		const body = {
			post_order_id: code,
			time,
			customer_id,
			amount: amountPayment
		};
		store.dispatch({ type: 'COLLECT_POINT_SUCCESS', payload: false });
		store.dispatch({ type: 'COLLECT_POINT', payload: body });
	};

	onChangePrice = (amountPayment) => {
		this.setState({ amountPayment });
	};

	checkSubmit() {
		const { code, amountPayment } = this.state;
		if (code !== '' && amountPayment !== '' && parseInt(amountPayment) > 0) {
			return true;
		}
		return false;
	}

	componentDidUpdate(prevProps) {
		const { isCollectPoint } = this.props;
		if (prevProps.isCollectPoint !== isCollectPoint && isCollectPoint === true) {
			this.openModal();
		}
	}

	render() {
		const { isModal } = this.state;
		const { inforCustomer } = this.props;
		return (
			<React.Fragment>
				<View style={{ paddingHorizontal: scale(8) }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={{ marginTop: verticalScale(13) }}>
							<Text style={styles.text} i18nKey={'textOrderCode'} />
							<TextInput
								ref={(ref) => (this.inputCode = ref)}
								// onSubmitEditing={() => this.inputPrice.focus()}
								value={this.state.code}
								onChangeText={(code) => this.setState({ code })}
								style={styles.textInput}
								keyboardType="numeric"
							/>
						</View>

						<View style={{ marginTop: verticalScale(13) }}>
							<Text style={styles.text} i18nKey={'textCustomerTime'} />
							<TextInput
								ref={(ref) => (this.inputTime = ref)}
								// onSubmitEditing={() => this.inputPrice.focus()}
								value={this.state.time}
								style={styles.textInput}
							/>
						</View>

						<View style={{ marginTop: verticalScale(13) }}>
							<Text style={styles.text} i18nKey={'textCustomerMoneyInvoice'} />
							<TextInputMask
								style={styles.textInput}
								ref={(ref) => (this.inputPrice = ref)}
								type={'money'}
								options={textInputOption}
								value={this.state.amountPayment}
								onChangeText={this.onChangePrice}
							/>
						</View>

						<View style={{ marginTop: verticalScale(13) }}>
							<View style={{ flexDirection: 'row' }}>
								<Text
									style={[ styles.text2, { fontSize: scaleWidth(2.1) } ]}
									i18nKey={'textCustomerPoint'}
								/>
								<Image source={images.Level} style={styles.imgLevel} />
								<Text
									style={[
										styles.text2,
										{
											marginLeft: scaleWidth(2)
										}
									]}
								>
									{`${inforCustomer.points}`}
								</Text>
							</View>

							<TouchableRipple
								rippleColor="red"
								onPress={this._collectPoint}
								disabled={!this.checkSubmit() ? true : false}
								style={[
									styles.button,
									{
										backgroundColor: !this.checkSubmit() ? 'white' : '#B60B28',
										borderColor: !this.checkSubmit() ? '#dddddd' : 'white'
									}
								]}
							>
								<Text
									style={[
										styles.txtButton,
										{
											color: !this.checkSubmit() ? '#9F9F9F' : 'white'
										}
									]}
									i18nKey={'textPoint'}
								/>
							</TouchableRipple>
						</View>

						<View style={{ height: 100 }} />
					</ScrollView>
					{/* </KeyboardAwareScrollView> */}
				</View>

				<PointModal
					code={this.state.code}
					inforCustomer={inforCustomer}
					close={this.closeModal}
					isModal={isModal}
				/>
			</React.Fragment>
		);
	}
}

const textInputOption = {
	precision: 0,
	separator: '',
	delimiter: ',',
	suffixUnit: '',
	unit: ''
};

const styles = StyleSheet.create({
	text: {
		color: '#404040',
		fontSize: scaleWidth(2),
		fontWeight: '600',
		letterSpacing: 0.6,
		fontFamily: GlobalStyle.Medium
	},
	text2: {
		color: '#404040',
		fontSize: scaleWidth(2),
		fontWeight: 'bold',
		letterSpacing: 0.6,
		fontFamily: GlobalStyle.Weight
	},
	textInput: {
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#dddddd',
		borderRadius: 5,
		width: '100%',
		height: scaleWidth(5),
		paddingHorizontal: scaleWidth(2),
		fontSize: scaleWidth(1.8),
		marginTop: scaleWidth(1.5),
		color: 'grey',
		fontWeight: '500'
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		width: scaleWidth(15),
		height: scaleWidth(5),
		backgroundColor: '#B4112C',
		marginTop: verticalScale(15),
		borderWidth: 1
	},
	txtButton: {
		color: '#ffffff',
		fontWeight: '600',
		fontSize: scaleWidth(1.7),
		fontFamily: GlobalStyle.Medium
	},
	imgLevel: {
		width: scaleWidth(2.5),
		height: scaleWidth(2.5),
		marginLeft: scaleWidth(2)
	}
});
