import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

import API from '../configs/api';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = size => shortDimension / guidelineBaseWidth * size;
export const verticalScale = size => longDimension / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.25) => size + ( scale(size) - size ) * factor;

export const scaleWidth = size => wp(size);
export const scaleHeight = size => hp(size);

export const GlobalStyle = {
    Normal : 'Roboto',
    Weight : 'Roboto-Bold',
    Regular : 'Roboto-Regular',
    Italic : 'Roboto-Italic',
    Medium : 'Roboto_medium'
}

function fetchWithTimeout(url, options, timeout = 10000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject({ message: 'request timeout' }), timeout)
        )
    ]);
}

export const requestAPI = async (action, headers = {}) => {
    let url = API.BASE_API + action.route;
    let method = action.method || 'GET';
    let request = {
        method,
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    if (action.token) {
        request.headers['Authorization'] = "Bearer " + action.token;
    }
    if (method !== 'GET' && action.body) {
        request.headers['body'] = JSON.stringify(action.body);
    }
    try {
        let response = await fetchWithTimeout(url, request, 15000)
        const codeNumber = response.status;
        if (codeNumber === 401) {
            return { codeNumber: codeNumber }
        }
        const data = await response.json();
        return { ...data };
    } catch (error) {
        throw error
    }
}

export const getPosotion = (options = {}) => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};

export const isIphoneX = () => {
    const { height, width } = Dimensions.get('window');
    return (Platform.OS === 'ios' && (height === 812 || width === 812)
    );
}

export const validYear = (year) => {
    let rex = /^[12][0-9]{3}$/;
    return rex.test(year);
}

export const openBrowser = (urlSocial) => {
    Linking.canOpenURL(urlSocial).then(supported => {
        if (!supported) {
        } else {
            return Linking.openURL(urlSocial);
        }
    }).catch(err => console.error('An error occurred', err));
}

export const validateIsNumber = (number) => {
    var n = Number(number);
    return !(n !== n);
}

export const validatePassword = (password) => {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/;
    return re.test(String(password));
}

export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase().trim());
}
