import React, { Component } from 'react'
import ConnectRedux from "../../redux/ConnectRedux";
import { Text, View,ImageBackground,Image,ActivityIndicator} from 'react-native'
import styles from "./style";
import image from "../../assets"

class SplashScreen extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if (this.props.token)
        setTimeout(() => {
            this.props.navigation.navigate('Signin')
        }, 500);   
    }

    render() {
        return (
            <View style={{ flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    token: state.dataLocal
})
export default ConnectRedux(mapStateToProps, SplashScreen)
