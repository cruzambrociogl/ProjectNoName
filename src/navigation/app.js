import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Auth from '../views/Auth';
import Registration from '../views/Registration';
import Home from '../views/Home';
import Games from '../views/Games';

const Views = createSwitchNavigator({
  Auth,
  Registration,
  Home,
  Games
});

export default createAppContainer(Views);