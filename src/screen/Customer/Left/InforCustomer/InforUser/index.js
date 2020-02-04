import React, { Component } from 'react';
import { View, StyleSheet, Image, Keyboard, } from 'react-native';
import Configs from 'configs';
const { FONT_SIZE: { FONT_SIZE_TITLE } } = Configs;
const { COLOR_MAIN_APP: { PLACEHOLDER } } = Configs;
import image from 'assets';
import { scaleWidth, scale, GlobalStyle } from 'utils';
import { Text } from 'components';

export default class Title extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hide: false
		};
	}

	componentDidMount() {
		this.showKey = Keyboard.addListener('keyboardDidShow', this.showKeyBoard);
		this.hideKey = Keyboard.addListener('keyboardDidHide', this.hideKeyBoard);
	}

	componentWillUnmount() {
		this.showKey.remove();
		this.hideKey.remove();
	}

	showKeyBoard = (e) => {
		this.setState({ hide: true });
	};

	hideKeyBoard = (e) => {
		this.setState({ height: false });
	};

	renderTop() {
		const { inforCustomer } = this.props;
		if (inforCustomer) {
			return (
				<View style={styles.container}>
					{/* <View style={styles.containerAvatar} /> */}
					<Image source={image.Avatar} style={styles.containerAvatar} />
					<View style={styles.headerRight}>
						<Text style={styles.name}>{`${inforCustomer.firstName} ${inforCustomer.lastName}`}</Text>
						<View style={styles.infor}>
							<Image source={image.Level} resizeMode="contain" style={styles.image} />
							<Text style={styles.title}>{inforCustomer.points}</Text>
							<Text style={styles.nameLevel}>{inforCustomer.loyalty.rank}</Text>
						</View>
					</View>
				</View>
			);
		}
	}

	render() {
		return (
			<React.Fragment>
				<View style={styles.header}>
					<Image
						style={{ width: scaleWidth(2.8), height: scaleWidth(2.8) }}
						source={image.InforCustomer}
						resizeMode="contain"
					/>
					<Text
						style={[ styles.name, { marginLeft: scale(8), fontSize: scaleWidth(2.3) } ]}
						i18nKey="textTitleInfoCustomer"
					/>
				</View>

				{this.renderTop()}
			</React.Fragment>
		);
	}
}
const styles = StyleSheet.create({
	containerAvatar: {
		width: scaleWidth('7%'),
		height: scaleWidth('7%'),
		borderRadius: scaleWidth('3.5%'),
		backgroundColor: '#c3c3c3',
		right: '1%'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		height: scaleWidth(5),
		alignItems: 'center',
		paddingLeft: scaleWidth(1),
		marginBottom: scaleWidth(1.5)
	},
	headerRight: {
		flexDirection: 'column',
		marginLeft: scaleWidth(1.5),
		justifyContent: 'space-between',
		height: scaleWidth('7%')
	},
	image: {
		height: scaleWidth(2.5),
		width: scaleWidth(2.5)
	},
	nameLevel: {
		color: PLACEHOLDER,
		fontWeight: 'normal',
		fontSize: scaleWidth(1.9),
		fontFamily: GlobalStyle.Normal
	},
	infor: { flexDirection: 'row', alignItems: 'center' },
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingLeft: scaleWidth(1)
	},
	title: {
		fontSize: FONT_SIZE_TITLE,
		fontWeight: 'bold',
		marginLeft: 8,
		marginRight: 15,
		fontSize: scaleWidth(1.9),
		fontFamily: GlobalStyle.Weight
	},
	name: {
		fontSize: scaleWidth(2.2),
		fontWeight: 'bold',
		color: '#404040',
		fontFamily: GlobalStyle.Weight,
		letterSpacing: 0.1
	}
});
