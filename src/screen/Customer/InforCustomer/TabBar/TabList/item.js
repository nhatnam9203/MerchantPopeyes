import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { verticalScale, scale,moderateScale,GlobalStyle } from 'utils';
import image from 'assets';

const Item = ({ code = '', content = '', onPress, isActive }) => {
	return (
		<TouchableOpacity
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
						{content}
					</Text>
				</View>

				<Image
					source={image.Delete}
					style={{
						tintColor: isActive ? '#ffffff' : '#BB2640',
                        width : scale(12),
                        height : scale(12)
					}}
				/>
			</View>
		</TouchableOpacity>
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
		fontSize: moderateScale(15,0.25),
		fontFamily : GlobalStyle.Regular
	},
	content: {
		color: '',
		fontWeight: '400',
		color: '#333',
		fontSize: moderateScale(15,0.25),
		fontFamily : GlobalStyle.Regular
	},
	wrapContent: {
		height: verticalScale(36),
		justifyContent: 'space-between',
		
	}
});
