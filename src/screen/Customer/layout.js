import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { scale, moderateScale, GlobalStyle } from 'utils';
import InforCustomer from './InforCustomer';
import ScrollTabView from 'react-native-scrollable-tab-view';
import InforInput from './InforOder/components/InforInput';
import Infor from './InforOder/components/infor';
import image from 'assets';
import InforCustomerInput from './InforCustomerInput';
import { ContextMain } from 'screen/Main';
import { Text } from 'components';

const { width } = Dimensions.get('window');

export const CustomerContext = React.createContext();

export default class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenOrderInput: -1,
			isInputInfor: false
		};
		this.scrollInforOrder = React.createRef();
	}

	toggleOrderInput(number) {
		this.setState({
			isOpenOrderInput: number
		});
	}

	openInforCustomer() {
		this.setState({
			isInputInfor: false
		});
	}

	openInputInforCustomer() {
		this.setState({
			isInputInfor: true
		});
	}

	componentDidUpdate() {

		if(this.scrollInforOrder.current){
			if (this.state.isOpenOrderInput === 0) {
				this.scrollInforOrder.current.goToPage(0);
			}
	
			if (this.state.isOpenOrderInput === 1) {
				this.scrollInforOrder.current.goToPage(1);
			}
		}
	}

	handleBack() {
		if (this.state.isOpenOrderInput === 0 || this.state.isOpenOrderInput === -1) {
			this.props.navigation.goBack();
		}

		if (this.state.isOpenOrderInput === 1) {
			this.scrollInforOrder.current.goToPage(0);
			this.setState({ isOpenOrderInput: 0 });
		}
	}

	logOut() {
		this.props.navigation.navigate('AuthStack');
	}

	render() {
		const { isInputInfor } = this.state;

		return (
			<ContextMain.Consumer>
				{(context) => (
					<CustomerContext.Provider
						value={{
							state: this.state,
							toggleOrderInput: (number) => this.toggleOrderInput(number),
							openInputInforCustomer: () => this.openInputInforCustomer(),
							openInforCustomer: () => this.openInforCustomer()
						}}
					>
						<View style={styles.container}>
							{/* Left */}
							<View style={styles.contentLeft}>
								{!context.state.Customer.isOpenInputCustomer && <InforCustomer />}
								{context.state.Customer.isOpenInputCustomer && <InforCustomerInput />}
							</View>

							{/* Right */}
							<View style={styles.contentRight}>
								<View style={styles.header}>
									<Image source={image.Order} style={styles.imgHeader} />
									<Text style={styles.txtHeader} i18nKey={'textTitleOrder'} />
								</View>
								
									<ScrollTabView
										ref={this.scrollInforOrder}
										initialPage={0}
										locked={true}
										scrollWithoutAnimation={false}
										style={{
											width: width / 2
										}}
										renderTabBar={() => <View />}
									>
										{context.state.Customer.isData && <Infor />}
										{context.state.Customer.isData && <InforInput />}
									</ScrollTabView>
								
							</View>
						</View>
					</CustomerContext.Provider>
				)}
			</ContextMain.Consumer>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: scale(8),
		zIndex: 9999
	},
	contentLeft: {
		flex: 1,
		zIndex: 9,
		backgroundColor: 'white',
		borderRightWidth: 1,
		borderRightColor: '#dddddd'
	},
	contentRight: {
		flex: 1
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		padding: scale(10),
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd'
	},
	imgHeader: {
		width: 28,
		height: 28,
		resizeMode: 'contain'
	},
	txtHeader: {
		marginLeft: scale(7),
		fontSize: moderateScale(18),
		fontWeight: 'bold',
		color: '#404040',
		fontFamily: GlobalStyle.Weight
	}
});
