import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'components/Modal';
import { scale, GlobalStyle } from 'utils';
import Icon from 'react-native-vector-icons/Fontisto';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from 'components/ButtonDefault';
import { Text } from 'components';
import LottieView from 'lottie-react-native';
import { scaleWidth } from 'utils';

const Sound = require('react-native-sound');
var SoundPlay = new Sound('unconvinced.mp3', Sound.MAIN_BUNDLE, (error) => {
	if (error) {
		console.log(error);
	}
});

class ModalPromotion extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isSuccess: false,
			vouncher_code: ''
		};
	}

	closeModal() {
		this.setState({
			isSuccess: false
		});
	}

	openModalSuccess() {
		this.setState({
			isSuccess: true
		});
	}

	/* -----Sub Mã khuến mãi thành công------ */
	renderModalSuccess() {
		const {toggleModal} = this.props;
		return (
			<View
				style={[
					styles.container,
					{
						width: scaleWidth(45)
					}
				]}
			>
				<View style={styles.header}>
					<Text style={styles.textHeader} i18nKey={'textTitleNotification'} />
					<Icon
						onPress={() => {
							this.closeModal();
							toggleModal();
						}}
						style={[ styles.icon ]}
						name="close-a"
						size={scale(11)}
						color={'#ffffff'}
					/>
				</View>

				<View style={styles.wrapContent}>
					<View style={styles.wrapLottieView}>
						<LottieView
							source={require('../../assets/json/success-animation.json')}
							autoPlay
							loop={false}
							resizeMode="cover"
							style={styles.LottieView}
						/>
					</View>
					<Text
						style={[ styles.textProotion, { fontWeight: '500' } ]}
						i18nKey={'textSubmiPromotionSuccess'}
					/>
					<Button
						onPress={() => {
							this.closeModal();
							toggleModal();
						}}
						style={styles.buttonOK}
						styleText={{
							fontFamily: GlobalStyle.Medium
						}}
						title="OK"
					/>
				</View>
			</View>
		);
	}

	async submitPromotion() {
		const { dataScan, vouncher_code } = this.props;
		const { store_id } = dataScan;

		const _promise = await new Promise((resolve, reject) => {
			this.props.useVouncher({ store_id, vouncher_code, resolve });
		});

		if (_promise.success) {
			this.props.resetVouncher();
			this.openModalSuccess();
		}
	}

	/* ----Ma khuyen mai da su dung----- */
	renderPromotionInvalid() {
		const { dataScan, toggleModal } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.textHeader} i18nKey={'textTitleNotification'} />
					<Icon onPress={toggleModal} style={styles.icon} name="close-a" size={scale(11)} color={'#ffffff'} />
				</View>
				<View style={styles.content}>
					<AntDesign
						style={{ marginBottom: scaleWidth(1) }}
						name="warning"
						color="red"
						size={scaleWidth(7)}
					/>
					<Text style={styles.textProotion}>Mã khuyến mãi của bạn đã được sử dụng</Text>
					<View
						style={{
							marginBottom: scaleWidth(2)
						}}
					>
						<View
							style={{
								flexDirection: 'row'
							}}
						>
							<Text style={[ styles.textContent, { width: scaleWidth(7) } ]}>Lúc : </Text>
							<Text style={[ styles.textContent, { marginLeft: 20 } ]}>{dataScan.formatted_used_date}</Text>
						</View>
						<View
							style={{
								flexDirection: 'row'
							}}
						>
							<Text style={[ styles.textContent, { width: scaleWidth(7) } ]}>Tại : </Text>
							<Text style={[ styles.textContent, { marginLeft: 20 } ]}>
								{dataScan.pickup_store_info[0].store_name}
							</Text>
						</View>
					</View>
					<Text style={styles.textProotion}>Vui lòng dùng mã khuyến mãi khác để hưởng ưu đãi</Text>
					{/* {loadingTask && <Spinner style={{ marginTop: 15 }} color="red" />} */}

					<Button
						onPress={toggleModal}
						style={styles.button}
						i18nKey={'textSubmitPromotion'}
						styleText={{
							fontFamily: GlobalStyle.Medium
						}}
					/>
				</View>
			</View>
		);
	}

	/* ----Ma khuyen mai hop le----- */
	renderModalPromotiion() {
		const { loadingTask, dataScan, toggleModal } = this.props;
		if (parseInt(dataScan.is_used) !== 0) {
			return this.renderPromotionInvalid();
		}

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.textHeader} i18nKey={'textTitleNotification'} />
					{!loadingTask && (
						<Icon
							onPress={toggleModal}
							style={styles.icon}
							name="close-a"
							size={scale(11)}
							color={'#ffffff'}
						/>
					)}
				</View>
				<View style={styles.content}>
					<IonicIcon
						style={{
							marginBottom: scale(7)
						}}
						name="ios-checkmark-circle-outline"
						size={scale(30)}
						color={'#40B34F'}
					/>
					<Text style={styles.textProotion} i18nKey={'textValuePromotion'} />
					<Text style={styles.price}>{dataScan.discount_amount} đ</Text>
					<Text style={styles.textContent} i18nKey={'textSubValuePromotion'} />
					{/* {loadingTask && <Spinner style={{ marginTop: 15 }} color="red" />} */}

					<Button
						onPress={() => this.submitPromotion()}
						style={styles.button}
						i18nKey={'textSubmitPromotion'}
						styleText={{
							fontFamily: GlobalStyle.Medium
						}}
					/>
				</View>
			</View>
		);
	}

	render() {
		const { isSuccess } = this.state;
		const { isModal } = this.props;
		return (
			<Modal transparent={true} onRequestClose={() => {}} visible={isModal}>
				{!isSuccess && this.renderModalPromotiion()}
				{isSuccess && this.renderModalSuccess()}
			</Modal>
		);
	}
}

export default ModalPromotion;

const styles = StyleSheet.create({
	container: {
		width: scaleWidth(50),
		backgroundColor: '#ffffff',
		borderRadius: 5,
		elevation: 2
	},
	header: {
		width: '100%',
		height: scaleWidth(7),
		backgroundColor: '#B4112C',
		justifyContent: 'center',
		position: 'relative',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5
	},
	textHeader: {
		textAlign: 'center',
		color: '#ffffff',
		fontSize: scaleWidth(2.5),
		fontWeight: '600',
		fontFamily: GlobalStyle.Medium
	},
	icon: {
		position: 'absolute',
		right: scaleWidth(2),
		top: scaleWidth(2.5)
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: scaleWidth(2),
		paddingVertical: scaleWidth(2)
	},
	textProotion: {
		fontSize: scaleWidth(2.2),
		fontWeight: '600',
		color: '#404040',
		fontFamily: GlobalStyle.Medium,
		textAlign: 'center'
	},
	price: {
		fontSize: scaleWidth(2),
		fontWeight: '700',
		color: '#F06C3C',
		marginTop: scale(5)
	},
	textContent: {
		fontSize: scaleWidth(2),
		fontWeight: '400',
		color: '#404040',
		marginTop: scale(10),
		fontFamily: GlobalStyle.Regular
	},
	button: {
		width: scaleWidth(30),
		height: scaleWidth(6),
		marginTop: scaleWidth(2)
	},
	buttonOK: {
		width: scaleWidth(12),
		height: scaleWidth(6),
		marginTop: scaleWidth(2)
	},

	wrapContent: {
		paddingBottom: scaleWidth(2),
		paddingHorizontal: scaleWidth(5)
	},

	wrapLottieView: {
		width: '100%',
		height: 120,
		justifyContent: 'center',
		alignItems: 'center'
	},
	LottieView: {
		width: scaleWidth(6),
		height: scaleWidth(6)
	}
});
