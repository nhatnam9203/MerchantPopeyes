import React, { Component } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { scale, moderateScale, GlobalStyle, scaleWidth } from 'utils';
import images from 'assets';
import { Text } from 'components';
import ConnectRedux from 'reduxApp/ConnectRedux';
import { TouchableRipple } from 'react-native-paper';
import Input from './components/Input';
import InputAddress from './components/InputAddress';
import NavigatorService from '../../../../navigators/NavigatorServices';

const initialState = {
	username: '',
	firstName: '',
	lastName: '',
	phone: '',
	email: '',
	address: ''
};

class InforCustomerInput extends Component {
	constructor(props) {
		super(props);
		this.username = React.createRef();
		this.firstName = React.createRef();
		this.lastName = React.createRef();
		this.phone = React.createRef();
		this.email = React.createRef();
		this.address = React.createRef();
		this.HomeNumber = React.createRef();
		this.state = initialState;
	}

	resetState() {
		this.setState(initialState);
	}

	navigateToAdddress = () => {
		NavigatorService.navigate('AddressStack');
	};

	submitCreateCustomer = () => {
		const { selectedCity, selectedDistrict, selectedWards, selectedStreet, selectedArea } = this.props;

		const firstname = this.firstName.current.state.value;
		const lastName = this.lastName.current.state.value;
		const email = this.email.current.state.value;
		const phone = this.props.phone;
		const homeNumber = this.HomeNumber.current.state.value;
		// if (
		// 	parseInt(homeNumber) < parseInt(selectedStreet.address_from) ||
		// 	parseInt(homeNumber) > parseInt(selectedStreet.address_to)
		// ) {
		// 	this.props.actions.app.setTextError(
		// 		`Số nhà phải từ ${selectedStreet.address_from} đến ${selectedStreet.address_to}`
		// 	);
		// 	return;
		// }

		const address = {
			city: selectedCity ? selectedCity.Title : '',
			country_id: 'VN',
			postcode: '0084',
			telephone: phone,
			district: selectedDistrict ? selectedDistrict.name : '',
			wards: selectedWards ? selectedWards.name : '',
			street_customer: selectedStreet ? selectedStreet.name : '',
			street_customer_id: selectedStreet ? selectedStreet.id_street : '',
			house_number: homeNumber,
			wards_id: selectedWards ? selectedWards.ward_id : '',
			city_id: selectedCity ? selectedCity.ID : '',
			district_id: selectedStreet ? selectedStreet.district_id : '',
			region: '1',
			street: selectedStreet ? selectedStreet.name : ''
		};

		const body = {
			firstname,
			lastName,
			phone,
			email,
			address
		};

		if (firstname.trim() !== '' && lastName.trim() !== '' && phone.trim() !== '') {
			this.props.actions.customer.createCustomer(body);
		}
	};

	renderName() {
		const { language } = this.props;
		return (
			<View
				style={{
					display: 'flex',
					flexDirection: 'row'
				}}
			>
				<View style={styles.marginTop}>
					<View style={styles.row}>
						<Text style={styles.subTitle} i18nKey={'textCustomerName'} />
						<Text style={styles.important}>*</Text>
					</View>
					<Input ref={this.lastName} placeholder={language === 'vi' ? 'Họ' : 'Last name'} />
				</View>

				<View
					style={{
						marginTop: moderateScale(10),
						marginLeft: scaleWidth(1.5)
					}}
				>
					<View style={styles.row}>
						<Text style={styles.subTitle} />
						<Text style={styles.important} />
					</View>

					<Input ref={this.firstName} placeholder={language === 'vi' ? 'Tên' : 'First name'} />
				</View>
			</View>
		);
	}

	renderPhoneEmail() {
		const { language, phone } = this.props;

		return (
			<View style={styles.row}>
				<View style={styles.marginTop}>
					<View style={styles.row}>
						<Text style={styles.subTitle} i18nKey={'textCustomerPhone'} />
						<Text style={styles.important}>*</Text>
					</View>

					<Input
						ref={this.phone}
						value={phone}
						placeholder={language === 'vi' ? 'Số điện thoại' : 'Phone number'}
						keyboardType="numeric"
					/>
				</View>

				<View
					style={{
						marginTop: moderateScale(10),
						marginLeft: scaleWidth(1.5)
					}}
				>
					<View style={styles.row}>
						<Text style={styles.subTitle} i18nKey={'textCustomerEmail'} />
						<Text style={styles.important} />
					</View>

					<Input
						ref={this.email}
						placeholder={language === 'vi' ? 'Email' : 'Email'}
						keyboardType="email-address"
					/>
				</View>
			</View>
		);
	}

	renderAddress() {
		const { language } = this.props;
		const { selectedCity, selectedDistrict, selectedWards, selectedStreet } = this.props;

		const cityName = selectedCity ? selectedCity.Title : 'Thành Phố';
		const districtName = selectedDistrict ? selectedDistrict.type + ' ' + selectedDistrict.name : 'Quận';
		const wardsName = selectedWards ? selectedWards.type + ' ' + selectedWards.name : 'Phường';
		const sreetName = selectedStreet ? selectedStreet.name : 'Đường';

		return (
			<React.Fragment>
				<View style={styles.row}>
					<View style={styles.marginTop}>
						<View style={styles.row}>
							<Text style={styles.subTitle} i18nKey={'textCustomerAddress'} />
							<Text style={styles.important}>*</Text>
						</View>

						<InputAddress onPress={this.navigateToAdddress} value={cityName} placeholder="Tỉnh" />
					</View>

					<View
						style={{
							marginTop: moderateScale(10),
							marginLeft: scaleWidth(1.5)
						}}
					>
						<View style={styles.row}>
							<Text style={styles.subTitle} />
							<Text style={styles.important} />
						</View>

						<InputAddress
							onPress={() => NavigatorService.navigate('District')}
							value={districtName}
							placeholder="Quận"
						/>
					</View>
				</View>

				<View style={styles.row}>
					<InputAddress
						onPress={() => NavigatorService.navigate('Wards')}
						value={wardsName}
						style={{ width: scaleWidth(40) }}
						placeholder="Phường"
					/>
				</View>

				<View style={styles.row}>
					<InputAddress
						onPress={() => NavigatorService.navigate('Street')}
						value={sreetName}
						style={{ width: scaleWidth(28.5) }}
						placeholder="Đường"
					/>
					<Input
						ref={this.HomeNumber}
						style={{ width: scaleWidth(10), marginLeft: scaleWidth(1.5) }}
						placeholder="Số"
					/>
				</View>
			</React.Fragment>
		);
	}

	renderButtonSubmit() {
		return (
			<TouchableRipple
				rippleColor="red"
				activeOpacity={0.8}
				onPress={() => {
					this.submitCreateCustomer();
					this.props.actions.order.inforOrder(true);
				}}
				style={styles.button}
			>
				<Text style={styles.buttonText} i18nKey={'textCustomerButtonSave'} />
			</TouchableRipple>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<Image
					source={images.InforCustomer}
					style={{ width: scale(14), height: scale(14), marginTop: scaleWidth(0.3) }}
				/>
				<View style={styles.header}>
					<Text style={styles.title} i18nKey={'textTitleInfoCustomer'} />

					<ScrollView showsVerticalScrollIndicator={false}>
						{this.renderName()}
						{this.renderPhoneEmail()}
						{this.renderAddress()}
						{this.renderButtonSubmit()}
						<View style={{ height: 100 }} />
					</ScrollView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: scaleWidth(1.5),
		paddingLeft: 0,
		display: 'flex',
		flexDirection: 'row'
	},
	header: {
		flex: 1,
		width: '100%',
		paddingLeft: scale(10)
	},
	title: {
		fontSize: scaleWidth(2.3),
		color: '#404040',
		fontWeight: '700',
		fontFamily: GlobalStyle.Weight,
		marginBottom: scaleWidth(1.1)
	},

	subTitle: {
		fontSize: scaleWidth(2),
		color: '#404040',
		fontWeight: '500',
		fontFamily: GlobalStyle.Medium
	},
	subTitleRight: {
		color: '#B60B28',
		fontSize: scale(12),
		marginTop: -scale(3),
		marginLeft: scale(2)
	},
	textInput: {
		backgroundColor: '#ffffff',
		width: scaleWidth(38),
		height: scaleWidth(5),
		borderColor: '#dddddd',
		borderRadius: 5,
		borderWidth: 1,
		marginTop: scaleWidth(2),
		paddingHorizontal: scaleWidth(2),
		fontSize: scaleWidth(1.7),
		fontFamily: GlobalStyle.Regular
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: scaleWidth(5),
		width: scaleWidth(15),
		backgroundColor: '#B4112C',
		borderRadius: 5,
		marginTop: scaleWidth(2)
	},
	buttonText: {
		color: '#ffffff',
		fontWeight: '700',
		fontSize: scaleWidth(2),
		letterSpacing: 0.6,
		fontFamily: GlobalStyle.Medium
	},
	row: {
		flexDirection: 'row',
		marginTop: scaleWidth(0.5)
	},
	iconDropDown: {
		position: 'absolute',
		top: scaleWidth(3.2),
		right: scaleWidth(1)
	},
	important: {
		color: '#B60B28',
		fontSize: scale(12),
		marginTop: -scale(3),
		marginLeft: scale(2)
	},
	marginLeft: {
		marginTop: moderateScale(10),
		marginLeft: scaleWidth(1.5)
	},
	marginTop: {
		marginTop: moderateScale(10)
	}
});

const mapStateToProps = (state) => ({
	language: state.app.language,
	phone: state.customer.phoneSearch,

	selectedCity: state.address.selectedCity,
	selectedDistrict: state.address.selectedDistrict,
	selectedWards: state.address.selectedWards,
	selectedStreet: state.address.selectedStreet,
	selectedArea: state.address.selectedArea
});
export default ConnectRedux(mapStateToProps, InforCustomerInput);
