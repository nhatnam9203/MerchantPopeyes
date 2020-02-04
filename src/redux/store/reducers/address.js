import createReducer from '../createReducer';

const initialState = {
	district: [],
	wards: [],
	street: [],

	selectedCity : '',
	selectedDistrict : '',
	selectedWards : '',
	selectedStreet : '',
	selectedArea : '',
};

const customer = createReducer(initialState, {
	['GET_DISTRICT_SUCCESS'](state, action) {
		return { ...state, district: action.payload };
	},
	['GET_WARDS_SUCCESS'](state, action) {
		return { ...state, wards: action.payload };
	},
	['GET_STREET_SUCCESS'](state, action) {
		return { ...state, street: action.payload };
	},

	['CHOOSE_CITY'](state, action) {
		return { ...state, selectedCity: action.payload };
	},
	['CHOOSE_DISTRICT'](state, action) {
		return { ...state, selectedDistrict: action.payload };
	},
	['CHOOSE_WARDS'](state, action) {
		return { ...state, selectedWards: action.payload };
	},
	['CHOOSE_STREET'](state, action) {
		return { ...state, selectedStreet: action.payload };
	},
	['GET_AREA_SUCCESS'](state, action) {
		return { ...state, selectedArea: action.payload };
	}
});

export default customer;
