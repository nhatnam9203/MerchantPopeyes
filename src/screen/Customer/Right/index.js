import React, { Component } from 'react';
import { View, StyleSheet,Dimensions ,Image} from 'react-native';
import ScrollTabView from 'react-native-scrollable-tab-view';
import InforInput from './components/InforInput';
import InforOrder from './components/inforOrder';
import image from 'assets';
import InforOrderHistory from './components/inforOrderHistory';
import { Text } from 'components';
import { scaleWidth, GlobalStyle,scale } from 'utils';
const { width } = Dimensions.get('window');

export default class index extends Component {

    constructor(props){
        super(props);
        this.scrollInforOrder = React.createRef();
    }

	render() {
		const {checkSearchPhone} = this.props;
 		return (
			<React.Fragment>
				<View style={styles.header}>
					<Image source={image.Order} style={styles.imgHeader} />
					<Text style={styles.txtHeader} i18nKey={'textTitleOrder'} />
				</View>

				{checkSearchPhone === 'yes' && (
					<ScrollTabView
						ref={this.scrollInforOrder}
						initialPage={0}
						locked={true}
						scrollWithoutAnimation={false}
						style={{
							width: width / 2
						}}
						renderTabBar={() => <View />}
					>
						<InforOrder {...this.props}/>
						<InforInput {...this.props}/>
						<InforOrderHistory {...this.props}/>
					</ScrollTabView>
				)}
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		flexDirection: 'row',
		padding: scale(10),
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#dddddd'
	},
	imgHeader: {
		width: 28,
		height: 28,
		resizeMode: 'contain'
	},
	txtHeader: {
		marginLeft: scaleWidth(2),
		fontSize: scaleWidth(2.3),
		color: '#404040',
		fontWeight: '500',
		fontFamily: GlobalStyle.Medium
	}
});
