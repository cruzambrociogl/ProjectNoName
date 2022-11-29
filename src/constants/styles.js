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
const images = StyleSheet.create({
  gameImage:{
    alignSelf:'center',
    top: 23,
    width:60,
    height:60,
    resizeMode: 'stretch',
    justifyContent:'center'
  }
});
const buttons = StyleSheet.create({
  enabled:{
    borderRadius:30, 
    backgroundColor:theme.COLORS.primary,
  },
  disabled:{
    borderRadius:30, 
    backgroundColor:theme.COLORS.secondary,
  },
  gameButtonsActive:{
    flex:0.95,
    alignSelf:"center",
    borderRadius:20,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,    
    backgroundColor:'#FFFFFF',
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  buttons,
  images
}
export default { CustomStyles };