import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import image from 'assets';
import ConnectRedux from 'reduxApp/ConnectRedux';
import { verticalScale, moderateScale, GlobalStyle, scaleWidth } from 'utils';
import { Right } from 'native-base';

class HeaderLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			language: 'en'
		};
	}

	render() {
		return (
			<React.Fragment>
				<StatusBar hidden={true} />
				<View style={styles.container}>
					<Right>
						<ImageBackground source={image.Language} style={styles.imageBackground}>
							<View style={styles.topRight}>

								<TouchableOpacity
									onPress={() => this.props.actions.app.changeLanguage('vi')}
									style={styles.row}
								>
									<Image
										source={image.Vn}
										style={{ width: moderateScale(26), height: verticalScale(17) }}
										resizeMode="contain"
									/>
									<Text style={styles.vi}>VI</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => this.props.actions.app.changeLanguage('en')}
									style={[
										styles.row,
										{
											marginLeft: scaleWidth(1.1)
										}
									]}
								>
									<Image
										source={image.Eu}
										style={{ width: moderateScale(26), height: verticalScale(17) }}
										resizeMode="contain"
									/>
									<Text style={styles.en}>EN</Text>
								</TouchableOpacity>

							</View>
						</ImageBackground>
					</Right>
				</View>
			</React.Fragment>
		);
	}
}
export default ConnectRedux(null, HeaderLogin);

const styles = StyleSheet.create({
	imageBackground: {
		width: moderateScale(150),
		height: moderateScale(38)
	},
	container: {
		top: '-0.6%',
		right: '-1%',
		flexDirection: 'row'
	},
	topRight: {
		flexDirection: 'row',
		top: '3.2%',
		width: scaleWidth(12),
		left: scaleWidth(3)
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	vi: {
		fontSize: moderateScale(13),
		marginLeft: 3,
		fontWeight: '600',
		color: '#404040',
		fontFamily: GlobalStyle.Medium
	},
	en: {
		fontSize: moderateScale(13),
		marginLeft: 3,
		fontWeight: '600',
		color: '#404040',
		fontFamily: GlobalStyle.Medium
	}
});
