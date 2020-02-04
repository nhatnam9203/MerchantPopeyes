import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { GlobalStyle, scaleWidth } from 'utils';

const initialState = {
	value: ''
};

export default class InforInpur extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
	}

	setValue(value){
		this.setState({value})
	}

	render() {
		const { value } = this.props;
		return (
			<TextInput
				{...this.props}
				value={value ? value : this.state.value}
				onChangeText={value=>this.setState({value})}
				style={[
					styles.textInput,
					{
						...this.props.style
					}
				]}
				placeholderTextColor="#a8abad"
			/>
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
		fontSize: scaleWidth(1.7),
		fontFamily: GlobalStyle.Regular
	}
});
