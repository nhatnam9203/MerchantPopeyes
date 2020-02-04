import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'components/Modal';
import { scale, verticalScale, GlobalStyle, scaleWidth } from 'utils';
import Icon from 'react-native-vector-icons/AntDesign';
import images from 'assets';
import { moderateScale } from '../../../../utils';
import { Text } from 'components';
import { TouchableRipple } from 'react-native-paper';

export default class PointModal extends Component {
	render() {
		const { isModal, close, inforCustomer } = this.props;
		if (!inforCustomer) {
			return null;
		}

		return (
			<Modal transparent={true} onRequestClose={() => {}} visible={isModal}>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.txtHeader} i18nKey={'textTitleNotification'} />
						<TouchableOpacity hitSlop={styles.hitSlop} onPress={close} style={styles.btnClose}>
							<Icon name="close" color="#ffffff" size={scale(14)} />
						</TouchableOpacity>
					</View>

					<View style={styles.content}>
						<Text style={styles.title} i18nKey={'textContentPointModal'} />
						<View style={styles.image} />
						<Text style={styles.text}>{`${inforCustomer.firstName} ${inforCustomer.lastName}`}</Text>

						<View style={styles.row}>
							<Image source={images.Level} style={styles.imgLevel} />
							<Text style={[ styles.text, styles.textPoint ]}>{`${inforCustomer.points}`}</Text>
						</View>

						<TouchableRipple rippleColor="orange" onPress={close} style={styles.button}>
							<Text style={styles.txtButton}>OK</Text>
						</TouchableRipple>
					</View>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: scaleWidth(55),
		backgroundColor: '#ffffff',
		borderRadius: 5
	},
	header: {
		height: scaleWidth(6),
		width: '100%',
		backgroundColor: '#B4112C',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		position: 'relative',
		paddingTop: scaleWidth(1.5)
	},
	txtHeader: {
		color: '#ffffff',
		fontSize: scaleWidth(2.3),
		textAlign: 'center',
		fontWeight: '600',
		fontFamily: GlobalStyle.Medium
	},
	btnClose: {
		position: 'absolute',
		right: scaleWidth(1.5),
		top: scaleWidth(1.5)
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		width: scaleWidth(10),
		height: scaleWidth(5),
		backgroundColor: '#F06C3C',
		marginTop: scaleWidth(2)
	},
	txtButton: {
		color: '#ffffff',
		fontWeight: '600',
		fontSize: scaleWidth(2),
		fontFamily: GlobalStyle.Medium
	},
	content: {
		padding: scaleWidth(2),
		alignItems: 'center'
	},
	title: {
		textAlign: 'center',
		fontSize: scaleWidth(2),
		color: '#404040',
		fontWeight: '500',
		fontFamily: GlobalStyle.Regular,
		letterSpacing: 0.6
	},
	text: {
		fontWeight: '600',
		color: '#404040',
		marginTop: scaleWidth(2),
		fontSize: scaleWidth(2),
		fontFamily: GlobalStyle.Medium
	},
	textPoint: {
		marginLeft: scale(6),
		fontSize: scale(10)
	},
	image: {
		backgroundColor: '#dddddd',
		width: scaleWidth(10),
		height: scaleWidth(10),
		borderRadius: scaleWidth(7),
		marginTop: scaleWidth(2)
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imgLevel: {
		width: moderateScale(20),
		height: moderateScale(20),
		marginTop: moderateScale(15, 0.25)
	},
	hitSlop: {
		top: 20,
		bottom: 20,
		right: 20,
		left: 20
	}
});
