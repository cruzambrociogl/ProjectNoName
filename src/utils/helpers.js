import { theme } from '../constants/theme';
import { Dimensions, Platform, StatusBar } from 'react-native';

const _get_widthPercentage = (val) =>{
  let screenWidth = theme.SIZES.width;
  return (val * screenWidth) / 100;
}

const _get_heightPercentage = (val) =>{
  let screenHeight = theme.SIZES.height;
  return (val * screenHeight) / 100;
}

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;

export const StatusBarHeight = Platform.select({
    ios: isIPhoneX() ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0
});


export const get_widthPercentage = (value) => _get_widthPercentage(value);
export const get_heightPercentage = (value) => _get_heightPercentage(value);