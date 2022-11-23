'use strict';

import React, { Component } from 'react';

import { Text, View, TextInput } from 'react-native';
import { theme } from '../constants/theme'
import { margin, renderIf } from '../utils/utils.js'
import { CustomStyles } from '../constants/styles'

class EmailField extends  Component {
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
  isValidEmail = (value) =>{
    if (typeof(value) !== "string") return false;
    if ((value.length - value.lastIndexOf('.')) < 3) return false;
    const emailPattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    return emailPattern.test(value);
  }

  handleChange = (value) =>{
    const isValid = this.isValidEmail(value)
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
    return( 
      <View style={{ ...margin(10, 10) }} >
        <TextInput
          style={{ width: theme.SIZES.width / 1.5, height: 60, ...this.state.fieldTheme }}
          placeholder='Email'
          value={ this.state.value }
          onChangeText={ text => this.handleChange(text) }
          keyboardType='email-address'
          returnKeyType='next'
          returnKeyLabel='next'
          autoCapitalize='none'
         />
          { renderIf(this.state.showErrorTxt)(
            <Text style={{ marginTop: 10, color: theme.COLORS.error, ...theme.FONTS.small, ...theme.AUTO_WEIGHTS.light, width: theme.SIZES.width / 1.5 }} >
            Enter a valid Email. 
            </Text>
            )
          }
      </View>
      
    )
  }
}

export default EmailField;