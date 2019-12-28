import React, { Component } from 'react';
import ConnectRedux from 'reduxApp/ConnectRedux';
import ModalPromotion from './ModalPromotion';
import { Text, View, Image, StyleSheet } from 'react-native';
import Button from './button';
import imageApp from 'assets';
import { ContextMain } from 'screen/Main';

export const MethodPointContext = React.createContext();

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModal: false
		};
	}

	toggleModal() {
		const { isModal } = this.state;
		this.setState({
			isModal: !isModal
		});
	}

	render() {
		return (
			<ContextMain.Consumer>
				{(context) => (
					<MethodPointContext.Provider
						value={{
							state: this.state,
							toggleModal: () => this.toggleModal()
						}}
					>
						<View style={styles.content}>
							<Button
								title="textPoint"
								image={imageApp.TichDiem}
								onPress={() => context.navigateRoute(1)}
							/>
							<Button
								onPress={() => this.toggleModal()}
								title="textPromotion"
								image={imageApp.KhuyenMai}
							/>
						</View>
						{this.renderModalPromotion()}
					</MethodPointContext.Provider>
				)}
			</ContextMain.Consumer>
		);
	}

	renderModalPromotion() {
		return <ModalPromotion />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	}
});

const mapStateToProps = (state) => ({
	token: state.dataLocal
});
export default ConnectRedux(mapStateToProps, HomeScreen);
