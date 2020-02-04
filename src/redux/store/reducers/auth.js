
import createReducer from '../createReducer'

const initialState = {
	merchant: '',
	token: '',
	staff: '',
	isLogin: false
};

const auth = createReducer(initialState, {
	['LOGIN_SUCCESS'](state,action) {
		const {store} = action.payload;
		return {
			...state,
			merchant: store,
			isLogin: true
		};
	},
	['LOGOUT'](state) {
		return {
			...state,
			merchant: '',
			store: '',
			isLogin: false
		};
	}
});

export default auth;
