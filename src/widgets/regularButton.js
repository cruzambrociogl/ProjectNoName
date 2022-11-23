'use strict';

import React, { Component } from 'react';

import { Text, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme'
import { padding } from '../utils/utils.js'
import { CustomStyles } from '../constants/styles'

class RegularButton extends  Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isEnable: false,
      selectedTheme: null
    }
  }
  componentDidMount(){
    this.setState({ 
      isEnable: false,
      selectedTheme: CustomStyles.buttons.disabled 
    })
  }
  setEnable = (state)=>{
    this.setState({
      isEnable: state,
      selectedTheme: CustomStyles.buttons[state?'enabled':'disabled']
    });
  }
  handleSubmit = ()=>{
    this.props.onPress();
  }
  render(){
    return( 
      <TouchableOpacity
        onPress={ ()=> this.handleSubmit() }
        disabled={ !this.state.isEnable } 
        style={{ ...this.state.selectedTheme, ...padding(12, 30) }}>
          <Text style={{ color: theme.COLORS.white, ...theme.SIZES.title, ...theme.AUTO_WEIGHTS.bold }} > { this.props.text } </Text>
      </TouchableOpacity>
    )
  }
}

export default RegularButton;