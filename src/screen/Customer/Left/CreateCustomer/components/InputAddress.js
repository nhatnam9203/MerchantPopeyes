import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { GlobalStyle, scaleWidth } from 'utils';
import Icon from 'react-native-vector-icons/Fontisto';

const initialState = {
	value: ''
};

export default class InforInpur extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	render() {
		const { value, onPress,style } = this.props;
		return (
			<TouchableOpacity onPress={onPress} style={[styles.textInput,{
				...style
			}]}>
				<Text style={{
					fontSize : scaleWidth(1.5),
					color : '#333'
				}}>{value}</Text>
				<Icon name="caret-down" size={scaleWidth(1.7)} color="#555555" style={styles.iconDropDown} />
				{/* <TextInput
					{...this.props}
					editable={true}
					onTouchStart={onPress}
					value={value}
					disabled={true}
					style={[
						styles.textInput,
						{
							...this.props.style
						}
					]}
					placeholderTextColor="#a8abad"
				/>
				<Icon name="caret-down" size={scaleWidth(1.7)} color="#555555" style={styles.iconDropDown} /> */}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		backgroundColor: '#ffffff',
		width: scaleWidth(19.25),
		height: scaleWidth(5),
		borderColor: '#dddddd',
		borderRadius: 5,
		borderWidth: 1,
		marginTop: scaleWidth(1.5),
		paddingHorizontal: scaleWidth(2),
		fontSize: scaleWidth(1.3),
		fontFamily: GlobalStyle.Regular,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	iconDropDown: {}
});
