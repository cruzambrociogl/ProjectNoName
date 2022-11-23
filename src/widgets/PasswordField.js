'use strict';

import React, { Component } from 'react';

import { Text, View, TextInput } from 'react-native';
import { theme } from '../constants/theme'
import { margin, renderIf } from '../utils/utils.js'
import { CustomStyles } from '../constants/styles'

class PasswordField extends Component {
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
  isValidPass = (value) =>{
    if (typeof(value) !== "string") return false;
    if (value.length < 8) return false;
    const passPattern = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040-\u002E])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/g
    return passPattern.test(value);
  }
  handleChange = (value) =>{
    const isValid = this.isValidPass(value)
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
    }else{
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
    return (
        <View style={{ flex:0, ...margin(10, 10) }} >
          <TextInput
            style={{ width:theme.SIZES.width / 1.5, height:60, ...this.state.fieldTheme }}
            onChangeText={ text => this.handleChange(text) }
            placeholder='Password'
            value={ this.state.value }
            secureTextEntry={ true }
            textContentType='password'
            returnKeyType='done'
            returnKeyLabel='done'
            autoCapitalize='none'
          />
          { renderIf(this.state.showErrorTxt)(
            <Text style={{ marginTop:10, color:theme.COLORS.error, ...theme.FONTS.small, ...theme.AUTO_WEIGHTS.light, width:theme.SIZES.width / 1.5,}} >
            Password must have 8 characters, 1 special Char, 1 number and Uppercase.
            </Text>
            )
          }
        </View>
    );
  }
}

export default PasswordField;