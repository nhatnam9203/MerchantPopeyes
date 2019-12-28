import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from 'components/Header';
import ScrollTabView from 'react-native-scrollable-tab-view';
import { Customer, DetailMethodPoint, HomeScreen, MethodPoints } from 'screen';
import Scanner from '../DetailMethodPoint/Scanner';

export const ContextMain = React.createContext();

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Home: {},
			MethodPoint: {},
			Barcode: {},
			SearchPhone: {},
			Customer: {
				isOpenInputCustomer: false,
				isData : false
			},
			DetailMethod: {
				isSearchPhone: false,
				isBarcode: false
			},
			tabIndex: 0
		};

		this.scrollMain = React.createRef();
	}

	openSearchPhone() {
		this.setState({
			DetailMethod: {
				isSearchPhone: true,
				isBarcode: false
			}
		});
	}

	openBarcode() {
		this.setState({
			DetailMethod: {
				isSearchPhone: false,
				isBarcode: true
			}
		});
	}

	navigateRoute(index) {
		if(index){
			this.setState({ tabIndex: index });
			this.scrollMain.current.goToPage(index);
		}
	}

	toggleInforCustomer(status) {
		this.setState({
			Customer: {
				isOpenInputCustomer: status
			}
		});
	}

	setInforOrder(status){
		this.setState({
			Customer : {
				isData : status
			}
		})
	}

	/* 
    0 : Home ,
    1 : Method Point,
    2 : Detail Method ,
    3 : Customer
    */

	handleBack() {
		const { tabIndex } = this.state;
		this.setInforOrder(false)
		if (tabIndex === 4) {
			this.scrollMain.current.goToPage(tabIndex - 2);
			this.setState({ tabIndex: tabIndex - 2 });
		} else {
			this.scrollMain.current.goToPage(tabIndex - 1);
			this.setState({ tabIndex: tabIndex - 1 });
		}
	}

	logout() {
		this.props.navigation.navigate('AuthStack');
	}

	render() {
		return (
			<ContextMain.Provider
				value={{
					state: this.state,
					navigateRoute: (index) => this.navigateRoute(index),
					toggleInforCustomer: (status) => this.toggleInforCustomer(status),
					openBarcode: () => this.openBarcode(),
					openSearchPhone: () => this.openSearchPhone(),
					setInforOrder : (status) => this.setInforOrder(status),
				}}
			>
				<Header
					logout={() => this.logout()}
					isRight={true}
					isBotLeft={true}
					isBack={this.state.tabIndex === 0 ? false :true}
					onPress={() => this.handleBack()}
				>
					<ScrollTabView initialPage={0} locked={true} ref={this.scrollMain} renderTabBar={() => <View />}>
						<HomeScreen />
						<MethodPoints />
						<DetailMethodPoint />
						<Customer />
						<Scanner />
					</ScrollTabView>
				</Header>
			</ContextMain.Provider>
		);
	}
}
