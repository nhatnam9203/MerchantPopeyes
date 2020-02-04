import I18n from '@i18n';

const initialState = {
	isData : false,
};
const app = (state = initialState, action) => {
	switch (action.type) {
        case 'DATA_ORDER':
			return { ...state, isData: action.data };
		default:
			return state;
	}
};
export default app;
