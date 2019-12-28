import I18n from '@i18n';

const initialState = {
	language: 'en',
	isKeyBoard : false
};
const app = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGE_LANGUAGE':
			I18n.locale = action.language;
			return { ...state, language: action.language };
		case 'LOADING_ROOT':
			return { ...state, loading: true };
		case 'STOP_LOADING_ROOT':
			return { ...state, loading: false };
		case 'SHOW_KEYBOARD':
			return { ...state, isKeyBoard: true };
		case 'HIDE_KEYBOARD':
			return { ...state, isKeyBoard: false };
		default:
			return state;
	} 
};
export default app;
