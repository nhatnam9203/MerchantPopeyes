import React, { Component } from 'react';
import ConnectRedux from 'reduxApp/ConnectRedux';
import ModalPromotion from './ModalPromotion';
import { Text, View, Image, StyleSheet } from 'react-native';
import Button from './button';
import imageApp from 'assets';
import ScanPromotion from './ScanPromotion/index';
import * as url from '../../utils/api-constant';
import axios from 'axios';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModal: false,
			isScan: false,
			dataScan: '',
			vouncher_code: ''
		};
	}

	toggleModal = () => {
		const { isModal } = this.state;
		this.setState({
			isModal: !isModal
		});
	};

	componentDidMount() {
		this.props.actions.app.stopLoadingApp();
	}

	cancelScan = () => {
		this.setState({ isScan: false });
	};

	async scanOk(data) {
		this.props.actions.app.loadingApp();
		try {
			this.setState({ isScan: false });
			const vouncher = 'T6D3BF';
			await axios
				.get(url.GetVouncherDetail + data)
				.then((result) => {
					console.log({result})
					try {
						if (result.status === 200) {
							if (result.data.data) {
								this.setState({
									dataScan: result.data.data,
									vouncher_code: data // vouncher_code = data;
								});
								this.toggleModal();
							} else {
								this.setState({ dataScan: '' });
								this.props.actions.app.setTextError('Mã khuyến mãi không hợp lệ');
							}
						}
					} catch (err) {
						this.setState({ dataScan: '' });
						alert(err);
					}
				})
				.catch((err) => {
					this.setState({ dataScan: '' });
					alert(err);
				});
		} catch (err) {
		} finally {
			this.props.actions.app.stopLoadingApp();
		}
	}

	openScanner = () => {
		this.setState({ isScan: true, dataScan: '' });
	};

	resetVouncher = () => {
		this.setState({ vouncher_code: '', dataScan: '' });
	};

	renderModalPromotion() {
		if (this.state.dataScan)
			return (
				<ModalPromotion
					startLoadingTask={this.props.actions.app.loadingTask}
					stopLoadingTask={this.props.actions.app.stopLoadingTask}
					loadingTask={this.props.loadingTask}
					dataScan={this.state.dataScan}
					toggleModal={this.toggleModal}
					isModal={this.state.isModal}
					vouncher_code={this.state.vouncher_code}
					resetVouncher={this.resetVouncher}
					useVouncher={this.props.actions.customer.useVouncher}
				/>
			);
	}

	render() {
		const { isScan } = this.state;
		return (
			<React.Fragment>
				{/* ------- Not Scan ------- */}
				{!isScan && (
					<React.Fragment>
						<View style={styles.content}>
							<Button
								title="textPoint"
								image={imageApp.TichDiem}
								onPress={() => this.props.navigateTo('MethodPoint')}
							/>
							<Button onPress={this.openScanner} title="textPromotion" image={imageApp.KhuyenMai} />
						</View>
						{this.renderModalPromotion()}
					</React.Fragment>
				)}

				{/* ------- Scan ------- */}
				{isScan && <ScanPromotion ScanOK={(data) => this.scanOk(data)} cancelScan={this.cancelScan} />}
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	}
});

const mapStateToProps = (state) => ({
	token: state.dataLocal,
	loadingTask: state.app.loadingTask
});
export default ConnectRedux(mapStateToProps, HomeScreen);
