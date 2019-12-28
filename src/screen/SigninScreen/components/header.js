import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import image from 'assets';
import ConnectRedux from 'reduxApp/ConnectRedux';
import { verticalScale, moderateScale, GlobalStyle } from 'utils';
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
									<Text
										style={{
											fontSize: moderateScale(13),
											marginLeft: 5,
											fontWeight: '600',
											color: '#404040',
											fontFamily: GlobalStyle.Medium
										}}
									>
										VI
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => this.props.actions.app.changeLanguage('en')}
									style={styles.row}
								>
									<Image
										source={image.Eu}
										style={{ width: moderateScale(26), height: verticalScale(17) }}
										resizeMode="contain"
									/>
									<Text
										style={{
											fontSize: moderateScale(13),
											marginLeft: 5,
											fontWeight: '600',
											color: '#404040',
											fontFamily: GlobalStyle.Medium,
										}}
									>
										EN
									</Text>
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
		top: '3%',
		width: moderateScale(120,0.25),
		alignItems: 'center',
		justifyContent: 'space-around',
		left: moderateScale(25)
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
