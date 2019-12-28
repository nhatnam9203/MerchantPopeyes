import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, } from 'react-native';
import Title from './Title';
import InforUser from './InforUser';
import image from 'assets';
import WrapTabbar from './TabBar';
import ConnectRedux from 'reduxApp/ConnectRedux';

class InforCustomer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hide: false
		};
	}

	componentDidMount() {
		this.showKey = Keyboard.addListener('keyboardDidShow', this.showKeyBoard);
		this.hideKey = Keyboard.addListener('keyboardDidHide', this.hideKeyBoard);
	}

	componentWillUnmount() {
		this.showKey.remove();
		this.hideKey.remove();
	}

	showKeyBoard = (e) => {
		this.scrollView.scrollTo(e.endCoordinates.height);
	};

	hideKeyBoard = (e) => {
		this.scrollView.scrollTo(0);
	};

	renderTab() {
		const { language } = this.props;
		const Layout = WrapTabbar(language);
		return <Layout />;
	}

	render() {
		return (
			<ScrollView
				ref={(ref) => (this.scrollView = ref)}
				showsVerticalScrollIndicator={false}
				style={styles.content}
			>

					<InforUser />
					<Title name={'textTitleInvoice'} image={image.Order} />
					{this.renderTab()}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	content: { marginHorizontal: 15, flex: 1 }
});

const mapStateToProps = (state) => ({
	language: state.app.language
});
export default ConnectRedux(mapStateToProps, InforCustomer);
