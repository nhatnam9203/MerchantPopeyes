import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { ContextMain } from 'screen/Main';

class Scanner extends Component {
	constructor(props) {
		super(props);
		this.camera = null;
		this.barcodeCodes = [];

		this.state = {
			camera: {
				type: RNCamera.Constants.Type.back,
				flashMode: RNCamera.Constants.FlashMode.auto
			}
		};
	}

	onBarCodeRead(scanResult, context) {
		if (scanResult.data != null) {
			if (!this.barcodeCodes.includes(scanResult.data)) {
				this.barcodeCodes.push(scanResult.data);
				alert(scanResult.data);
				alert(scanResult.type);
				context.navigateRoute(3);
			}
		}
		return;
	}

	async takePicture() {
		if (this.camera) {
			const options = { quality: 0.5, base64: true };
			const data = await this.camera.takePictureAsync(options);
		}
	}

	pendingView() {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: 'lightgreen',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text>Waiting</Text>
			</View>
		);
	}

	render() {
		return (
			<ContextMain.Consumer>
				{(context) => (
					<View style={styles.container}>
						<RNCamera
							ref={(ref) => {
								this.camera = ref;
							}}
							defaultTouchToFocus
							flashMode={this.state.camera.flashMode}
							mirrorImage={false}
							onBarCodeRead={(scanResult) => this.onBarCodeRead(scanResult, context)}
							onFocusChanged={() => {}}
							onZoomChanged={() => {}}
							permissionDialogTitle={'Permission to use camera'}
							permissionDialogMessage={'We need your permission to use your camera phone'}
							style={styles.preview}
							type={this.state.camera.type}
						/>
						<BarcodeMask
							width={300}
							height={300}
							edgeColor={'#B60B28'}
							showAnimatedLine={true}
							transparency={0.8}
						/>
						<View style={[ styles.overlay, styles.topOverlay ]}>
							<Text style={styles.scanScreenMessage}>POPEYES SCAN BARCODE</Text>
						</View>
					</View>
				)}
			</ContextMain.Consumer>
		);
	}
}

const styles = {
	container: {
		flex: 1
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	overlay: {
		position: 'absolute',
		padding: 16,
		right: 0,
		left: 0,
		alignItems: 'center'
	},
	topOverlay: {
		top: 0,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	bottomOverlay: {
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.4)',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	enterBarcodeManualButton: {
		padding: 15,
		backgroundColor: 'white',
		borderRadius: 40
	},
	scanScreenMessage: {
		fontSize: 14,
		color: 'white',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	}
};

export default Scanner;
