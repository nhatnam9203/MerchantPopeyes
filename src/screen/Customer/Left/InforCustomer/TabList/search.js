import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Configs from 'configs';
import { scaleWidth, scale, GlobalStyle } from 'utils';
import Images from 'assets';
import { TextInput } from 'components';

const { COLOR_MAIN_APP: { ORANGE, WHITE, PLACEHOLDER, BORDER } } = Configs;

export default class search extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
	}

	_search = () => {
		const { value } = this.state;
		this.props.onPressSearch(value);
	};

	render() {
		return (
			<View style={styles.content}>
				<View style={styles.input}>
					<TextInput
						value={this.state.value}
						onChangeText={(value) => this.setState({ value })}
						style={styles.txt}
						i18nKey="textSearch"
						placeholderTextColor={PLACEHOLDER}
					/>
				</View>

				<TouchableOpacity onPress={this._search} style={styles.button}>
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

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		width: '95%',
		justifyContent: 'space-between',
		height: scaleWidth(5),
		borderRadius: 5,
		backgroundColor: 'white',
		borderColor: BORDER,
		borderWidth: 1
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
		fontSize: scaleWidth(1.8),
		width: '100%',
		paddingHorizontal: scaleWidth(2),
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
