import createReducer from '../createReducer';

const initialState = {
	Info: '',
	checkSearchPhone: '',
	barcode: '',
	phoneSearch: '',
	isCollectPoint: false,
	isScanCustomer: false,
	orderList: [],
	orderListFilter: [],
	orderListHistoryFilter: [],
	orderListHistory: [],
	detailOrder: '',
	detailOrderHistory: '',
	dataScanPromotion: false,
	isSubmitOrder: false
};

const customer = createReducer(initialState, {
	['GET_CUSTOMER_SUCCESS'](state, action) {
		return { ...state, Info: action.payload };
	},
	['CHECK_SEARCH_PHONE'](state, action) {
		return { ...state, checkSearchPhone: action.payload };
	},
	['ON_CHANGE_BARCODE'](state, action) {
		return { ...state, barcode: action.payload };
	},
	['COLLECT_POINT_SUCCESS'](state, action) {
		return { ...state, isCollectPoint: action.payload };
	},
	['ON_CHANGE_PHONE'](state, action) {
		return { ...state, phoneSearch: action.payload };
	},
	['ON_CHANGE_SCAN_CUSTOMER'](state, action) {
		return { ...state, isScanCustomer: action.payload };
	},
	['GET_ORDER_LIST_SUCCESS'](state, action) {
		return { ...state, orderList: action.payload };
	},
	['GET_ORDER_LIST_HISTORY_SUCCESS'](state, action) {
		return { ...state, orderListHistory: action.payload };
	},
	['DETAIL_ORDER'](state, action) {
		return { ...state, detailOrder: action.payload };
	},
	['DETAIL_ORDER_HISTORY'](state, action) {
		return { ...state, detailOrderHistory: action.payload };
	},
	['SCAN_PROMOTION_SUCCESS'](state, action) {
		return { ...state, dataScanPromotion: action.payload };
	},
	['SUBMIT_ORDER_SUCCESS'](state, action) {
		return { ...state, isSubmitOrder: action.payload };
	},
	['SEARCH_ORDER_LIST'](state, action) {
		const searchValue = action.payload;
		const orderListFilter = state.orderList.filter((order) => parseInt(order.order_id) === parseInt(searchValue));
		if (orderListFilter.length > 0) {
			return {
				...state,
				orderListFilter
			};
		} else {
			return {
				...state,
				orderListFilter: []
			};
		}
	},
	['SEARCH_ORDER_LIST_HISTORY'](state, action) {
		const searchValue = action.payload;
		const orderListHistoryFilter = state.orderList.filter(
			(order) => parseInt(order.order_id) === parseInt(searchValue)
		);
		if (orderListHistoryFilter.length > 0) {
			return {
				...state,
				orderListHistoryFilter
			};
		} else {
			return {
				...state,
				orderListHistoryFilter: []
			};
		}
	},
	['HANDLE_BACK'](state) {
		return {
			...state,
			Info: '',
			checkSearchPhone: '',
			barcode: '',
			phoneSearch: '',
			isCollectPoint: false,
			isScanCustomer: false,
			orderList: [],
			orderListHistory: [],
			detailOrder: '',
			dataScanPromotion: false
		};
	}
});

export default customer;
