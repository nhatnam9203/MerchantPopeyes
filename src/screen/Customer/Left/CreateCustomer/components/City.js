import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet,Keyboard } from 'react-native';
import HeaderAddresss from './HeadeeAddress';
import { scaleWidth } from 'utils';
import province from '../data/province';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableRipple } from 'react-native-paper';
import ConnectRedux from 'reduxApp/ConnectRedux';

const AtoZ = [ 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90 ];

class City extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		};
	}

	// setCoordinateView(e, kytu) {
	// 	const x = e.nativeEvent.layout.x;
	// 	const y = e.nativeEvent.layout.y;

	// 	let { items } = this.state;
	// 	items.push({
	// 		name: kytu,
	// 		x,
	// 		y
	// 	});
	// 	this.setState({ items });
	// }

	getDistrict(city) {
		this.props.actions.customer.getDistrict(city.ID);
		this.props.actions.customer.chooseCity(city);
	}

	// renderAtoZ() {
	// 	return AtoZ.map((c, i) => {
	// 		const proviceMap = province.filter((p) => p.Title.charAt(0) === String.fromCharCode(c).toUpperCase());
	// 		return (
	// 			<React.Fragment key={i}>
	// 				<View
	// 					onLayout={(e) => this.setCoordinateView(e, String.fromCharCode(c).toUpperCase())}
	// 					onPress={() => this.props.navigation.navigate('District')}
	// 					style={styles.viewLetter}
	// 				>
	// 					<Text style={{ fontSize: scaleWidth(2.3) }}>{String.fromCharCode(c).toUpperCase()}</Text>
	// 				</View>
	// 				{proviceMap.map((p, index) => {
	// 					return (
	// 						<TouchableRipple
	// 							rippleColor="#dddddd"
	// 							key={index}
	// 							onPress={() => this.getDistrict(p)}
	// 							style={styles.viewProvince}
	// 						>
	// 							<View style={styles.row}>
	// 								<Text style={{ fontSize: scaleWidth(2.3) }}>{p.Title}</Text>
	// 								{/* <Icon name="right" color="grey" size={scaleWidth(2)} /> */}
	// 							</View>
	// 						</TouchableRipple>
	// 					);
	// 				})}
	// 			</React.Fragment>
	// 		);
	// 	});
	// }

	// scrollToCharacter(kytu) {
	// 	const nodeFind = this.state.items.find((item) => item.name === kytu);
	// 	if (!nodeFind) return;
	// 	this.scrollList.scrollTo({ y: nodeFind.y });
	// }

	// renderSelectTouch() {
	// 	return AtoZ.map((kytu, i) => {
	// 		return (
	// 			<TouchableOpacity
	// 				key={i}
	// 				onPress={() => this.scrollToCharacter(String.fromCharCode(kytu).toUpperCase())}
	// 				style={{ padding: scaleWidth(2), backgroundColor: 'rgba(0,0,0,0.3)' }}
	// 			>
	// 				<Text
	// 					style={{
	// 						color: '#ffffff',
	// 						fontSize: scaleWidth(1.5),
	// 						fontWeight : 'bold'
	// 					}}
	// 				>
	// 					{String.fromCharCode(kytu).toUpperCase()}
	// 				</Text>
	// 			</TouchableOpacity>
	// 		);
	// 	});
	// }

	renderCity() {
		return province.map((city, key) => {
			return (
				<TouchableRipple
					rippleColor="#dddddd"
					key={key}
					onPress={() => this.getDistrict(city)}
					style={styles.viewProvince}
				>
					<View style={styles.row}>
						<Text style={{ fontSize: scaleWidth(2.3) }}>{city.Title}</Text>
						<Icon name="right" color="grey" size={scaleWidth(2)} />
					</View>
				</TouchableRipple>
			);
		});
	}

	render() {
		return (
			<HeaderAddresss onBack={() => this.props.navigation.navigate('MainScreen')} headerText="Tỉnh / Thành phố">
				<ScrollView ref={(ref) => (this.scrollList = ref)} style={{ flex: 1 }}>
					{/* {this.renderAtoZ()} */}
					{this.renderCity()}
				</ScrollView>
				{/* <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollTouch}>
					{this.renderSelectTouch()}
				</ScrollView> */}
			</HeaderAddresss>
		);
	}
}

export default ConnectRedux(null, City);

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
