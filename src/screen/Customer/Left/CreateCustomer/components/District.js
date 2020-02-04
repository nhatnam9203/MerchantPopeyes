import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import HeaderAddresss from './HeadeeAddress';
import ConnectRedux from 'reduxApp/ConnectRedux';
import { TouchableRipple } from 'react-native-paper';
import { scaleWidth } from 'utils';
import Icon from 'react-native-vector-icons/AntDesign';

class District extends Component {
	getWards(wards) {
		const {district_id,province_id} = wards;
		this.props.actions.customer.getWards({
			district_id,province_id
		});
		this.props.actions.customer.chooseDistrict(wards);

	}

	renderDistrict() {
		const { district } = this.props;
		return district.map((obj, index) => {
			return (
				<TouchableRipple
					rippleColor="#dddddd"
					key={index}
					onPress={() => this.getWards(obj)}
					style={styles.viewProvince}
				>
					<View style={styles.row}>
						<Text style={{ fontSize: scaleWidth(2.3) }}>{`${obj.type} ${obj.name}`}</Text>
						<Icon name="right" color="grey" size={scaleWidth(2)} />
					</View>
				</TouchableRipple>
			);
		});
	}

	render() {
		return (
			<HeaderAddresss onBack={() => this.props.navigation.navigate('City')} headerText="Quận / Huyện">
				<ScrollView ref={(ref) => (this.scrollList = ref)} style={{ flex: 1 }}>
					{this.renderDistrict()}
				</ScrollView>
			</HeaderAddresss>
		);
	}
}

const mapStateToProps = (state) => ({
	district: state.address.district
});

export default ConnectRedux(mapStateToProps, District);

const styles = StyleSheet.create({
	viewLetter: {
		width: '100%',
		height: scaleWidth(8),
		borderBottomColor: '#dddddd',
		borderBottomWidth: 2,
		paddingHorizontal: scaleWidth(2),
		paddingVertical: scaleWidth(2),
		backgroundColor: '#F1F1F1'
	},
	viewProvince: {
		width: '100%',
		height: scaleWidth(8),
		borderBottomColor: '#dddddd',
		borderBottomWidth: 2,
		paddingHorizontal: scaleWidth(2),
		paddingVertical: scaleWidth(2)
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	scrollTouch: {
		position: 'absolute',
		right: scaleWidth(2),
		top: '2%',
		height: '90%'
	}
});
