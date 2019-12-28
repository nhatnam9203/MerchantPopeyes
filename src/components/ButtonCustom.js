import React, { Component } from 'react'
import { View, TouchableOpacity,Button } from 'react-native'

export default class ButtonCustom extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                
                {...this.props}
                onPress={this.props.onPress}
            >
                {this.props.children}
            </TouchableOpacity>
        )
    }
}
