import React from 'react';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import image from '../../../assets';
import Configs from '../../../configs';
const { COLOR_MAIN_APP: { ORANGE, WHITE, PLACEHOLDER } } = Configs;
import { scaleWidth, scaleHeight, scale, verticalScale } from '../../../utils';

const Input = () => (
	<View style={styles.container}>
		<View style={styles.content}>
			<View style={styles.icon}>
				<Image source={image.UserName} />
			</View>
			<View style={styles.input}>
				<TextInput style={styles.txt} placeholder="UserName" placeholderTextColor={PLACEHOLDER} />
			</View>
		</View>
		<View style={[ styles.content, { marginTop: 15 } ]}>
			<View style={styles.icon}>
				<Image source={image.Pass} />
			</View>
			<View style={styles.input}>
				<TextInput style={styles.txt} placeholder="Password" placeholderTextColor={PLACEHOLDER} />
			</View>
		</View>
	</View>
);

export default Input;
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: verticalScale(18)
	},
	icon: {
		backgroundColor: ORANGE,
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	content: {
		flexDirection: 'row',
		width: scaleWidth('40%'),
		height: scaleHeight('7%'),
		borderRadius: 5,
		backgroundColor: 'white'
	},
	input: { backgroundColor: WHITE, justifyContent: 'center' },
	txt: {
		fontSize: scale(8),
		width: '100%',
		color: PLACEHOLDER,
		paddingHorizontal: scale(5)
	}
});
