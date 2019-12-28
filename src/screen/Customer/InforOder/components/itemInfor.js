import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import Configs from 'configs';
import { scaleWidth, scaleHeight,moderateScale,GlobalStyle } from 'utils';
const { COLOR_MAIN_APP: { PLACEHOLDER, WHITE } } = Configs;
import {Text} from 'components'

const Title = ({ name, value }) => (
	<View style={styles.content}>
		<Text style={[ styles.name, { right: scaleWidth('2%') } ]} i18nKey={name} />
		<Text style={styles.value} numberOfLines={1}>{value}</Text>
	</View>
);
const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: scaleWidth('2%'),
		marginTop: moderateScale(10,0.25)
	},
    name: { 
		fontSize: scaleWidth('1.7%'), 
		color: '#4D4D4D', 
		fontWeight: 'bold',
		letterSpacing : 0.6,
		fontFamily : GlobalStyle.Weight },
    value : {
        fontSize: scaleWidth('1.7%'), 
        color: '#4D4D4D', 
        fontWeight: '400',
		letterSpacing : 0.3,
		fontFamily : GlobalStyle.Regular
    }
});
export default Title;
