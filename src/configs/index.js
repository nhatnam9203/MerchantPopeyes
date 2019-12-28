import { Dimensions, Platform } from 'react-native';
import {scaleWidth} from '../utils'
const configs = {
    VERSION: "1.0.0",
    // app's color 
    COLOR_MAIN_APP: {
        ORANGE: '#f26c32',
        BLUE: "#3497fd",
        RED: '#b60b28',
        BLACK: '#444444',
        GREEN: '#39b54a',
        WHITE:'#ffffff',
        PLACEHOLDER:'#707070',
        PINK_BOLD:'#bd233d',
        BORDER:'#e1e1e1',
    },
    FONT_SIZE: {
        FONT_BUTTON: scaleWidth('2%'),
        FONT_SIZE_TITLE:20
        
    },
    SHADOW: {
        ...Platform.select({
            ios: {
                shadowRadius: 2,
                shadowColor: 'rgba(0, 0, 0, 1.0)',
                shadowOpacity: 0.54,
                shadowOffset: { width: 0, height: 2 },
            },

            android: {
                elevation: 2,
            },
        })
    }
}

export default configs; 