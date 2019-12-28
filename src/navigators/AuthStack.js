import {
    SigninScreen,
} from "../screen";
import { createStackNavigator } from 'react-navigation-stack';
import React from "react";
export default createStackNavigator({
    Signin: SigninScreen
},
    {
        initialRouteName: 'Signin',
        headerMode: 'none'
    }
)