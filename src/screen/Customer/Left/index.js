import React, { Component } from 'react';
import { store } from 'reduxApp/store';
import InforCustomer from '../Left/InforCustomer';
import CreateCustomer from '../Left/CreateCustomer';

export default class Index extends Component {
	render() {
		const { checkSearchPhone } = store.getState().customer;
		if (checkSearchPhone === 'yes' || checkSearchPhone === '') {
			return <InforCustomer {...this.props} />;
		} 
		return (
			<CreateCustomer />
		)
	}
}
