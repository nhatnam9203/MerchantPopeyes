import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils";
import Configs from "../../configs";
import { isIphoneX } from 'react-native-iphone-x-helper';
const { COLOR_MAIN_APP: { RED, BLACK, BLUE } } = Configs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground:{
    width: '100%', height: '100%',position:'absolute'
  }
})
export default styles