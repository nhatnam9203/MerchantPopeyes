import React from 'react';
import Layout from './layout';

export default class Index extends Layout {
	constructor(props) {
		super(props);
		this.state = {

		};
		this.Right = React.createRef();
	}

	goToOrderListRight = () => {
		this.Right.current.scrollInforOrder.current.goToPage(0);
	};

	goToOrderHistoryRight = () => {
		this.Right.current.scrollInforOrder.current.goToPage(2);
	};

	goToCollectPoint = () => {
		this.Right.current.scrollInforOrder.current.goToPage(1);
	};
}
