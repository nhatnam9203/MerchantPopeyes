import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from './Modal';
import { store } from 'reduxApp/store';
import { scaleWidth } from 'utils';
import Icon from 'react-native-vector-icons/AntDesign';
export default class PopupError extends Component {
	render() {
		// const YesNoContent = store.getState().app.errorText;
		const { isModal, onPressYes, onPressNo, content, title } = this.props;
		return (
			<Modal transparent={true} onRequestClose={() => {}} visible={isModal}>
				<View style={styles.container}>
					<View style={styles.header}>
						{/* <Icon name="warning" color="#ffffff" size={scaleWidth(2.5)} /> */}
						<Text style={styles.headerText}>Confirm</Text>
					</View>

					<View style={styles.body}>
						<Text style={styles.content}>{content}</Text>

						<View style={{ flexDirection: 'row', marginTop: scaleWidth(2) }}>
							<TouchableOpacity
								hitSlop={{
									top: 20,
									right: 20,
									left: 20,
									bottom: 20
								}}
								onPress={onPressYes}
								style={styles.button}
							>
								<Text style={styles.textButton}>YES</Text>
							</TouchableOpacity>

							<TouchableOpacity
								hitSlop={{
									top: 20,
									right: 20,
									left: 20,
									bottom: 20
								}}
								onPress={onPressNo}
								style={[ styles.button, { backgroundColor: '#D1322E' } ]}
							>
								<Text style={[styles.textButton,{color : 'white'}]}>NO</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: scaleWidth(50),
		padding: scaleWidth(2),
		borderRadius: 8,
		elevation: 1
	},
	header: {
		alignItems: 'center',
		justifyContent: 'center',
		height: scaleWidth(7),
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#D1322E',
		borderTopLeftRadius : 8,
		borderTopRightRadius : 8,
	},
	headerText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: scaleWidth(2.5),
		marginLeft: scaleWidth(1)
	},
	body: {
		width: '100%',
		padding: scaleWidth(2),
		backgroundColor: 'white',
		borderBottomLeftRadius : 8,
		borderBottomRightRadius : 8,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: scaleWidth(2.2),
		letterSpacing: 0.3,
		color: '#797A8E'
	},
	content: {
		fontSize: scaleWidth(2.3),
		letterSpacing: 0.3,
		color: '#333',
		fontWeight: 'bold',
		marginTop: scaleWidth(1)
	},
	button: {
		width: scaleWidth(10),
		height: scaleWidth(4.5),
		borderRadius: 5,
		backgroundColor: '#dddddd',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: scaleWidth(2),
		alignSelf: 'flex-end',
		marginHorizontal : scaleWidth(3)
	},
	textButton: {
		color: '#333',
		fontSize: scaleWidth(2),
		fontWeight: 'bold'
	}
});
