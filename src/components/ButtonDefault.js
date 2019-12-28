import React, { PureComponent } from 'react'
import ButtonCustom from "./ButtonCustom"
import Text from "./Text";
import { scaleWidth, scaleHeight } from "../utils"
import Configs from "../configs"
import { View } from 'react-native'
const { COLOR_MAIN_APP: { ORANGE,WHITE } } = Configs

import I18n from "../i18n";
import ConnectRedux from "../redux/ConnectRedux";

class ButtonDefault extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            i18n: I18n
        }
    }

    componentDidMount() {
        const { language } = this.props;
        if (language) this.setMainLocaleLanguage(language)
    }   
    
    componentDidUpdate(preProps){
        const {language} = this.props;
        if (language !== preProps.language) this.setMainLocaleLanguage(language)
    }

    setMainLocaleLanguage = async (language) => {
        let { i18n } = this.state;
        i18n.locale = language;
        await this.setState({ i18n })
    }

    render() {
        const { width, height,border ,backgroundColor, title, textColor, style, styleText, fontsize,i18nKey,onPress=()=>console.log() } = this.props
        const temtpHeight = height ? height : '7%'
        const temtpWidth = width ? width : '40%'
        const temtpBorder = border ? border : 5
        const temtpBackgroundColor = backgroundColor?backgroundColor:ORANGE
        const temtpTextColor = textColor?textColor: WHITE
        const temtpFontsize = fontsize?fontsize:"2%"
        const {i18n} = this.state;
        return (
            <View style={{alignItems:'center'}}>
                <ButtonCustom onPress={ onPress} style={[{
                        flexDirection:'row',
                        width: scaleWidth(temtpWidth),
                        height: scaleHeight(temtpHeight),
                        backgroundColor:  temtpBackgroundColor,
                        borderRadius: temtpBorder,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }, style]} >
                        <Text
                            style={[{ color: temtpTextColor, fontWeight: 'bold', fontSize: scaleWidth(temtpFontsize) },
                                styleText]} >
                            {i18nKey ? i18n.t(i18nKey) : title}
                        </Text>
                    </ButtonCustom>
            </View>
           
        );
    }
}

const mapStatetoProps = (state) => ({
    language: state.app.language
})
export default ConnectRedux(mapStatetoProps, ButtonDefault)