import I18n from '@i18n';

const initialState = {
	language: 'en',
	isKeyBoard: false,
	loading: false,
	loadingTask: false,
	errorText: ''
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
		case 'LOADING_TASK':
			return { ...state, loadingTask: true };
		case 'STOP_LOADING_TASK':
			return { ...state, loadingTask: false };
		case 'SHOW_KEYBOARD':
			return { ...state, isKeyBoard: true };
		case 'HIDE_KEYBOARD':
			return { ...state, isKeyBoard: false };
		case 'SET_TEXT_ERROR':
			return { ...state, errorText: action.payload };
		default:
			return state;
	}
};
export default app;
