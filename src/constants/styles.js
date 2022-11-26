import { StyleSheet } from 'react-native';
import { theme } from '../constants/theme'


const styles = StyleSheet.create({
  itemBox:{
    backgroundColor:'#FFFFFF',
    borderRadius:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
const buttons = StyleSheet.create({
  enabled:{
    borderRadius:30, 
    backgroundColor:theme.COLORS.primary,
  },
  disabled:{
    borderRadius:30, 
    backgroundColor:theme.COLORS.secondary,
  }
});
const inputs = StyleSheet.create({
  placeHolder: {
    fontSize:theme.SIZES.title,
    fontWeight:theme.WEIGHTS.black,
    color:theme.COLORS.primary,
    paddingLeft:20,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:'#FFFFFF',
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  error: {
    fontSize:theme.SIZES.title,
    fontWeight:theme.WEIGHTS.black,
    color:theme.COLORS.error,
    paddingLeft:20,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:'#FFFFFF',
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  normal: {
    fontSize:theme.SIZES.title,
    fontWeight:theme.WEIGHTS.black,
    color:theme.COLORS.primary,
    paddingLeft:20,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:'#FFFFFF',
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
export var CustomStyles = {
  styles,
  inputs,
  buttons
}
export default { CustomStyles };