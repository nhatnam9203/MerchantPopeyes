import React, { Component } from 'react';
import Barcode from './Barcode';
import SearchPhone from './SearchPhone';

export default class Layout extends Component {
	render() {
		const { isBarcode, isSearchPhone } = this.props.DetailMethod;
		return (
			<React.Fragment>
				{isBarcode && <Barcode />}
				{isSearchPhone && <SearchPhone {...this.props} />}
			</React.Fragment>
		);
	}
}
