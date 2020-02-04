import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from './Modal';
import { store } from 'reduxApp/store';
import { scaleWidth } from 'utils';
import Icon from 'react-native-vector-icons/AntDesign';
export default class PopupError extends Component {
	render() {
		const errorText = store.getState().app.errorText;
		const { isModal, onPress, } = this.props;
		return (
			<Modal transparent={true} onRequestClose={() => {}} visible={isModal}>
				<View style={styles.container}>
					<View style={styles.header}>
                        <Icon name='warning' color='#ffffff' size={scaleWidth(2.5)} />
						<Text style={styles.headerText}>Error</Text>
					</View>
					<View style={styles.body}>
						<Text style={styles.content}>{errorText}</Text>
                        <View style={{borderBottomWidth : 1, borderBottomColor : 'grey' , width : '100%',marginTop : scaleWidth(2)}} />
						<TouchableOpacity
							hitSlop={{
								top: 20,
								right: 20,
								left: 20,
								bottom: 20
							}}
							onPress={onPress}
							style={styles.button}
						>
							<Text style={styles.textButton}>OK</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: scaleWidth(60),
		padding: scaleWidth(2),
		borderRadius: 8
	},
	header: {
		alignItems: 'center',
		height: scaleWidth(7),
		flexDirection: 'row',
		width: '100%',
        backgroundColor: '#D1322E',
		paddingLeft : scaleWidth(2),
		borderTopLeftRadius : 8,
		borderTopRightRadius : 8
	},
	headerText: {
		color: 'white',
		fontWeight: 'bold',
        fontSize: scaleWidth(2.5),
        marginLeft : scaleWidth(1)
	},
	body: {
		width: '100%',
		padding: scaleWidth(2),
		backgroundColor: 'white',
		borderBottomLeftRadius : 8,
		borderBottomRightRadius : 8
	},
	content: {
		fontSize: scaleWidth(2.2),
		letterSpacing: 0.3,
		color: '#333'
	},
	button: {
		width: scaleWidth(10),
		height: scaleWidth(4.5),
		borderRadius: 5,
		backgroundColor: '#D1322E',
		justifyContent: 'center',
		alignItems: 'center',
        marginTop: scaleWidth(2),
        alignSelf : 'flex-end'
	},
	textButton: {
		color: 'white',
		fontSize: scaleWidth(2),
		fontWeight: 'bold'
	}
});
