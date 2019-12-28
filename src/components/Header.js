import React from 'react';
import { View, Image, StyleSheet, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import image from '../assets';
import ConnectRedux from '../redux/ConnectRedux';
import { scaleWidth, scaleHeight, scale, verticalScale, moderateScale, GlobalStyle } from '../utils';
import Configs from '../configs';
const { COLOR_MAIN_APP: { PINK_BOLD, WHITE } } = Configs;
const { FONT_SIZE: { FONT_BUTTON } } = Configs;
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Right } from 'native-base';

import Modal from '../components/Modal';
import Icon from 'react-native-vector-icons/Fontisto';
import { Text } from 'components';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModal: false
		};
	}

	changeLanguage(language) {
		this.props.actions.app.changeLanguage(language);
	}

	renderBack() {
		const { isBack, onPress } = this.props;
		if (isBack) {
			return (
				<View style={{ position: 'absolute', bottom: '2%', right: scale(10) }}>
					<Right>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text
								style={{
									fontSize: moderateScale(16, 0.25),
									fontWeight: '500',
									color: PINK_BOLD,
									marginHorizontal: 15,
									letterSpacing: 0.3,
									fontFamily: GlobalStyle.Medium
								}}
								i18nKey={'textBack'}
							/>

							<TouchableOpacity>
								<AntDesign name="leftcircle" size={55} color={PINK_BOLD} onPress={onPress} />
							</TouchableOpacity>
						</View>
					</Right>
				</View>
			);
		}
		return null;
	}

	renderTitle() {
		const { isRight } = this.props;
		if (isRight) {
			return (
				<View style={styles.containerRight}>
					<Image
						source={image.Logo}
						resizeMode="contain"
						style={{
							width: moderateScale(62, 0.25),
							height: moderateScale(62, 0.25),
							marginHorizontal: scale(10)
						}}
					/>
					<View>
						<Text style={styles.txtName}>POPEYES VINMARK CỘNG HÒA</Text>
						<Text style={styles.txtAddress}>Địa chỉ: 15-17 Cộng Hòa, P.4, Quận Tân Bình, Tp.HCM</Text>
					</View>
				</View>
			);
		}
		return null;
	}

	renderLogout() {
		const { isBotLeft } = this.props;
		if (isBotLeft) {
			return (
				<View style={styles.botRight}>
					<Text
						i18nKey={'textLogout'}
						style={{
							fontSize: scaleWidth('1.75%'),
							color: WHITE,
							fontWeight: '600',
							marginRight: scale(5),
							fontFamily: GlobalStyle.Medium
						}}
					/>
					<TouchableOpacity onPress={() => this.setState({ isModal: true })}>
						<Image
							source={image.Logout}
							style={{
								width: scale(16),
								height: scale(16)
							}}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				</View>
			);
		}
		return null;
	}

	renderLanguage() {
		return (
			<View style={styles.viewBackgroundLanguage}>
				<Right>
					<ImageBackground source={image.Language} style={styles.imageBackgroundLanguage}>
						<View style={styles.topRight}>
							<TouchableOpacity onPress={() => this.changeLanguage('vi')} style={styles.row}>
								<Image source={image.Vn} style={styles.imageLanguage} resizeMode="contain" />
								<Text style={styles.txtLanguage}>VI</Text>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => this.changeLanguage('en')} style={styles.row}>
								<Image source={image.Eu} style={styles.imageLanguage} resizeMode="contain" />
								<Text style={styles.txtLanguage}>EN</Text>
							</TouchableOpacity>
						</View>
					</ImageBackground>
				</Right>
			</View>
		);
	}

	closeModal() {
		this.setState({ isModal: false });
	}

	logOut() {
		this.setState({ isModal: false });
		if (this.props.logout) {
			this.props.logout();
		}
	}

	renderModal() {
		return (
			<Modal animationType="fade" transparent={true} visible={this.state.isModal} onRequestClose={() => {}}>
				<View style={styles.containerModal}>
					<View style={styles.headerModal}>
						<View />
						<Text style={styles.titleModal} i18nKey={'textTitleNotification'} />
						<Icon
							onPress={() => this.closeModal()}
							name="close-a"
							size={moderateScale(18)}
							color="#ffffff"
						/>
					</View>
					<View
						style={{
							paddingHorizontal: scale(15)
						}}
					>
						<Text style={styles.contentModal} i18nKey={'textContentLogout'} />

						<View style={styles.wrapButtonModal}>
							<TouchableOpacity
								onPress={() => this.logOut()}
								style={[
									styles.button,
									{
										backgroundColor: 'white',
										borderWidth: 1,
										borderColor: '#404040'
									}
								]}
							>
								<Text
									style={[
										styles.txtButton,
										{
											color: '#404040'
										}
									]}
									i18nKey='textYes'
								/>
				
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.closeModal()} style={styles.button}>
								<Text style={styles.txtButton} i18nKey='textNo'/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	render() {
		return (
			<React.Fragment>
				<StatusBar hidden={true} />
				<View style={styles.container}>
					<View style={{ height: scale(50) }}>
						<ImageBackground resizeMode="stretch" source={image.Header} style={styles.imageBackground}>
							<View style={styles.content}>
								{this.renderTitle()}
								<View style={{ flexDirection: 'column' }}>
									{this.renderLanguage()}
									{this.renderLogout()}
								</View>
							</View>
						</ImageBackground>
					</View>

					<View ref={(parent) => (this.parent = parent)} style={styles.container}>
						{this.props.children}
					</View>

					{this.renderBack()}
					{this.renderModal()}
				</View>
			</React.Fragment>
		);
	}
}
export default ConnectRedux(null, Header);
const styles = StyleSheet.create({
	txtLanguage: {
		fontSize: moderateScale(13),
		fontWeight: '600',
		marginLeft: 5,
		color: '#404040',
		fontFamily: GlobalStyle.Medium
	},
	imageLanguage: {
		width: moderateScale(26),
		height: verticalScale(16)
	},
	imageBackgroundLanguage: {
		width: moderateScale(150),
		height: moderateScale(38)
	},
	imageBackground: {
		width: '100%',
		position: 'absolute',
		height: '100%'
	},
	container: {
		flex: 1
	},
	viewBackgroundLanguage: {
		top: '-4%',
		right: '-3%',
		flexDirection: 'row'
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	botRight: {
		flexDirection: 'row',
		alignItems: 'center',
		top: moderateScale(7,0.1),
		right: moderateScale(10,0.1)
	},
	topRight: {
		flexDirection: 'row',
		top: '3%',
		width: moderateScale(120,0.25),
		alignItems: 'center',
		justifyContent: 'space-around',
		left: moderateScale(25),
	},
	containerRight: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	txtAddress: {
		fontSize: moderateScale(16, 0.25),
		fontWeight: '500',
		fontFamily: GlobalStyle.Medium,
		color: WHITE,
		marginTop: verticalScale(5),
		letterSpacing: 0.6
	},
	txtName: {
		fontSize: moderateScale(24, 0.25),
		fontWeight: 'bold',
		fontFamily: GlobalStyle.Weight,
		color: WHITE,
		letterSpacing: 0.6
	},
	containerModal: {
		width: moderateScale(380,0.25),
		height: moderateScale(250,0.25),
		borderRadius: 5,
		backgroundColor: '#ffffff'
	},
	headerModal: {
		height: verticalScale(40),
		backgroundColor: '#B4112C',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		paddingRight: scale(5)
	},
	titleModal: {
		color: '#ffffff',
		fontSize: moderateScale(18, 0.25),
		marginLeft: scale(14),
		fontWeight: '600',
		fontFamily: GlobalStyle.Medium
	},
	contentModal: {
		color: '#404040',
		fontWeight: '500',
		fontSize: moderateScale(18, 0.25),
		marginTop: scale(14),
		textAlign: 'center',
		letterSpacing: 0.6,
		fontFamily: GlobalStyle.Regular
	},
	wrapButtonModal: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: verticalScale(40)
	},
	btnYes: {
		width: moderateScale(55, 0.7),
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#dddddd'
	},
	btnNo: {
		width: moderateScale(55, 0.7),
		backgroundColor: '#F06C3C'
	},
	button: {
		width: moderateScale(110),
		height: moderateScale(45, 0.25),
		backgroundColor: '#F06C3C',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	txtButton: {
		color: 'white',
		fontWeight: '600',
		fontFamily: GlobalStyle.Medium,
		fontSize: moderateScale(16)
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	}
});
