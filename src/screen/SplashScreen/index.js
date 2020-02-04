import React, { Component } from 'react';
import ConnectRedux from 'reduxApp/ConnectRedux';
import { View, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
import { codePushKey } from 'utils';

class Splash extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.checkUpdate();
	}

	checkFlow() {
		const { isLogin } = this.props;
		setTimeout(() => {
			if (!isLogin) {
				this.props.navigation.navigate('Signin');
			} else {
				this.props.navigation.navigate('MainScreen');
			}
			SplashScreen.hide();
		}, 200);
	}

	checkUpdate() {
		codePush.checkForUpdate(codePushKey).then((update) => {
			if (update) {
                if (update.failedInstall) { /* đã update */
					this.checkFlow();
				} else {
					let options = {
						installMode: codePush.InstallMode.ON_NEXT_RESTART,
						mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
						deploymentKey: codePushKey
					};
					codePush.sync(
						options,
						this.codePushStatusDidChange.bind(this),
						this.codePushDownloadDidProgress.bind(this)
					);
				}
			} else {
				this.checkFlow();
			}
		});
	}

	codePushStatusDidChange(status) {
		switch (status) {
			case codePush.SyncStatus.CHECKING_FOR_UPDATE:
				console.log('Checking for updates.');
				break;
			case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log('Downloading package.');
				break;
			case codePush.SyncStatus.INSTALLING_UPDATE:
                console.log('Installing update.');
				break;
			case codePush.SyncStatus.UP_TO_DATE:
				console.log('Up-to-date.');
				break;
			case codePush.SyncStatus.UPDATE_INSTALLED:
                console.log('Update installed.');
                codePush.restartApp();
				break;
		}
	}

	codePushDownloadDidProgress(progress) {
		let temp = parseInt(progress.receivedBytes / progress.totalBytes);
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
}
const mapStateToProps = (state) => ({
	token: state.dataLocal,
	isLogin: state.auth.isLogin
});
export default ConnectRedux(mapStateToProps, Splash);
