import React from 'react';
import { View, Image, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import image from '../assets';
import ConnectRedux from '../redux/ConnectRedux';
import { scaleWidth, scale, verticalScale, moderateScale, GlobalStyle } from '../utils';
import Configs from '../configs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Right } from 'native-base';
import Modal from '../components/Modal';
import Icon from 'react-native-vector-icons/Fontisto';
import { Text, LoadingRoot } from 'components';
import { TouchableRipple } from 'react-native-paper';

const { COLOR_MAIN_APP: { PINK_BOLD, WHITE } } = Configs;
const { FONT_SIZE: { FONT_BUTTON } } = Configs;

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

	closeModal = () => {
		this.setState({ isModal: false });
	};

	logOut = () => {
		this.setState({ isModal: false });
		if (this.props.logout) {
			this.props.logout();
		}
	};

	renderBack() {
		const { isBack, onPress } = this.props;
		if (isBack) {
			return (
				<View style={{ position: 'absolute', bottom: '2%', right: scale(10) }}>
					<Right>
						<TouchableOpacity onPress={onPress}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={styles.textBack} i18nKey={'textBack'} />
								<AntDesign name="leftcircle" size={scaleWidth(5)} color={PINK_BOLD} />
							</View>
						</TouchableOpacity>
					</Right>
				</View>
			);
		}
		return null;
	}

	renderTitle() {
		const { isRight, merchant } = this.props;
		if (isRight) {
			return (
				<View style={styles.containerRight}>
					<Image source={image.Logo} resizeMode="contain" style={styles.imgLogo} />
					<View>
						<Text style={styles.txtName}>{merchant.store_name}</Text>
						<Text style={styles.txtAddress}>{merchant.address}</Text>
					</View>
				</View>
			);
		}
		return null;
	}

	renderLogoutButton() {
		const { isBotLeft } = this.props;
		if (isBotLeft) {
			return (
				<TouchableOpacity
					hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
					onPress={() => this.setState({ isModal: true })}
					style={styles.botRight}
				>
					<Text i18nKey={'textLogout'} style={styles.textLogout} />
					<TouchableOpacity onPress={() => this.setState({ isModal: true })}>
						<Image source={image.Logout} style={styles.imgLogout} resizeMode="contain" />
					</TouchableOpacity>
				</TouchableOpacity>
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

	renderModalLogout() {
		return (
			<Modal animationType="fade" transparent={true} visible={this.state.isModal} onRequestClose={() => {}}>
				<View style={styles.containerModal}>
					<View style={styles.headerModal}>
						<View />
						<Text style={styles.titleModal} i18nKey={'textTitleNotification'} />
						<Icon onPress={this.closeModal} name="close-a" size={moderateScale(18)} color="#ffffff" />
					</View>
					<View
						style={{
							paddingHorizontal: scale(15)
						}}
					>
						<Text style={styles.contentModal} i18nKey={'textContentLogout'} />

						<View style={styles.wrapButtonModal}>
							<TouchableRipple
								rippleColor="#dddddd"
								onPress={this.logOut}
								style={[ styles.button, styles.buttonLogout ]}
							>
								<Text style={[ styles.txtButton, styles.textYesLogout ]} i18nKey="textYes" />
							</TouchableRipple>

							<TouchableRipple rippleColor="orange" onPress={this.closeModal} style={styles.button}>
								<Text style={styles.txtButton} i18nKey="textNo" />
							</TouchableRipple>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	render() {
		const { loading } = this.props;
		return (
			<React.Fragment>
				<StatusBar hidden={true} />
				<View style={styles.container}>
					<View style={styles.header}>
						<ImageBackground resizeMode="stretch" source={image.Header} style={styles.imageBackground}>
							<View style={styles.content}>
								{this.renderTitle()}
								<View style={{ flexDirection: 'column' }}>
									{this.renderLanguage()}
									{this.renderLogoutButton()}
								</View>
							</View>
						</ImageBackground>
					</View>

					<ScrollView
						ref={(parent) => (this.parent = parent)}
						contentContainerStyle={{
							flex: 1
						}}
					>
						{this.props.children}

						{this.renderBack()}
						{this.renderModalLogout()}
					</ScrollView>
				</View>
				{loading && <LoadingRoot />}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.app.loading,
	merchant: state.auth.merchant
});

export default ConnectRedux(mapStateToProps, Header);
const styles = StyleSheet.create({
	header: {
		height: scaleWidth(10)
	},
	txtLanguage: {
		fontSize: scaleWidth(1.5),
		fontWeight: '600',
		marginLeft: 0,
		color: '#404040',
		fontFamily: GlobalStyle.Medium
	},
	imgLogo: {
		width: scaleWidth(7),
		height: scaleWidth(7),
		marginHorizontal: scale(10)
	},
	imageLanguage: {
		width: scaleWidth(4),
		height: scaleWidth(2.3)
	},
	imageBackgroundLanguage: {
		width: scaleWidth(16),
		height: scaleWidth(4)
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
		top: scaleWidth(1),
		right: scaleWidth(2)
	},
	topRight: {
		flexDirection: 'row',
		top: '3%',
		width: scaleWidth(12),
		alignItems: 'center',
		justifyContent: 'space-around',
		left: scaleWidth(2)
	},
	containerRight: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	txtAddress: {
		fontSize: scaleWidth(1.8),
		fontWeight: '500',
		fontFamily: GlobalStyle.Medium,
		color: WHITE,
		marginTop: verticalScale(5),
		letterSpacing: 0.6
	},
	txtName: {
		fontSize: scaleWidth(2.5),
		fontWeight: 'bold',
		fontFamily: GlobalStyle.Weight,
		color: WHITE,
		letterSpacing: 0.6
	},
	containerModal: {
		width: scaleWidth(41),
		paddingBottom: scaleWidth(2),
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
		fontSize: scaleWidth(2.3),
		marginLeft: scale(14),
		fontWeight: '600',
		fontFamily: GlobalStyle.Medium
	},
	contentModal: {
		color: '#404040',
		fontWeight: '500',
		fontSize: scaleWidth(2),
		marginTop: scaleWidth(2),
		textAlign: 'center',
		letterSpacing: 0.6,
		fontFamily: GlobalStyle.Regular
	},
	wrapButtonModal: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: scaleWidth(8)
	},
	btnYes: {
		width: scaleWidth(10),
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#dddddd'
	},
	btnNo: {
		width: scaleWidth(10),
		backgroundColor: '#F06C3C'
	},
	button: {
		width: scaleWidth(13),
		height: scaleWidth(5.1),
		backgroundColor: '#F06C3C',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	txtButton: {
		color: 'white',
		fontWeight: '600',
		fontFamily: GlobalStyle.Medium,
		fontSize: scaleWidth(1.9)
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	textBack: {
		fontSize: scaleWidth(2),
		fontWeight: '500',
		color: PINK_BOLD,
		marginHorizontal: 15,
		letterSpacing: 0.3,
		fontFamily: GlobalStyle.Medium
	},
	textLogout: {
		fontSize: scaleWidth(1.8),
		color: WHITE,
		fontWeight: '600',
		marginRight: scaleWidth(0.8),
		fontFamily: GlobalStyle.Medium
	},
	imgLogout: {
		width: scale(16),
		height: scale(16)
	},
	buttonLogout: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#404040'
	},
	textYesLogout: {
		color: '#404040'
	}
});
