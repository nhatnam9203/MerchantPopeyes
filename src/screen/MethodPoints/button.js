import React, { PureComponent } from 'react';
import ButtonCustom from 'components/ButtonCustom';
import { StyleSheet, Platform } from 'react-native';
import Configs from 'configs';
import { scaleWidth, scaleHeight, GlobalStyle } from 'utils';
import { Text } from 'components';
const { COLOR_MAIN_APP: { ORANGE, WHITE } } = Configs;

class Button extends PureComponent {
	render() {
		const { title, onPress } = this.props;
		return (
			<ButtonCustom onPress={onPress} style={styles.button}>
				<Text style={styles.title} i18nKey={title} />
			</ButtonCustom>
		);
	}
}

export default Button;

const styles = StyleSheet.create({
	title: {
		color: WHITE,
		fontSize: scaleWidth('2.2%'),
		fontWeight: 'bold',
		marginVertical: 15,
		letterSpacing: 0.6,
		fontFamily: GlobalStyle.Medium
	},
	button: {
		width: scaleWidth('30%'),
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
