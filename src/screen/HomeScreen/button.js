import React, { PureComponent } from 'react';
import ButtonCustom from 'components/ButtonCustom';
import { Image, StyleSheet, Platform } from 'react-native';
import Configs from 'configs';
import { Text } from 'components';
import { scaleWidth } from 'utils';

const { COLOR_MAIN_APP: { ORANGE, WHITE } } = Configs;

export default class Button extends PureComponent {
	render() {
		const { title, image, onPress } = this.props;

		return (
			<ButtonCustom onPress={onPress} style={styles.button}>
				<Image source={image} style={styles.image} />
				<Text style={styles.title} i18nKey={title} />
			</ButtonCustom>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		color: WHITE,
		fontSize: scaleWidth('2.2%'),
		fontWeight: 'bold',
		marginTop: 10,
		letterSpacing: 0.6
	},
	image: {
		marginBottom: 10,
		height: scaleWidth(8),
		width: scaleWidth(8),
		resizeMode: 'contain'
	},
	button: {
		flexDirection: 'column',
		width: scaleWidth(30),
		height: scaleWidth(17),
		backgroundColor: ORANGE,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 25,
		...Platform.select({
			ios: {
				shadowColor: '#4c4c52',
				shadowOffset: { width: 0, height: 1 },
				shadowOpacity: 0.4,
				shadowRadius: 2
			},
			android: {
				elevation: 5
			}
		})
	}
});
