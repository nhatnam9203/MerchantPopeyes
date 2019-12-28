import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Configs from 'configs';
import { scale, verticalScale,moderateScale } from 'utils';
import {Text} from 'components'
const { FONT_SIZE: { FONT_SIZE_TITLE } } = Configs;

const Title = ({ name, image }) => (
	<View style={styles.container}>
		<Image source={image} resizeMode="contain" style={{ width: 28, height: 28 }} />
		<Text style={styles.title} i18nKey={name} />
	</View>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: verticalScale(30)
	},
	title: {
		fontSize: moderateScale(18,0.25),
		fontWeight: 'bold',
		margin: 15,
		color: '#404040'
	}
});
export default Title;
