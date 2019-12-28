import React, { Component } from 'react'
import { Text, View } from 'react-native'
import I18n from "../i18n";
import ConnectRedux from "../redux/ConnectRedux";
class AppText extends Component {
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
        const { style, i18nKey } = this.props;
        const { i18n } = this.state;
        return (
            <Text style={style}>{i18nKey ? i18n.t(i18nKey) : this.props.children}</Text>
        )
    }
}
const mapStatetoProps = (state) => ({
    language: state.app.language
})
export default ConnectRedux(mapStatetoProps, AppText)
