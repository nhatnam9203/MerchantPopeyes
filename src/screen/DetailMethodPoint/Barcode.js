import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { ButtonDefault } from 'components';
import image from 'assets';
import { scale, verticalScale, moderateScale, GlobalStyle } from 'utils';
import { ContextMain } from 'screen/Main';
import { Text, TextInput } from 'components';

export default class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marginTopWrapInput: verticalScale(80),
			hideTitle : false
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
			marginTopWrapInput: verticalScale(0),
			hideTitle : true
		});
	};

	hideKeyBoard = (e) => {
		this.setState({
			marginTopWrapInput: verticalScale(80),
			hideTitle : false
		});	
	};

	render() {
		return (
			<ContextMain.Consumer>
				{(context) => (
					<View style={{
						marginTop : this.state.marginTopWrapInput,
					}}>
						{!this.state.hideTitle&&<Text
							style={styles.title}
							i18nKey="textTitleBarcode"
						/>}
						<View style={[ styles.wrapInput ]}>
							<TextInput placeholderTextColor="#dddddd" i18nKey={'textBarcode'} style={styles.input} />
							<TouchableOpacity
								onPress={() => {
									context.navigateRoute(4);
								}}
								style={styles.imgBarcode}
							>
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

						<ButtonDefault
							style={styles.button}
							i18nKey={'textContinue'}
							onPress={() => {
								context.navigateRoute(3);
								context.toggleInforCustomer(false);
							}}
						/>
					</View>
				)}
			</ContextMain.Consumer>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		fontSize: moderateScale(20, 0.25),
		textAlign: 'center',
		color: '#404040',
		fontFamily: GlobalStyle.Weight
	},
	wrapInput: {
		width: moderateScale(380, 0.25),
		height: verticalScale(40),
		display: 'flex',
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop : verticalScale(60)
	},
	input: {
		flex: 7,
		backgroundColor: '#ffffff',
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		paddingHorizontal: scale(12),
		borderWidth: 1,
		borderColor: '#dddddd',
		fontSize: moderateScale(14.5, 0.25),
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
		marginTop: verticalScale(30),
		height: verticalScale(40),
		width: moderateScale(380, 0.25)
	}
});
