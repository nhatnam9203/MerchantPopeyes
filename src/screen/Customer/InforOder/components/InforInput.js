import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale, GlobalStyle } from 'utils';
import PointModal from './PointModal';

import images from 'assets';
import { ContextMain } from 'screen/Main';
import { Text } from 'components';

function formatNumber(number) {
	return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1,');
}

export default class InforInpur extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModal: false,
			code: '',
			time: '',
			amountPayment: '0'
		};
		// this.inputCode = React.createRef();
		// this.inputTime = React.createRef();
		// this.inputPrice = React.createRef();
		// this.inputPoint = React.createRef();
	}

	openModal() {
		this.setState({
			isModal: true
		});
	}

	closeModal() {
		this.setState({
			isModal: false
		});
	}

	checkSubmit() {
		const { code, amountPayment } = this.state;
		if (code !== '' && amountPayment !== '' && parseInt(amountPayment) > 0) {
			return true;
		}
		return false;
	}

	render() {
		const { isModal } = this.state;
		return (
			<ContextMain.Consumer>
				{(context) => (
					<React.Fragment>
						<View style={{ paddingHorizontal: scale(8) }}>
							<ScrollView showsVerticalScrollIndicator={false}>
								<View style={{ marginTop: verticalScale(13) }}>
									<Text style={styles.text} i18nKey={'textOrderCode'} />
									<TextInput
										ref={(ref) => (this.inputCode = ref)}
										onSubmitEditing={() => this.inputTime.focus()}
										value={this.state.code}
										onChangeText={(code) => this.setState({ code })}
										style={styles.textInput}
										keyboardType='numeric'
									/>
								</View>

								<View style={{ marginTop: verticalScale(13) }}>
									<Text style={styles.text} i18nKey={'textCustomerTime'} />
									<TextInput
										ref={(ref) => (this.inputTime = ref)}
										onSubmitEditing={() => this.inputPrice.focus()}
										value={'10:00 AM - 31/12/2019'}
										style={styles.textInput}
									/>
								</View>

								<View style={{ marginTop: verticalScale(13) }}>
									<Text style={styles.text} i18nKey={'textCustomerMoneyInvoice'} />
									<TextInput
										ref={(ref) => (this.inputPrice = ref)}
										value={parseFloat(formatNumber(this.state.amountPayment)).toFixed(3)}
										onChangeText={(amountPayment) => this.setState({ amountPayment })}
										style={styles.textInput}
									/>
								</View>

								<View style={{ marginTop: verticalScale(13) }}>
									<View style={{ flexDirection: 'row' }}>
										<Text style={styles.text2} i18nKey={'textCustomerPoint'} />
										<Image
											source={images.Level}
											style={{ width: scale(12), height: scale(12), marginLeft: scale(12) }}
										/>
										<Text
											style={[
												styles.text2,
												{
													marginLeft: scale(12)
												}
											]}
										>
											184
										</Text>
									</View>

									<TouchableOpacity
										activeOpacity={0.8}
										onPress={() => {
											this.openModal();
										}}
										disabled={!this.checkSubmit() ? true : false}
										style={[ styles.button, {
											backgroundColor : !this.checkSubmit() ? 'white' : '#B60B28',
											borderColor : !this.checkSubmit() ? '#dddddd' : 'white',
										} ]}
									>
										<Text style={[styles.txtButton,{
											color : !this.checkSubmit() ? '#9F9F9F' : 'white',
										}]} i18nKey={'textPoint'} />
									</TouchableOpacity>
								</View>

								<View style={{ height: 100 }} />
							</ScrollView>
						</View>

						<PointModal
							close={() => {
								this.closeModal();
								// toggleOrderInput(-1);
							}}
							isModal={isModal}
						/>
					</React.Fragment>
				)}
			</ContextMain.Consumer>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		color: '#404040',
		fontSize: moderateScale(16.5),
		fontWeight: '600',
		letterSpacing: 0.6,
		fontFamily: GlobalStyle.Medium
	},
	text2: {
		color: '#404040',
		fontSize: moderateScale(16.5),
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
		height: verticalScale(35),
		paddingHorizontal: scale(10),
		fontSize: scale(8),
		marginTop: verticalScale(10),
		color: 'grey',
		fontWeight: '500'
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		width: scale(80),
		height: verticalScale(37),
		backgroundColor: '#B4112C',
		marginTop: verticalScale(15),
		borderWidth : 1
	},
	txtButton: {
		color: '#ffffff',
		fontWeight: '600',
		fontSize: moderateScale(16),
		fontFamily: GlobalStyle.Medium
	}
});
