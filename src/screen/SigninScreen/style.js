import { StyleSheet } from 'react-native';
import Configs from '../../configs';

const { COLOR_MAIN_APP: { RED, BLACK, BLUE, WHITE } } = Configs;
import { scaleWidth, scaleHeight, scale, verticalScale, moderateScale } from 'utils';

export const styles = StyleSheet.create({
	logo: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	txtDangNhap: {
		fontSize: scale(12),
		color: WHITE,
		fontWeight: 'bold',
		marginTop: scaleWidth(2),
		fontFamily: 'Roboto'
	},
	txtPass: {
		fontSize: scale(8),
		color: WHITE,
		textAlign: 'center',
		marginTop: verticalScale(5),
		fontWeight: '300',
		fontFamily: 'Roboto'
	}
});

export const styleLogin = StyleSheet.create({
	input: {
		flex: 8,
		backgroundColor: '#ffffff',
		fontSize: scaleWidth(1.7),
		color: '#333',
		fontWeight: '300',
		paddingHorizontal: scaleWidth(1),
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	},
	wrapperInput: {
		display: 'flex',
		flexDirection: 'row',
		width: scaleWidth('40'),
		height: scaleWidth(5),
		marginBottom: verticalScale(7)
	},
	imgContainerInput: {
		flex: 1.7,
		backgroundColor: '#F06C3C',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	imgInput: {
		width: '60%',
		height: '60%',
		resizeMode: 'contain'
	},
	buttonLogin: {
		justifyContent: 'center',
		alignItems: 'center',
		width: scaleWidth('40%'),
		height: scaleWidth(5),
		backgroundColor: '#F06C3C',
		borderRadius: 5,
		marginTop: scaleHeight('3%')
	}
});
