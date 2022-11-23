'use strict';

import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme'
import { padding, margin } from '../utils/utils'

import TextField from '../widgets/TextField'
import EmailField from '../widgets/EmailField'
import PasswordField from '../widgets/PasswordField'
import RegularButton from '../widgets/regularButton'

import { signup } from '../firebase/data'
class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.textField = React.createRef();
    this.emailField = React.createRef();
    this.passField = React.createRef();
    this.btnSubmit = React.createRef();
    this.state = {
      user:{},
      validUser:false
    }
  }
  handleText = (value)=>{
    this.state.user['displayName'] = value;
    this.enableRegButton();
  }
  handleEmail = (value)=>{
    this.state.user['email'] = value;
    this.enableRegButton();
  }
  handlePassword = (value)=>{
    this.state.user['password'] = value;
    this.enableRegButton();
  }
  handleSubmit = ()=>{
    var email = this.state.user['email'].replace(/\s/g, "");
    var password = this.state.user['password'].replace(/\s/g, "");
    var displayName = this.state.user['displayName'].replace(/\s/g, "");
    signup(email, password, displayName);
  }
  enableRegButton = ()=>{
    const _textField = this.textField.current.state.isValid;
    const _emailField = this.emailField.current.state.isValid;
    const _passField = this.passField.current.state.isValid;
    const _btnSubmit = this.btnSubmit.current;

    _btnSubmit.setEnable(_emailField && _passField && _textField);
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ alignItems:"center", justifyContent:"center" }} >
        <View style={{ flex:0, height: 50, ...margin(150, 70, 30, 60) }} >
          <Text style={{ ...theme.FONTS.h1, ...theme.AUTO_WEIGHTS.bold, color:theme.COLORS.primary }} >Registration</Text>
        </View>
        <View >
          <TextField
            ref={this.textField}
            onTextChange={ this.handleText } 
            placeholder = { "Username" }
          />
          <EmailField 
            ref={this.emailField}
            onTextChange={ this.handleEmail } 
          />
          <PasswordField
            ref={this.passField}
            onTextChange={ this.handlePassword }
          />
        </View>
        <View style={{ flex:0, alignItems:"center", justifyContent:"flex-end", ...margin(30, 60, 0, 60) }} >
          <RegularButton 
            ref={this.btnSubmit} 
            onPress={ ()=> this.handleSubmit() } 
            text={ 'REGISTER' }/>
        </View>
        <View style={{ flex:0, alignItems:"center", justifyContent:"flex-end", ...margin(30, 60, 0, 60) }} >
          <Text style={{ color:theme.COLORS.primary, ...theme.FONTS.subtitle, ...theme.AUTO_WEIGHTS.bold }} >Or</Text>
        </View>
        <View style={{ flex:0, alignItems:"center", justifyContent:"flex-end", ...margin(30, 60, 0, 60) }} >  
          <TouchableOpacity
            style={{ borderRadius:30, backgroundColor:theme.COLORS.primary, ...padding(12, 30) }}
            onPress={ () => navigation.navigate('Auth') } >
            <Text style={{ color:theme.COLORS.white, ...theme.FONTS.caption, ...theme.AUTO_WEIGHTS.bold }} >LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Registration;