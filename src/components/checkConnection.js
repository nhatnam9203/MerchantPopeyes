import React, { Component } from 'react'
import { View, Text, StyleSheet,AppState } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { scaleWidth } from "../utils";
import NetInfo from "@react-native-community/netinfo";
export default class checkConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
            appState: AppState.currentState
        }
    }
    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleNetworkConnect)
        AppState.addEventListener('change', this._handleAppStateChange)
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleNetworkConnect)
        AppState.removeEventListener('change', this._handleAppStateChange)
    }

    checkNetWork = () => {
        NetInfo.isConnected.fetch().then((isConnected) => {
            this.setState({ isConnected })
        })
    }

    _handleNetworkConnect = (isConnected) => {

        this.setState({ isConnected })
    }

    _handleAppStateChange = (nextAppState) => {
  
        if (nextAppState === 'active') {
            this.checkNetWork()
        }
    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                {!this.state.isConnected &&
                    <View style={styles.container}>
                        <Text style={styles.textNetwork}> !!! Network fail !!! </Text>
                    </View>}
                {this.props.children}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        zIndex: 999,
        alignSelf: 'center',
        paddingVertical: 5,
        position: 'absolute',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        top: isIphoneX() ? 98 : 50
    },
    textNetwork: {
        color: 'black',
        fontSize: scaleWidth('8%')
    }
})
