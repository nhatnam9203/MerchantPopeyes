import { put, takeLatest, all } from 'redux-saga/effects';
import NavigationServices from '../../navigators/NavigatorServices';
import { api } from '../../utils';
import * as url from '../../utils/api-constant';

function* login(action) {
	yield put({
		type: 'LOADING_ROOT'
	});
	try {
		const { username, password } = action.payload;
		const body = { username, password };
		const response = yield api(url.Login, body, 'POST', '');
		if (response) {
			switch (parseInt(response.codeNumber)) {
				case 200:
					yield put({ type: 'LOGIN_SUCCESS', payload: response.data });
					NavigationServices.navigate('MainScreen');
					break;
				default:
					yield put({ type: 'SET_TEXT_ERROR', payload: response.message });
					break;
			}
		}
	} catch (error) {
		yield put({ type: 'SET_TEXT_ERROR', payload: error });
	} finally {
		yield put({
			type: 'STOP_LOADING_ROOT'
		});
	}
}
export default function* auth() {
	yield all([ takeLatest('LOGIN', login) ]);
}
