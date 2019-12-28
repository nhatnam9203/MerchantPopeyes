import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Configs from 'configs';
import { scaleWidth,GlobalStyle,moderateScale } from 'utils';
const { FONT_SIZE: { FONT_SIZE_TITLE } } = Configs;
const { COLOR_MAIN_APP: { BORDER, WHITE } } = Configs;
import {Text} from 'components'

const Title = ({ name, image }) => (
	<View style={styles.container}>
		<View style={styles.content}>
			<Image source={image} resizeMode="contain" style={{ width: 28, height: 28 }} />
			<Text style={styles.title} i18nKey={name} />
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		borderBottomColor: BORDER,
		borderBottomWidth: 1,
		backgroundColor: WHITE
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginLeft: scaleWidth('2%')
	},
	title: {
		fontSize: moderateScale(18,0.25),
		fontWeight: '700',
		margin: 15,
		fontFamily : GlobalStyle.Weight
	}
});
export default Title;
