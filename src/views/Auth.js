
import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme'
import { padding, margin } from '../utils/utils.js'

import EmailField from '../widgets/EmailField'
import PasswordField from '../widgets/PasswordField'
import RegularButton from '../widgets/regularButton'

import { login, subscribeToAuthChanges } from '../firebase/data'


class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.emailField = React.createRef();
    this.passField = React.createRef();
    this.btnSubmit = React.createRef();
    this.state = {
      user: {},
      showError: false,
      errorMessage:''
    }
  }
  handleEmail = (value)=>{
    this.state.user['email'] = value;
    this.enableLogin();
  }
  handlePassword = (value)=>{
    this.state.user['password'] = value;
    this.enableLogin();
  }
  handleSubmit = ()=>{
    console.log("LOGINNNN")
    var email = this.state.user['email'];
    var password = this.state.user['password'];

    login({email, password}, this.failLogin);
  }
  enableLogin = ()=>{
    const _emailField = this.emailField.current.state.isValid;
    const _passField = this.passField.current.state.isValid;
    const _btnSubmit = this.btnSubmit.current;

    _btnSubmit.setEnable(_emailField && _passField);
  }
  componentDidMount = () =>{
    subscribeToAuthChanges(this.onAuthStateChanged)
  }
  componentWillUnmount = () =>{}
  onAuthStateChanged = (user) =>{
    const { navigation } = this.props;
    if(user != null){
      console.log('Inside')
      navigation.navigate('Home')
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }} >
        <View style={{ flex: 0,  ...margin(150, 70, 0, 60) }} >
          <Text style={{ ...theme.FONTS.h1, ...theme.AUTO_WEIGHTS.bold, color:theme.COLORS.primary }} >Login</Text>
        </View>
        <View style={{ ...margin(30, 0, 0, 0) }} >
          <EmailField 
            ref={this.emailField}
            onTextChange={ this.handleEmail } 
          />
          <PasswordField
            ref={this.passField}
            onTextChange={ this.handlePassword }
          />
        </View>

        <View style={{ flex: 0, alignItems: "center", justifyContent: "flex-end", ...margin(30, 60, 0, 60) }} >
          <RegularButton 
            ref={this.btnSubmit} 
            onPress={ ()=> this.handleSubmit() } 
            text={ 'LOGIN' }
          />
        </View>
        <View style={{ flex: 0, alignItems: "center", justifyContent: "flex-end", ...margin(30, 60, 0, 60) }} >
          <Text style={{ color: theme.COLORS.primary, ...theme.FONTS.subtitle, ...theme.AUTO_WEIGHTS.bold }} >Or</Text>
        </View>
        <View style={{ flex: 0, alignItems: "center", justifyContent: "flex-end", ...margin(30, 60, 0, 60) }} >
          <TouchableOpacity
            style={{ borderRadius: 30, backgroundColor: theme.COLORS.primary, ...padding(12, 30) }}
            onPress={ ()=> navigation.navigate('Registration') } >
            <Text style={{ color: theme.COLORS.white, ...theme.FONTS.caption, ...theme.AUTO_WEIGHTS.bold }} >REGISTRATION</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


export default Auth;

