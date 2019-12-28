import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'components/Modal';
import { MethodPointContext } from './index';
import { scale, verticalScale, moderateScale, GlobalStyle } from 'utils';
import Icon from 'react-native-vector-icons/Fontisto';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Button from 'components/ButtonDefault';
import { Text } from 'components';

export default class ModalPromotion extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isSuccess: false
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

	renderModalSuccess(state, toggleModal) {
		return (
			<View
				style={[
					styles.container,
					{
						width: scale(240),
						height: verticalScale(200)
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

				<View style={[ styles.content ]}>
					<IonicIcon
						style={{
							marginBottom: scale(7),
							marginTop: scale(10)
						}}
						name="ios-checkmark-circle-outline"
						size={scale(30)}
						color={'#40B34F'}
					/>
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

	renderModalPromotiion(state, toggleModal) {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.textHeader} i18nKey={'textTitleNotification'} />
					<Icon onPress={toggleModal} style={styles.icon} name="close-a" size={scale(11)} color={'#ffffff'} />
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
					<Text style={styles.price}>50.000 đ</Text>
					<Text style={styles.textContent} i18nKey={'textSubValuePromotion'} />
					<Button
						onPress={() => this.openModalSuccess()}
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
		return (
			<MethodPointContext.Consumer>
				{(context) => {
					const { state, toggleModal } = context;
					return (
						<Modal transparent={true} onRequestClose={() => {}} visible={state.isModal}>
							{!isSuccess && this.renderModalPromotiion(state, toggleModal)}
							{isSuccess && this.renderModalSuccess(state, toggleModal)}
						</Modal>
					);
				}}
			</MethodPointContext.Consumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: moderateScale(440),
		height: moderateScale(370,0.2),
		backgroundColor: '#ffffff',
		borderRadius: 5
	},
	header: {
		width: '100%',
		height: verticalScale(45),
		backgroundColor: '#B4112C',
		justifyContent: 'center',
		position: 'relative',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5
	},
	textHeader: {
		textAlign: 'center',
		color: '#ffffff',
		fontSize: scale(11),
		fontWeight: '600',
		fontFamily: GlobalStyle.Medium
	},
	icon: {
		position: 'absolute',
		right: moderateScale(15.4),
		top: moderateScale(21.4)
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: scale(15),
		paddingBottom: scale(15)
	},
	textProotion: {
		fontSize: scale(10),
		fontWeight: '600',
		color: '#404040',
		fontFamily: GlobalStyle.Medium,
		textAlign : 'center'
	},
	price: {
		fontSize: scale(10),
		fontWeight: '700',
		color: '#F06C3C',
		marginTop: scale(5)
	},
	textContent: {
		fontSize: scale(10),
		fontWeight: '400',
		color: '#404040',
		marginTop: scale(10),
		textAlign: 'center',
		fontFamily: GlobalStyle.Regular
	},
	button: {
		width: moderateScale(250,0.25),
		marginTop: scale(10)
	},
	buttonOK: {
		width: scale(50),
		marginTop: scale(10)
	}
});
