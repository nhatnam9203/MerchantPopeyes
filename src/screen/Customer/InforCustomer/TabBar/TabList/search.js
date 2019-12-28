import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity,Keyboard } from 'react-native';
import Configs from 'configs';
const { COLOR_MAIN_APP: { ORANGE, WHITE, PLACEHOLDER, BORDER } } = Configs;
import { scaleWidth, scaleHeight, scale, verticalScale, GlobalStyle } from 'utils';
import Images from 'assets';
import { TextInput } from 'components';
import ConnectRedux from 'reduxApp/ConnectRedux';

class Search extends Component {

	constructor(props){
		super(props);
		this.state={
			isKeyBoard : false
		}
	}

	// componentDidMount(){
	// 	Keyboard.addListener('keyboardDidShow',this.showKeyBoard);
	// 	// Keyboard.addListener('keyboardDidHide',this.hideKeyBoard);
	// }

	// showKeyBoard=(e)=>{
	// 	this.props.actions.app.showKeyBoard();
	// }

	// hideKeyBoard=(e)=>{
	// 	this.props.actions.app.hideKeyBoard();
	// }

	render() {
		const { text, onChange } = this.props;
		return (
			<View style={styles.content}>
				<View style={styles.input}>
					<TextInput
						value={text}
						onChangeText={onChange}
						style={styles.txt}
						i18nKey="textSearch"
						placeholderTextColor={PLACEHOLDER}
					/>
				</View>
				<TouchableOpacity style={styles.button}>
					<Image
						source={Images.Search}
						style={{
							width: scale(15),
							height: scale(15)
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	isKeyBoard : state.app.isKeyBoard
});
export default ConnectRedux(mapStateToProps, Search);

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		width: '95%',
		justifyContent: 'space-between',
		height: scaleHeight('7%'),
		borderRadius: 5,
		backgroundColor: 'white',
		borderColor: BORDER,
		borderWidth: 1,
	},
	input: {
		backgroundColor: WHITE,
		justifyContent: 'center',
		borderColor: BORDER,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		width: scaleWidth('35%')
	},
	txt: {
		fontSize: scaleWidth('1.6%'),
		width: '100%',
		paddingHorizontal: scale(10),
		fontFamily: GlobalStyle.Regular
	},
	button: {
		backgroundColor: ORANGE,
		width: scaleWidth('8%'),
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		borderColor: ORANGE
	}
});
