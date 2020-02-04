import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import Header from 'components/Header';
import ScrollTabView from 'react-native-scrollable-tab-view';
import { Customer, DetailMethodPoint, HomeScreen, MethodPoints } from 'screen';
import ConnectRedux from 'reduxApp/ConnectRedux';
import { PopupError } from 'components';
import { Network } from 'components';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			DetailMethod: {
				isSearchPhone: false,
				isBarcode: false
			},
			tabIndex: 0,
			isNetwork: '',
			isError: false
		};

		this.scrollMain = React.createRef();
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
		this.closeModalError();
	}

	handleBackPress = () => {
		return true;
	};

	openSearchPhone = () => {
		this.setState({
			DetailMethod: {
				isSearchPhone: true,
				isBarcode: false
			}
		});
	};

	openBarcode = () => {
		this.setState({
			DetailMethod: {
				isSearchPhone: false,
				isBarcode: true
			}
		});
	};

	navigateTo = (routeName) => {
		switch (routeName) {
			case 'Home':
				this.setState({ tabIndex: 0 });
				this.scrollMain.current.goToPage(0);
				break;
			case 'MethodPoint':
				this.setState({ tabIndex: 1 });
				this.scrollMain.current.goToPage(1);
				break;
			case 'DetailMethod':
				this.setState({ tabIndex: 2 });
				this.scrollMain.current.goToPage(2);
				break;
			case 'Customer':
				this.setState({ tabIndex: 3 });
				this.scrollMain.current.goToPage(3);
				break;
			default:
				break;
		}
	};

	openModalError = () => {
		this.setState({ isError: true });
	};

	closeModalError = () => {
		this.setState({ isError: false });
		this.props.actions.app.setTextError('');
	};

	handleBack = () => {
		const { tabIndex } = this.state;
		this.props.actions.app.handleBack();
		if (this.scrollMain.current) {
			this.scrollMain.current.goToPage(tabIndex - 1);
			this.setState({ tabIndex: tabIndex - 1 });
		}
	};

	logout = () => {
		this.props.navigation.navigate('Signin');
		this.props.actions.auth.logout();
	};

	playSound() {
		whoosh.play();
	}

	componentDidUpdate(prevProps) {
		const { checkSearchPhone } = this.props;
		if (checkSearchPhone !== prevProps.checkSearchPhone) {
			if (checkSearchPhone === 'yes' || checkSearchPhone === 'no') {
				this.navigateTo('Customer');
			}
		}

		if (prevProps.errorText !== this.props.errorText && this.props.errorText !== '') {
			this.openModalError();
		}
	}

	render() {
		const { isScanCustomer } = this.props;
		const { isError, tabIndex } = this.state;

		const props = Object.assign({}, this.props, {
			...this.state,
			navigateTo: this.navigateTo,
			toggleInforCustomer: this.toggleInforCustomer,
			openBarcode: this.openBarcode,
			openSearchPhone: this.openSearchPhone
		});

		return (
			<Header
				logout={this.logout}
				isRight={true}
				isBotLeft={true}
				isBack={tabIndex === 0 || isScanCustomer === true ? false : true}
				onPress={this.handleBack}
			>
				<ScrollTabView initialPage={0} locked={true} ref={this.scrollMain} renderTabBar={() => <View />}>
					<HomeScreen {...props} />
					<MethodPoints {...props} />
					<DetailMethodPoint {...props} />
					<Customer {...props} />
				</ScrollTabView>

				<PopupError onPress={this.closeModalError} isModal={isError} />
			</Header>
		);
	}
}

const mapStateToProps = (state) => ({
	language: state.app.language,
	loading: state.app.loading,
	auth: state.auth,
	checkSearchPhone: state.customer.checkSearchPhone,
	isScanCustomer: state.customer.isScanCustomer,
	errorText: state.app.errorText,
	isDataOrder: state.order.isData,
	inforCustomer: state.customer.Info,
	checkPhoneCustomer: state.customer.checkSearchPhone,
	isCollectPoint: state.customer.isCollectPoint,
	detailOrder: state.customer.detailOrder,
	merchant: state.auth.merchant,
	isSubmitOrder : state.customer.isSubmitOrder,
});

const MainPage = Network(Main);
export default ConnectRedux(mapStateToProps, MainPage);
