import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { verticalScale, scale, moderateScale, GlobalStyle, scaleWidth } from 'utils';
import { TouchableRipple } from 'react-native-paper';
import image from 'assets';
import moment from 'moment'

const Item = ({ code = '', content = '', onPress, isActive, onPressDelete }) => {
	return (
		<TouchableRipple
			rippleColor="orange"
			onPress={onPress}
			style={[
				styles.container,
				{
					backgroundColor: isActive ? '#F06C3C' : '#ffffff'
				}
			]}
		>
			<View style={styles.row}>
				<View style={styles.wrapContent}>
					<Text
						style={[
							styles.code,
							{
								color: isActive ? '#ffffff' : '#BB2640'
							}
						]}
					>
						#{code}
					</Text>

					<Text
						style={[
							styles.content,
							{
								color: isActive ? '#ffffff' : '#333'
							}
						]}
					>
						{moment(content).format('dddd')+ ' ' +moment(content).format('DD/MM/YYYY')}
					</Text>
				</View>

				{/* <TouchableOpacity onPress={()=>onPressDelete(`Would you like to delete item ${code} ?`)} hitSlop={{ top: 30, bottom: 30, right: 30, left: 30 }}>
					<Image
						source={image.Delete}
						style={{
							tintColor: isActive ? '#ffffff' : '#BB2640',
							width: scaleWidth(2.7),
							height: scaleWidth(2.7)
						}}
					/>
				</TouchableOpacity> */}
			</View>
		</TouchableRipple>
	);
};

export default Item;

const styles = StyleSheet.create({
	container: {
		width: '95%',
		height: scaleWidth(8.8),
		marginTop: verticalScale(5),
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#dddddd',
		paddingHorizontal: scale(10),
		justifyContent: 'center'
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	code: {
		color: '',
		fontWeight: 'bold',
		color: '#BB2640',
		fontSize: scaleWidth(1.7),
		fontFamily: GlobalStyle.Regular
	},
	content: {
		color: '',
		fontWeight: '400',
		color: '#333',
		fontSize: scaleWidth(1.7),
		fontFamily: GlobalStyle.Regular
	},
	wrapContent: {
		height: verticalScale(36),
		justifyContent: 'space-between'
	}
});
