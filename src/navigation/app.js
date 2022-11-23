import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Auth from '../views/Auth';
import Registration from '../views/Registration';
// import Home from '../views/Home';

const Views = createSwitchNavigator({
  Auth,
  Registration
});

export default createAppContainer(Views);