import React, { Component } from 'react'
import { TextInput } from 'react-native'
import I18n from "../i18n/index";
import ConnectRedux from "../redux/ConnectRedux";
class AppTextInput extends Component {
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
    componentDidUpdate(preProps) {
        if (preProps.language !== this.props.language) {
            this.setMainLocaleLanguage(this.props.language);
        }
    }
    setMainLocaleLanguage = async (language) => {
        let { i18n } = this.state;
        i18n.locale = language;
        await this.setState({ i18n })
    }
    render() {
        const { placeholder, i18nKey, value } = this.props;
        const { i18n } = this.state;
        return (
            <TextInput {...this.props}
                placeholder={i18nKey ? i18n.t(i18nKey) : placeholder}
            />
        )
    }
}
const mapStatetoProps = (state) => ({
    language: state.app.language
})
export default ConnectRedux(mapStatetoProps, AppTextInput)
