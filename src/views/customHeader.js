'use strict';

import React, { Component } from 'react';

import { Text, StyleSheet, View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { theme } from '../constants/theme'
import { padding, renderIf } from '../utils/utils'

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

  }

  render() {
    var params = this.props;
    return (
      <SafeAreaView style={{ width:theme.SIZES.width, backgroundColor:theme.COLORS.white }} >
        <View style={{ alignSelf:'center', width:50, height:75, width:theme.SIZES.width }} >
          <View style={{ flex:0, left:10, top:15, width:120, height:75, alignSelf:"flex-start" }} >
            { renderIf( params.back )(
              <View style={{ flex:0, alignSelf:"flex-start" }} >
                <TouchableOpacity
                  style={{ borderRadius:30, backgroundColor:theme.COLORS.white, ...padding(5, 5, 5, 0), alignSelf:'flex-start' }}
                  onPress={ () => this.props.navigation.navigate('Home') } >
                  { <Image source = '../assets/icons/arrow.png' resizeMode='center' style={{ alignSelf:'flex-end', width:25, height:25 }} /> }
                </TouchableOpacity>
              </View>
            )}
          </View>
          { <View style={{ flex:0, top:-60, height:75,width:120, alignSelf:"center" }} >
              <View style={{ flex:0, alignSelf:"center", top:-10}} >   
                <Text style={{ ...theme.FONTS.h2, ...theme.AUTO_WEIGHTS.bold, color:theme.COLORS.primary }} >NO NAME</Text>
              </View>
          </View> }

        </View>
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({

});

export default ContextMenu;