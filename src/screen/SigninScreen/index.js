import React, { Component } from 'react';
import {
	View,
	Image,
	ImageBackground,
	StyleSheet,
	Animated,
	TouchableOpacity,
	Keyboard,
	TextInput,
	ActivityIndicator
} from 'react-native';
import { ButtonDefault, PopupError } from 'components';
import HeaderLogin from './components/header.js';
import image from 'assets/index';
import { styles, styleLogin } from './style';
import ConnectRedux from '../../redux/ConnectRedux';
import { verticalScale, scaleWidth, scaleHeight } from 'utils';
import { Text, LoadingRoot } from 'components';
import { Button } from 'native-base';
import NetInfo from '@react-native-community/netinfo';

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
				opacityLogo: new Animated.Value(1)
			},
			isKeyBoard: false,
			username: '',
			password: '',
			isError: false
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
					toValue: -verticalScale(7),
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
		this.closeModalError();
		Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
		Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);

		NetInfo.addEventListener(async (state) => {
			const { isNetwork } = this.state;
			if (state.isConnected === true && this.state.isKeyBoard === false) {
				this.dropDownAlertRef.alertWithType('success', 'Có mạng lại rồi yaaa ! :(', 'Đã kết nói internet !!!');
			}
			if (state.isConnected === false) {
				this.dropDownAlertRef.alertWithType('success', 'Mất mạng :(', 'Hiện tại không có kết nối internet !!!');
			}
			await this.setState({ isNetwork: state.isConnected });
		});
	}

	keyboardWillShow = (event) => {
		this.setState({
			isKeyBoard: true
		});
	};

	keyboardWillHide = (event) => {
		this.setState({
			isKeyBoard: false
		});
	};

	loginMerchant = async () => {
		const { username, password } = this.state;

		if (username.trim() !== '' && password.trim() !== '') {
			const payload = { username, password };
			await this.props.actions.auth.login(payload);
			this.setState({ username: '', password: '' });
		}
	};

	openModalError = () => {
		this.setState({ isError: true });
	};

	closeModalError = () => {
		this.setState({ isError: false });
		this.props.actions.app.setTextError('');
	};

	componentDidUpdate(prevProps) {
		if (prevProps.errorText !== this.props.errorText && this.props.errorText !== '') {
			this.openModalError();
		}
	}

	renderLoading() {
		const { loading } = this.props;
		if (loading) {
			return <LoadingRoot />;
		}
	}

	renderLogo() {
		if (!this.state.isKeyBoard) {
			return (
				<Animated.View
					style={[
						styles.logo,
						{
							transform: [ { scale: this.state.animated.scaleLogo } ],
							marginTop: this.state.animated.marginTopLogo,
							opacity: this.state.animated.opacityLogo
						}
					]}
				>
					<Image
						style={{
							width: scaleWidth(35),
							height: scaleWidth(12)
						}}
						source={image.LoginLogo}
						resizeMode="contain"
					/>
				</Animated.View>
			);
		}
	}

	render() {
		const { language, loadingTask } = this.props;
		const { isError } = this.state;
		return (
			<ImageBackground source={image.Loading} style={{ width: '100%', height: '100%' }}>
				{this.renderLoading()}
				<HeaderLogin />
				<Animated.View style={{}}>
					{/* Logo */}
					{this.renderLogo()}
					{/* Form Login */}
					<Animated.View
						style={{
							width: '100%',
							alignItems: 'center',
							opacity: this.state.animated.opacityForm,
							transform: [ { scale: this.state.animated.scaleForm } ]
						}}
					>
						{/* Text Title*/}
						<Text
							style={[ styles.txtDangNhap, { marginBottom: scaleHeight(4) } ]}
							i18nKey={'textTitleLogin'}
						/>

						{/* Input Username */}
						<View style={styleLogin.wrapperInput}>
							<View style={styleLogin.imgContainerInput}>
								<Image source={image.UserName} style={styleLogin.imgInput} />
							</View>
							<TextInput
								ref={this.username}
								value={this.state.username}
								onChangeText={(username) => this.setState({ username })}
								autoCorrect={false}
								keyboardType="visible-password"
								style={styleLogin.input}
								placeholder={language === 'vi' ? 'Tên đăng nhập' : 'Account'}
								placeholderTextColor="#333"
								onSubmitEditing={() => this.password.current.focus()}
								returnKeyLabel="next"
								returnKeyType="go"
							/>
						</View>

						{/* Input Password */}
						<View style={styleLogin.wrapperInput}>
							<View style={styleLogin.imgContainerInput}>
								<Image source={image.Pass} style={styleLogin.imgInput} />
							</View>
							<TextInput
								ref={this.password}
								value={this.state.password}
								onChangeText={(password) => this.setState({ password })}
								autoCorrect={false}
								secureTextEntry={true}
								style={styleLogin.input}
								placeholder={language === 'vi' ? 'Mật khẩu' : 'Password'}
								placeholderTextColor="#333"
							/>
						</View>

						{/* Button Login */}
						<Button
							style={styleLogin.buttonLogin}
							// disabled={loadingTask}
							activeOpacity={0.8}
							onPress={this.loginMerchant}
						>
							<Text
								style={{
									color: 'white',
									fontSize: scaleWidth(1.7),
									fontWeight: 'bold'
								}}
								i18nKey={'textLogin'}
							/>
						</Button>

						{/* 					<TouchableOpacity style={{ marginTop: verticalScale(5) }} onPress={() => {}}>
							<Text style={styles.txtPass} i18nKey="textForgotPassword" />
						</TouchableOpacity> */}
						<PopupError onPress={this.closeModalError} isModal={isError} />
					</Animated.View>
				</Animated.View>
			</ImageBackground>
		);
	}
}
const mapStateToProps = (state) => ({
	movie: state.dataLocal.movie,
	language: state.app.language,
	loading: state.app.loading,
	loadingTask: state.app.loadingTask,
	errorText: state.app.errorText,
});
export default ConnectRedux(mapStateToProps, SigninScreen);
