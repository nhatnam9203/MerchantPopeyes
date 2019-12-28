import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'components/Modal';
import { scale, verticalScale,GlobalStyle } from 'utils';
import Icon from 'react-native-vector-icons/AntDesign';
import images from 'assets';
import { moderateScale } from '../../../../utils';
import {Text} from 'components'

export default class PointModal extends Component {
	render() {
		const { isModal, close } = this.props;
		return (
			<Modal transparent={true} onRequestClose={() => {}} visible={isModal}>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.txtHeader} i18nKey={'textTitleNotification'} />
						<TouchableOpacity onPress={close} style={styles.btnClose}>
							<Icon name="close" color="#ffffff" size={scale(14)} />
						</TouchableOpacity>
					</View>

					<View style={styles.content}>
						<Text style={styles.title} i18nKey={'textContentPointModal'} />

						<View style={styles.image} />

						<Text style={styles.text}>William</Text>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Image
								source={images.Level}
								style={{
									width: moderateScale(20),
									height: moderateScale(20),
									marginTop: moderateScale(15,0.25)
								}}
							/>
							<Text style={[styles.text,{
								marginLeft : scale(6),
								fontSize : scale(10)
							}]}>184</Text>
						</View>

						<TouchableOpacity activeOpacity={0.8} onPress={close} style={styles.button}>
							<Text style={styles.txtButton}>OK</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: moderateScale(400),
		height: moderateScale(400),
		backgroundColor: '#ffffff',
		borderRadius: 5
	},
	header: {
		height: verticalScale(45),
		width: '100%',
		backgroundColor: '#B4112C',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		position: 'relative',
		paddingTop: verticalScale(12)
	},
	txtHeader: {
		color: '#ffffff',
		fontSize: scale(11),
		textAlign: 'center',
		fontWeight: '600',
		fontFamily : GlobalStyle.Medium
	},
	btnClose: {
		position: 'absolute',
		right: scale(5),
		top: verticalScale(11.3)
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		width: moderateScale(100),
		height: moderateScale(50),
		backgroundColor: '#F06C3C',
		marginTop: verticalScale(15)
	},
	txtButton: {
		color: '#ffffff',
		fontWeight: '600',
		fontSize: scale(9),
		fontFamily : GlobalStyle.Medium
	},
	content: {
		flex: 1,
		padding: scale(12),
		alignItems: 'center',
		
	},
	title: {
		textAlign: 'center',
		fontSize: scale(9),
		color: '#404040',
		fontWeight: '500',
		fontFamily : GlobalStyle.Regular,
		letterSpacing : 0.6
	},
	text: {
		fontWeight: '600',
		color: '#404040',
		marginTop: verticalScale(10),
		fontSize: scale(10),
		fontFamily : GlobalStyle.Medium
	},
	image: {
		backgroundColor: '#dddddd',
		width: scale(38),
		height: scale(38),
		borderRadius: scale(30),
		marginTop: verticalScale(12)
	}
});
