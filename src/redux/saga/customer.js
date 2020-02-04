import { put, takeLatest, all, } from 'redux-saga/effects';
import NavigationServices from '../../navigators/NavigatorServices';
import { api } from '../../utils';
import * as url from '../../utils/api-constant';
import { store } from '../store/index';
function* getCustomerByCode(action) {
	yield put({
		type: 'LOADING_ROOT'
	});
	try {
		const { code, resolve, reject } = action.payload;
		const response = yield api(url.GetCustomerByCode + code, '', 'GET', '');
		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					yield put({
						type: 'GET_CUSTOMER_SUCCESS',
						payload: response.data ? response.data : []
					});
					yield put({
						type: 'GET_ORDER_LIST',
						payload: { customer_id: response.data.customer_id }
					});
					yield put({
						type: 'CHECK_SEARCH_PHONE',
						payload: 'yes'
					});
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					resolve(response);
					break;

				default:
					yield put({ type: 'SET_TEXT_ERROR', payload: response.message });
					yield put({
						type: 'ON_CHANGE_BARCODE',
						payload: ''
					});
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					break;
			}
		}
	} catch (error) {
		alert(error);
	}
}

function* getCustomerByPhone(action) {
	yield put({
		type: 'LOADING_ROOT'
	});
	try {
		const { phone } = action.payload;
		console.log({phone})
		const response = yield api(url.GetCustomerByPhone + phone, '', 'GET', '');
		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					yield put({
						type: 'GET_CUSTOMER_SUCCESS',
						payload: response.data
					});
					yield put({
						type: 'GET_ORDER_LIST',
						payload: { customer_id: response.data.customer_id }
					});
					yield put({
						type: 'CHECK_SEARCH_PHONE',
						payload: 'yes'
					});
					
					if (action.payload.isCollect) {
						/* -----Hiển thị modal sau khi tích điểm nhập tay ----- */
						yield put({ type: 'COLLECT_POINT_SUCCESS', payload: true });
					}
					if (action.payload.isSubmitOrder) {
						/* -----Hiển thị modal sau khi tích điểm từ danh sách đơn hàng ----- */
						yield put({ type: 'SUBMIT_ORDER_SUCCESS', payload: true });
					}
					break;

				case 400:
					yield put({ type: 'SET_TEXT_ERROR', payload: response.message });
					yield put({
						type: 'ON_CHANGE_PHONE',
						payload: phone
					});
					yield put({
						type: 'CHECK_SEARCH_PHONE',
						payload: 'no'
					});
					break;
				default:
					yield put({ type: 'SET_TEXT_ERROR', payload: response.message });
					break;
			}
		}
	} catch (error) {
		alert(error);
	} finally {
		yield put({
			type: 'STOP_LOADING_ROOT'
		});
	}
}

function remove_character(str) {
	let chuoi = '';
	for (let i = 0; i < str.length; i++) {
		if (str[i] !== ',') {
			chuoi += str[i];
		}
	}
	return chuoi;
}

function* collectPoint(action) {
	yield put({
		type: 'LOADING_ROOT'
	});

	try {
		const { post_order_id, customer_id, amount } = action.payload;
		const store_id = store.getState().auth.merchant.store_id;
		const body = { pos_order_id : post_order_id, customer_id, amount: remove_character(amount),store_id };
		const response = yield api(url.PostCollectPoint, body, 'POST', '');
		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					const phone = store.getState().customer.Info.phone;
					yield put({ type: 'GET_CUSTOMER_BY_PHONE', payload: { phone, isCollect: true } });
					break;
				default:
					yield put({ type: 'SET_TEXT_ERROR', payload: response.message });
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					break;
			}
		}
	} catch (error) {
		alert(error);
	}
}

function* createCustomer(action) {
	yield put({
		type: 'LOADING_ROOT'
	});

	try {
		const { email, firstname, lastName, phone, address } = action.payload;
		const body = { email, firstname, lastName, phone };
		const response = yield api(url.PostCreateCustomer, body, 'POST', '');

		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					const bodyAddress = {
						...address,
						customer_id: response.data.customer_id
					};
					yield put({
						type: 'ADD_ADDRESS',
						payload: bodyAddress
					});
					yield put({
						type: 'GET_CUSTOMER_SUCCESS',
						payload: response.data
					});
					yield put({
						type: 'CHECK_SEARCH_PHONE',
						payload: 'yes'
					});
					break;
				default:
					yield put({ type: 'SET_TEXT_ERROR', payload: response.message });
					break;
			}
		}
	} catch (error) {
		console.log({ error });
		alert(error);
	} finally {
		yield put({
			type: 'STOP_LOADING_ROOT'
		});
	}
}

function* getDistrict(action) {
	yield put({
		type: 'LOADING_ROOT'
	});

	try {
		const response = yield api(`${url.GetDistrictByCity}/?city=${action.payload}`, '', 'GET', '');

		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					yield put({ type: 'GET_DISTRICT_SUCCESS', payload: response.data ? response.data : [] });
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					NavigationServices.navigate('District');
					break;
				default:
					yield put({ type: 'SET_TEXT_ERROR', payload: response.message });
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					break;
			}
		}
	} catch (error) {
		alert(error);
	} finally {
		yield put({
			type: 'STOP_LOADING_ROOT'
		});
	}
}

function* getWards(action) {
	yield put({
		type: 'LOADING_ROOT'
	});

	try {
		const { province_id, district_id } = action.payload;

		const response = yield api(
			`${url.GetWardsByProvince}/?district_id=${district_id}&province_id=${province_id}`,
			'',
			'GET',
			''
		);

		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					yield put({ type: 'GET_WARDS_SUCCESS', payload: response.data ? response.data : [] });
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					NavigationServices.navigate('Wards');
					break;
				default:
					yield put({ type: 'SET_TEXT_ERROR', payload: response.message });
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					break;
			}
		}
	} catch (error) {
		alert(error);
	} finally {
		yield put({
			type: 'STOP_LOADING_ROOT'
		});
	}
}

function* getStreet(action) {
	yield put({
		type: 'LOADING_ROOT'
	});

	try {
		const response = yield api(`${url.GetStreetByWards}/?ward_id=${action.payload}`, '', 'GET', '');
		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					yield put({ type: 'GET_STREET_SUCCESS', payload: response.data ? response.data : [] });
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					NavigationServices.navigate('Street');
					break;
				default:
					yield put({ type: 'SET_TEXT_ERROR', payload: response.message });
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					break;
			}
		}
	} catch (error) {
		alert(error);
	} finally {
		yield put({
			type: 'STOP_LOADING_ROOT'
		});
	}
}

function* getArea(action) {
	yield put({
		type: 'LOADING_ROOT'
	});

	try {
		const urltest = `${url.GetAreaByStreet}/?street_id=${action.payload}`;
		const response = yield api(`${url.GetAreaByStreet}/?street_id=${action.payload}`, '', 'GET', '');
		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					yield put({ type: 'GET_AREA_SUCCESS', payload: response.data ? response.data : '' });
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					NavigationServices.navigate('MainScreen');
					break;
				default:
					yield put({ type: 'SET_TEXT_ERROR', payload: response.message });
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					break;
			}
		}
	} catch (error) {
		alert(error);
	} finally {
		yield put({
			type: 'STOP_LOADING_ROOT'
		});
	}
}

function* addAddress(action) {
	yield put({
		type: 'LOADING_ROOT'
	});

	try {
		// const {
		// 	city,
		// 	country_id,
		// 	postcode,
		// 	telephone,
		// 	district,
		// 	wards,
		// 	street_customer,
		// 	street_customer_id,
		// 	house_number,
		// 	wards_id,
		// 	city_id,
		// 	district_id,
		// 	region,
		// 	street,
		// 	customer_id
		// } = action.payload;
		const body = action.payload;
		const response = yield api(`${url.PostAddAddressCustomer}`, body, 'POST', '');

		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					// yield put({ type: 'GET_STREET_SUCCESS', payload: response.data });
					NavigationServices.navigate('MainScreen');
					break;
				default:
					yield put({ type: 'SET_TEXT_ERROR', payload: response.message });
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					break;
			}
		}
	} catch (error) {
		alert(error);
	} finally {
		yield put({
			type: 'STOP_LOADING_ROOT'
		});
	}
}

function* getOrderList(action) {
	try {
		const { customer_id, resolve, reject } = action.payload;
		const response = yield api(`${url.PostOrderListCustomer}`, { customer_id }, 'POST', '');
		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					yield put({ type: 'GET_ORDER_LIST_SUCCESS', payload: response.data });
					break;
				default:
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					break;
			}
		}
	} catch (error) {
		alert(error);
	}
}

function* scanPromotion(action) {
	try {
		const { vouncher_code } = action.payload;
		const vouncher = 'RPFT9909A6Y0';
		const response = yield api(url.GetVouncherDetail + vouncher, '', 'GET', '');
		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					yield put({ type: 'SCAN_PROMOTION_SUCCESS', payload: response.data });
					break;
				default:
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					break;
			}
		}
	} catch (error) {
		alert(error);
	} finally {
		yield put({
			type: 'STOP_LOADING_ROOT'
		});
	}
}

function* useVouncher(action) {
	yield put({
		type: 'START_LOADING_ROOT'
	});
	try {
		const { vouncher_code, store_id, resolve } = action.payload;
		const body = {
			store_id,
			order_id: 1,
			coupon_code: vouncher_code
		};
		const response = yield api(url.PostUseVouncher, body, 'POST', '');
		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					resolve({ success: true });
					break;
				default:
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					yield put({
						type: 'SET_TEXT_ERROR',
						payload: response.message
					});

					break;
			}
		}
	} catch (error) {
		alert(error);
	} finally {
		yield put({
			type: 'STOP_LOADING_ROOT'
		});
	}
}

function* submitOrder(action) {
	yield put({
		type: 'START_LOADING_ROOT'
	});
	try {
		const { amount, store_id, pos_order_id, customer_id, resolve } = action.payload;
		const body = {
			store_id,
			amount,
			pos_order_id,
			customer_id
		};
		const response = yield api(url.PostSubmitOrder, body, 'POST', '');
		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					const phone = store.getState().customer.Info.phone;
					yield put({ type: 'GET_CUSTOMER_BY_PHONE', payload: { phone, isCollect: true } });
					resolve({ success: true });
					break;
				default:
					yield put({
						type: 'STOP_LOADING_ROOT'
					});
					yield put({
						type: 'SET_TEXT_ERROR',
						payload: response.message
					});
					resolve({ success: false });
					break;
			}
		}
	} catch (error) {
		alert(error);
		yield put({
			type: 'STOP_LOADING_ROOT'
		});
	}
}

export default function* auth() {
	yield all([ takeLatest('GET_CUSTOMER_BY_CODE', getCustomerByCode) ]);
	yield all([ takeLatest('COLLECT_POINT', collectPoint) ]);
	yield all([ takeLatest('GET_CUSTOMER_BY_PHONE', getCustomerByPhone) ]);
	yield all([ takeLatest('CREATE_CUSTOMER', createCustomer) ]);
	yield all([ takeLatest('GET_DISTRICT', getDistrict) ]);
	yield all([ takeLatest('GET_WARDS', getWards) ]);
	yield all([ takeLatest('GET_STREET', getStreet) ]);
	yield all([ takeLatest('GET_AREA', getArea) ]);
	yield all([ takeLatest('ADD_ADDRESS', addAddress) ]);
	yield all([ takeLatest('GET_ORDER_LIST', getOrderList) ]);
	yield all([ takeLatest('SCAN_PROMOTION', scanPromotion) ]);
	yield all([ takeLatest('USE_VOUNCHER', useVouncher) ]);
	yield all([ takeLatest('SUBMIT_ORDER', submitOrder) ]);
}
