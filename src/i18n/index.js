import I18n from 'i18n-js'
import en from "./locales/en";
import vi from "./locales/vi";

import {store} from '../redux/store'


const locale = store.getState().app.language;

I18n.locale = locale

I18n.translations = {
    en,
    vi
}
export default  I18n 