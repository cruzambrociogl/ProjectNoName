'use strict';

import React, { Component } from 'react';

import { Text, View, TextInput } from 'react-native';
import { theme } from '../constants/theme'
import { margin, renderIf } from '../utils/utils.js'
import { CustomStyles } from '../constants/styles'

class TextField extends  Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
      showErrorTxt: false,
      fieldTheme: CustomStyles.inputs.normal,
      isValid:false
    }
  }
  handleChange = (value) =>{
    const isValid = value != null
    if (this.state.value.length > 3){
      const chosenTheme = isValid?CustomStyles.inputs.normal:CustomStyles.inputs.error;
      this.setState({ 
        isValid: isValid,
        value: value,
        showErrorTxt: !isValid,
        fieldTheme: chosenTheme
      }, () => {
        this.props.onTextChange(value)
    });
    } else{
      this.setState({ 
        isValid: isValid,
        value: value,
        showErrorTxt: false,
        fieldTheme: CustomStyles.inputs.normal
      }, () => {
        this.props.onTextChange(value)
    });
    }
  }
  render(){
    const { placeholder } = this.props;
    return( 
      <View style={{ ...margin(10, 10) }} >
          <TextInput
            style={{ width:theme.SIZES.width / 1.5, height:60, ...CustomStyles.inputs.placeHolder }}
            placeholder = { placeholder }
            value={ this.state.value }
            onChangeText={ text => this.handleChange(text) }
            autoCapitalize='none'
            secureTextEntry={ false }
            keyboardType='default'
            returnKeyLabel='next'
          />
          { renderIf(this.state.showErrorTxt)(
            <Text style={{ marginTop: 10, color: theme.COLORS.error, ...theme.FONTS.small, ...theme.AUTO_WEIGHTS.light, width: theme.SIZES.width / 1.5 }} >
            Enter a valid text. 
            </Text>
            )
          }
      </View>
      
    )
  }
}

export default TextField;