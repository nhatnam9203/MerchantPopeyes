import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TouchableOpacity } from 'react-native';
import { ButtonDefault } from 'components';
import { GlobalStyle, scaleWidth, scaleHeight } from 'utils';
import { Text } from 'components';
import ConnectRedux from 'reduxApp/ConnectRedux';
import { TextInputMask } from 'react-native-masked-text';

const phoneHeader = [
	{
		key: 1,
		value: '+84'
	},
	{
		key: 2,
		value: '+1'
	}
];

class SearchPhone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marginTopWrapInput: scaleHeight(10),
			hideTitle: false,
			phone: '',
			phoneHeader: '+84',
			isPhoneHeader: false,
			widthPhoneHeader: 0
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

	submitSearchPhone = () => {
		const { phoneHeader, phone } = this.state;
		if (phone.trim() !== '') {
			const body = {
				phone: phoneHeader.replace('+', '') + phone.replace(/ /g, '')
			};
			this.props.actions.customer.getCustomerPhone(body);
			this.setState({ phoneHeader: '+84', phone: '' });
		}
	};

	togglePhoneHeader = () => {
		this.setState({
			isPhoneHeader: !this.state.isPhoneHeader
		});
	};

	setWidthPhoneHeader = (e) => {
		const width = e.nativeEvent.layout.width;
		this.setState({
			widthPhoneHeader: width
		});
	};

	renderItemPhoneHeader() {
		const { isPhoneHeader } = this.state;
		if (isPhoneHeader) {
			return phoneHeader.map((obj, index) => {
				return (
					<TouchableOpacity
						onPress={() => this.setState({ phoneHeader: obj.value, isPhoneHeader: false })}
						key={index}
						style={{
							width: this.state.widthPhoneHeader + 30,
							height: scaleWidth(5),
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Text style={{ fontSize: scaleWidth(2), color: 'grey' }}>{obj.value}</Text>
					</TouchableOpacity>
				);
			});
		}
	}

	render() {
		const { language } = this.props;
		const { hideTitle, phoneHeader } = this.state;
		return (
			<View
				style={{
					marginTop: this.state.marginTopWrapInput
				}}
			>
				{!hideTitle && <Text style={styles.title} i18nKey="textTitlePhone" />}

				<View style={styles.wrapper}>
					{/* Phone Header */}
					<TouchableOpacity
						onLayout={this.setWidthPhoneHeader}
						onPress={this.togglePhoneHeader}
						style={[ styles.textInput, styles.phoneHeader ]}
					>
						<Text style={styles.textPhoneHeade}>{phoneHeader}</Text>
						<View style={styles.wrapPhoneHeader}>{this.renderItemPhoneHeader()}</View>
					</TouchableOpacity>

					{/* Phone Tail */}
					<TextInputMask
						value={this.state.phone}
						onChangeText={(phone) => this.setState({ phone })}
						placeholderTextColor="#dddddd"
						placeholder={language === 'vi' ? 'Số điện thoại' : 'Phone number'}
						maxLength={12}
						type={'custom'}
						style={styles.textInput}
						options={{
							mask: '9999 999 999'
						}}
					/>
				</View>

				{/* Button submit */}
				<ButtonDefault style={styles.button} i18nKey={'textContinue'} onPress={this.submitSearchPhone} />
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	phone: state.customer.phoneSearch
});

export default ConnectRedux(mapStateToProps, SearchPhone);

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		fontSize: scaleWidth(2.3),
		textAlign: 'center',
		color: '#404040',
		fontFamily: GlobalStyle.Weight
	},
	wrapper: {
		width: scaleWidth(42),
		height: scaleWidth(6),
		display: 'flex',
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop: scaleWidth(8),
		flexDirection: 'row'
	},
	textInput: {
		flex: 7,
		backgroundColor: '#ffffff',
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		paddingHorizontal: scaleWidth(2),
		borderWidth: 1,
		borderColor: '#dddddd',
		fontSize: scaleWidth(2),
		fontFamily: GlobalStyle.Regular,
		height: scaleWidth(6),
		color: 'grey'
	},
	phoneHeader: {
		flex: 1.5,
		marginRight: scaleWidth(1),
		justifyContent: 'center',
		borderRadius: 5,
		position: 'relative'
	},
	button: {
		marginTop: scaleWidth(4),
		height: scaleWidth(6),
		width: scaleWidth(42)
	},
	wrapPhoneHeader: {
		position: 'absolute',
		left: -25,
		zIndex: 99999999,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#dddddd',
		backgroundColor: 'white'
	},
	textPhoneHeade: {
		fontSize: scaleWidth(2),
		color: 'grey'
	}
});
