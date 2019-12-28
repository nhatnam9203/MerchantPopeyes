import React, { Component } from 'react';
import { ContextMain } from 'screen/Main';
import Barcode from './Barcode'
import SearchPhone from './SearchPhone'

export default class Layout extends Component {

	render() {
		return (
			<ContextMain.Consumer>
				{(context) => (
					<React.Fragment>
						{context.state.DetailMethod.isBarcode && <Barcode />}
						{context.state.DetailMethod.isSearchPhone && <SearchPhone />}
					</React.Fragment>
				)}
			</ContextMain.Consumer>
		);
	}
}

