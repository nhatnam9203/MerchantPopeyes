import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale, GlobalStyle } from 'utils';
import images from 'assets';
import { ContextMain } from 'screen/Main';
import { Text } from 'components';
import ConnectRedux from 'reduxApp/ConnectRedux';

class InforCustomerInput extends Component {
	constructor(props) {
		super(props);
		this.username = React.createRef();
		this.phone = React.createRef();
		this.email = React.createRef();
		this.address = React.createRef();
		this.state = {
			username: '',
			phone: '',
			email: '',
			address: ''
		};
	}

	render() {
		const { language } = this.props;
		return (
			<ContextMain.Consumer>
				{(context) => (
					<View style={styles.container}>
						<Image source={images.InforCustomer} style={{ width: scale(14), height: scale(14) }} />
						<View
							style={{
								flex: 1,
								paddingLeft: scale(10)
							}}
						>
							<Text style={styles.title} i18nKey={'textTitleInfoCustomer'} />

							<ScrollView showsVerticalScrollIndicator={false}>
								<View
									style={{
										marginTop: moderateScale(10)
									}}
								>
									<View style={styles.row}>
										<Text style={styles.subTitle} i18nKey={'textCustomerName'} />
										<Text
											style={{
												color: '#B60B28',
												fontSize: scale(12),
												marginTop: -scale(3),
												marginLeft: scale(2)
											}}
										>
											*
										</Text>
									</View>
									<TextInput
										ref={this.username}
										onSubmitEditing={() => this.phone.current.focus()}
										// i18nKey={'textCustomerName'}
										placeholder={language === 'vi' ? 'Tên khách hàng' : 'Customer name'}
										placeholderTextColor="#a8abad"
										style={styles.textInput}
										value={this.state.username}
										onChangeText={(username) => this.setState({ username })}
									/>
								</View>

								<View
									style={{
										marginTop: moderateScale(10)
									}}
								>
									<View style={styles.row}>
										<Text style={styles.subTitle} i18nKey={'textCustomerPhone'} />
										<Text
											style={{
												color: '#B60B28',
												fontSize: scale(12),
												marginTop: -scale(3),
												marginLeft: scale(2)
											}}
										>
											*
										</Text>
									</View>

									<TextInput
										ref={this.phone}
										onSubmitEditing={() => this.email.current.focus()}
										// i18nKey={'textCustomerPhone'}
										placeholder={language === 'vi' ? 'Số điện thoại' : 'Phone number'}
										placeholderTextColor="#a8abad"
										style={styles.textInput}
										value={this.state.phone}
										onChangeText={(phone) => this.setState({ phone })}
									/>
								</View>

								<View
									style={{
										marginTop: moderateScale(10)
									}}
								>
									<Text style={styles.subTitle} i18nKey={'textCustomerEmail'} />
									<TextInput
										ref={this.email}
										onSubmitEditing={() => this.address.current.focus()}
										// i18nKey={'textCustomerEmail'}
										placeholder={language === 'vi' ? 'Email' : 'Email'}
										placeholderTextColor="#a8abad"
										style={styles.textInput}
										value={this.state.email}
										onChangeText={(email) => this.setState({ email })}
									/>
								</View>

								<View
									style={{
										marginTop: moderateScale(10)
									}}
								>
									<Text style={styles.subTitle} i18nKey={'textCustomerAddress'} />
									<TextInput
										ref={this.address}
										// i18nKey={'textCustomerAddress'}
										placeholder={language === 'vi' ? 'Địa chỉ' : 'Address'}
										placeholderTextColor="#a8abad"
										style={styles.textInput}
										value={this.state.address}
										onChangeText={(address) => this.setState({ address })}
									/>
								</View>

								<TouchableOpacity
									activeOpacity={0.8}
									onPress={() => {
										if (this.state.username.trim() !== '' && this.state.phone.trim() !== '')
											context.toggleInforCustomer(false);
									}}
									style={styles.button}
								>
									<Text style={styles.buttonText} i18nKey={'textCustomerButtonSave'} />
								</TouchableOpacity>

								<View style={{ height: 100 }} />
							</ScrollView>
						</View>
					</View>
				)}
			</ContextMain.Consumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: scale(8),
		display: 'flex',
		flexDirection: 'row'
	},
	title: {
		fontSize: scale(12),
		color: '#404040',
		fontWeight: '700',
		fontFamily: GlobalStyle.Weight,
		marginBottom: moderateScale(8, 0.25)
	},

	subTitle: {
		fontSize: scale(9.7),
		color: '#404040',
		fontWeight: '500',
		fontFamily: GlobalStyle.Medium
	},
	textInput: {
		backgroundColor: '#ffffff',
		width: scale(180),
		height: verticalScale(36),
		borderColor: '#dddddd',
		borderRadius: 5,
		borderWidth: 1,
		marginTop: verticalScale(10),
		paddingHorizontal: scale(7),
		fontSize: moderateScale(14.5, 0.25),
		fontFamily: GlobalStyle.Regular
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
		fontSize: moderateScale(16, 0.25),
		letterSpacing: 0.6,
		fontFamily: GlobalStyle.Medium
	},
	row: {
		flexDirection: 'row'
	}
});

const mapStateToProps = (state) => ({
	language: state.app.language
});
export default ConnectRedux(mapStateToProps, InforCustomerInput);
