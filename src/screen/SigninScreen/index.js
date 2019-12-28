import React, { Component } from 'react';
import {
	View,
	Image,
	ImageBackground,
	StyleSheet,
	Animated,
	TouchableOpacity,
	Keyboard,
	TextInput
} from 'react-native';
import { ButtonDefault } from 'components';
import HeaderLogin from './components/header.js';
import image from 'assets/index';
import { styles, styleLogin } from './style';
import ConnectRedux from '../../redux/ConnectRedux';
import { verticalScale } from 'utils';
import { Text } from 'components';

class SigninScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animated: {
				scaleLogo: new Animated.Value(1.5),
				marginTopLogo: new Animated.Value(verticalScale(270)),
				opacityForm: new Animated.Value(0),
				scaleForm: new Animated.Value(1),
				topForm: new Animated.Value(0),
				opacityLogo : new Animated.Value(1),
			},
			isKeyBoard : false
		};

		this.keyboardHeight = new Animated.Value(0);
		this.imageHeight = new Animated.Value(200);

		this.username = React.createRef();
		this.password = React.createRef();
	}

	animatedFirst() {
		const { marginTopLogo, scaleLogo, opacityForm } = this.state.animated;
		setTimeout(() => {
			Animated.parallel([
				Animated.timing(marginTopLogo, {
					toValue: verticalScale(47),
					duration: 900
				}),
				Animated.timing(scaleLogo, {
					toValue: 1,
					duration: 900
				})
			]).start();

			setTimeout(() => {
				Animated.timing(opacityForm, {
					toValue: 1,
					duration: 800
				}).start();
			}, 1000);
		}, 700);
	}

	componentDidMount() {
		this.animatedFirst();

		Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
		Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
	}

	componentWillUnmount() {
		this.keyboardWillShowSub.remove();
		this.keyboardWillHideSub.remove();
	}

	keyboardWillShow = (event) => {
		this.setState({
			isKeyBoard : true
		})
		// Animated.parallel([
		// 	Animated.timing(this.state.animated.marginTopLogo, {
		// 		duration: event.duration,
		// 		toValue: -5
		// 	}),
		// 	Animated.timing(this.state.animated.opacityLogo, {
		// 		duration: event.duration,
		// 		toValue: 0
		// 	}),
		// 	// Animated.timing(this.state.animated.scaleLogo, {
		// 	// 	duration: event.duration,
		// 	// 	toValue: 0.5
		// 	// }),
		// 	// Animated.timing(this.state.animated.scaleForm, {
		// 	// 	duration: event.duration,
		// 	// 	toValue: 0.77
		// 	// }),
		// 	Animated.timing(this.state.animated.topForm, {
		// 		duration: event.duration,
		// 		toValue: -120
		// 	})
		// ]).start();
	};

	keyboardWillHide = (event) => {
		this.setState({
			isKeyBoard : false
		})
		// if (event && event.endCoordinates.height === 0) {
		// 	Animated.parallel([
		// 		Animated.timing(this.state.animated.marginTopLogo, {
		// 			duration: event.duration,
		// 			toValue: verticalScale(50)
		// 		}),
		// 		Animated.timing(this.state.animated.scaleLogo, {
		// 			duration: event.duration,
		// 			toValue: 1
		// 		}),
		// 		Animated.timing(this.state.animated.scaleForm, {
		// 			duration: event.duration,
		// 			toValue: 1
		// 		}),
		// 		Animated.timing(this.state.animated.topForm, {
		// 			duration: event.duration,
		// 			toValue: 0
		// 		})
		// 	]).start();
		// }
	};

	gotoHome = () => {
		this.props.navigation.navigate('MainScreen');
	};

	render() {
		const { language } = this.props;
		return (
			<ImageBackground source={image.Loading} style={{ width: '100%', height: '100%' }}>
				<HeaderLogin />

				<Animated.View style={{}}>
					{!this.state.isKeyBoard&&<Animated.View
						style={[
							styles.logo,
							{
								transform: [ { scale: this.state.animated.scaleLogo } ],
								marginTop: this.state.animated.marginTopLogo,
								opacity : this.state.animated.opacityLogo
							}
						]}
					>
						<Image source={image.LoginLogo} resizeMode="contain" />
					</Animated.View>}

					<Animated.View
						style={{
							width: '100%',
							alignItems: 'center',
							opacity: this.state.animated.opacityForm,
							marginTop: this.state.animated.topForm,
							transform: [ { scale: this.state.animated.scaleForm } ]
						}}
					>
						<Text
							style={[ styles.txtDangNhap, { marginBottom: verticalScale(20) } ]}
							i18nKey={'textTitleLogin'}
						/>

						<View style={styleLogin.wrapperInput}>
							<View style={styleLogin.imgContainerInput}>
								<Image source={image.UserName} style={styleLogin.imgInput} />
							</View>
							<TextInput
								ref={this.username}
								style={styleLogin.input}
								placeholder={language === 'vi' ? 'Tên đăng nhập' : 'Account'}
								placeholderTextColor="#333"
								onSubmitEditing={() => this.password.current.focus()}
								returnKeyLabel="next"
								returnKeyType="go"
							/>
						</View>

						<View style={styleLogin.wrapperInput}>
							<View style={styleLogin.imgContainerInput}>
								<Image source={image.Pass} style={styleLogin.imgInput} />
							</View>
							<TextInput
								ref={this.password}
								secureTextEntry={true}
								style={styleLogin.input}
								placeholder={language === 'vi' ? 'Mật khẩu' : 'Password'}
								placeholderTextColor="#333"
							/>
						</View>

						<ButtonDefault
							style={{
								marginTop: verticalScale(20)
							}}
							i18nKey={'textLogin'}
							onPress={this.gotoHome}
						/>
						<TouchableOpacity style={{ marginTop: verticalScale(5) }} onPress={() => {}}>
							<Text style={styles.txtPass} i18nKey="textForgotPassword" />
						</TouchableOpacity>
					</Animated.View>
				</Animated.View>
			</ImageBackground>
		);
	}
}
const mapStateToProps = (state) => ({
	movie: state.dataLocal.movie,
	language: state.app.language
});
export default ConnectRedux(mapStateToProps, SigninScreen);
