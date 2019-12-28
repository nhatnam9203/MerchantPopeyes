import React, { Component } from 'react';
import { View, StyleSheet, Image,Keyboard } from 'react-native';
import Configs from 'configs';
const { FONT_SIZE: { FONT_SIZE_TITLE } } = Configs;
const { COLOR_MAIN_APP: { PLACEHOLDER } } = Configs;
import image from 'assets';
import { scaleWidth, scale, verticalScale, moderateScale, GlobalStyle } from 'utils';
import { Text } from 'components';

export default class Title extends Component {

	constructor(props){
		super(props)
		this.state={
			hide : false
		}
	}

	componentDidMount() {
		this.showKey = Keyboard.addListener('keyboardDidShow', this.showKeyBoard);
		this.hideKey = Keyboard.addListener('keyboardDidHide', this.hideKeyBoard);
	}

	componentWillUnmount() {
		this.showKey.remove();
		this.hideKey.remove();
	}

	showKeyBoard = (e) => {
		this.setState({hide : true})
	};

	hideKeyBoard = (e) => {
		this.setState({height : false})
	};


	render() {

		return (
			<React.Fragment>
				<View style={styles.header}>
					<Image style={{ width: 28, height: 28 }} source={image.InforCustomer} resizeMode="contain" />
					<Text style={[ styles.name, { marginLeft: scale(8) } ]} i18nKey='textTitleInfoCustomer'/>
				</View>

				<View style={styles.container}>
					<View style={styles.containerAvatar} />
					<View
						style={{
							flexDirection: 'column',
							marginLeft: scale(5),
							justifyContent: 'space-between',
							height: scaleWidth('7%')
						}}
					>
						<Text style={styles.name}>William</Text>
						<View style={styles.infor}>
							<Image
								source={image.Level}
								resizeMode="contain"
								style={{
									width: 20,
									height: 20
								}}
							/>
							<Text style={styles.title}>150</Text>
							<Text style={styles.nameLevel} i18nKey={'textSilverRank'}/>
						</View>
					</View>
				</View>
			</React.Fragment>
		);
	}
}
const styles = StyleSheet.create({
	containerAvatar: {
		width: scaleWidth('7%'),
		height: scaleWidth('7%'),
		borderRadius: scaleWidth('3.5%'),
		backgroundColor: '#c3c3c3',
		right: '1%'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		height: verticalScale(50),
		alignItems: 'stretch',
		paddingTop: verticalScale(15)
	},
	nameLevel: {
		color: PLACEHOLDER,
		fontWeight: 'normal',
		fontSize: moderateScale(16,0.25),
		fontFamily: GlobalStyle.Normal
	},
	infor: { flexDirection: 'row', alignItems: 'center' },
	container: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
	title: {
		fontSize: FONT_SIZE_TITLE,
		fontWeight: 'bold',
		marginLeft: 8,
		marginRight: 15,
		fontSize: scale(8),
		fontFamily: GlobalStyle.Weight
	},
	name: {
		fontSize: moderateScale(18,0.25),
		fontWeight: 'bold',
		marginBottom: 15,
		color: '#404040',
		fontFamily: GlobalStyle.Weight
	}
});
