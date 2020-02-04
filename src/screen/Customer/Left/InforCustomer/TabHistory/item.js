import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { verticalScale, scale, moderateScale, GlobalStyle, scaleWidth} from 'utils';
import { TouchableRipple } from 'react-native-paper';
import image from 'assets';

const Item = ({ code = '', content = '', onPress, isActive }) => {
	return (
		<TouchableRipple
			rippleColor="#dddddd"
			onPress={onPress}
			style={[
				styles.container,
				{
					backgroundColor: isActive ? '#F5F5F5' : '#ffffff'
				}
			]}
		>
			<View style={styles.row}>
				<View style={styles.wrapContent}>
					<Text
						style={[
							styles.code,
							{
								color: isActive ? '#BB2640' : '#BB2640'
							}
						]}
					>
						#{code}
					</Text>

					<Text
						style={[
							styles.content,
							{
								color: isActive ? '#333' : '#333'
							}
						]}
					>
						{content}
					</Text>
				</View>

				<TouchableOpacity hitSlop={{ top: 30, bottom: 30, right: 30, left: 30 }}>
					<Image
						source={image.Delete}
						style={{
							tintColor: isActive ? '#BB2640' : '#BB2640',
							width: scaleWidth(2.7),
							height: scaleWidth(2.7)
						}}
					/>
				</TouchableOpacity>
			</View>
		</TouchableRipple>
	);
};

export default Item;

const styles = StyleSheet.create({
	container: {
		width: '95%',
		height: verticalScale(60),
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
