import React, { Component } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { ContextMain } from 'screen/Main';
import ConnectRedux from 'reduxApp/ConnectRedux';
import { scaleWidth } from '../../../utils';
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

	onBarCodeRead(scanResult) {
		if (scanResult.data != null) {
			this.props.actions.customer.onChangeBarcode(scanResult.data);
			this.props.ScanOK();
		}
		return;
	}

	render() {
		return (
			<View style={styles.container}>
				<RNCamera
					ref={(ref) => {
						this.camera = ref;
					}}
					defaultTouchToFocus
					flashMode={this.state.camera.flashMode}
					mirrorImage={false}
					onBarCodeRead={(scanResult) => this.onBarCodeRead(scanResult)}
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

				<TouchableOpacity
					onPress={() => this.props.ScanOK()}
					style={{
						position: 'absolute',
						bottom: scaleWidth(2),
						right: scaleWidth(2),
						paddingHorizontal: scaleWidth(2),
						paddingVertical: scaleWidth(1),
						backgroundColor: '#B80423',
						borderRadius: 5
					}}
				>
					<Text style={{ color: 'white', fontSize: scaleWidth(2) }}>Cancel</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default ConnectRedux(null, Scanner);

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
