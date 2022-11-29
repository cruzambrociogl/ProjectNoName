'use strict';

import React, { Component } from 'react';

import { Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import { theme } from '../constants/theme'
import { padding, margin, renderIf } from '../utils/utils'
import { get_widthPercentage, get_heightPercentage, StatusBarHeight } from '../utils/helpers'
import { CustomStyles } from '../constants/styles'

import CustomHeader from './customHeader'

import { getRooms } from '../firebase/data'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      isMenuOn:false,
    }
  }
  headerOptions = {
    back: false,
    icon: true,
    config: false,
    logout: true
  }
  onRoomsReceived = (roomsList) =>{
    console.log("ROOMS LIST ----------")
    console.log(roomsList)
    this.setState( prevState => ({
      roomsList: roomsList
    }))
  }
  gettingRooms=()=>{
    getRooms(this.onRoomsReceived);
  }
  componentDidMount(){
    this.gettingRooms();
  }
  selectedOption = (data) =>{
    const { navigation } = this.props;
    console.log('NAVIGATING')
    navigation.navigate('Games', data)
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ marginTop:StatusBarHeight, width:theme.SIZES.width, height:get_heightPercentage(100)-StatusBarHeight}} >
        <CustomHeader  { ...this.headerOptions } navigation={this.props.navigation}/>
        <View style={{ flex:0, alignSelf:"center" }} >
          <View style={{ flex:0, ...margin(0, 0) }} >
            <TextInput
              style={{ width:get_widthPercentage(90), height:50, ...CustomStyles.inputs.placeHolder}}
              placeholder='Search'
              secureTextEntry={false}
              keyboardType='default'
              returnKeyLabel='Search'
            />
          </View>
        </View>
        <SafeAreaView style={{ justifyContent:'center', width:theme.SIZES.width, marginTop:26, height:get_heightPercentage(100)-(StatusBarHeight + 125)}} >
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={this.state.roomsList}
            keyExtractor={ (item, index) => 'key'+index }
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={{ flex:0, alignSelf:"center", flexDirection:'row', ...CustomStyles.styles.itemBox, height:110, width:get_widthPercentage(90), ...margin(5) }}
                key={ `img-${item.key}` } 
                onPress={ () => this.selectedOption(item) } >
                  {<Image source = {require('../assets/Icons/street.png')} resizeMode='center' style={{ alignSelf:'center', ...margin(20), resizeMode: 'stretch', width:40, height:40 }} /> }
                  <View style={{ width:get_widthPercentage(61) }} >
                    <Text 
                      ellipsizeMode = 'tail'
                      numberOfLines = {1}
                      style={{ color:theme.COLORS.primary, ...theme.FONTS.h3, ...theme.AUTO_WEIGHTS.bold, ...padding(10, 0, 5, 0) }} >{ item.name }</Text>
                      <Text 
                        ellipsizeMode = 'tail'
                        numberOfLines = {1}
                        style={{ color:theme.COLORS.primary, ...theme.FONTS.subtitle, ...theme.AUTO_WEIGHTS.semibold, ...padding(0, 0, 5, 0) }} >Muchos juegos</Text>
                    <View style={{ alignItems:"center",  alignSelf: 'flex-start', height:20, backgroundColor:'#335C81', borderRadius:20, marginTop:10 }} >
                      <Text style={{ color:theme.COLORS.white, ...theme.FONTS.base, ...theme.AUTO_WEIGHTS.medium, ...padding(0, 10, 0, 10) }} >Publico</Text>
                    </View>    
                  </View>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </View>
    );
  }
}

export default Home;