import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import {Button} from 'native-base'

export default class ButtonCustom extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Button
                activeOpacity={0.8}
                
                {...this.props}
                onPress={this.props.onPress}
            >
                {this.props.children}
            </Button>
        )
    }
}
