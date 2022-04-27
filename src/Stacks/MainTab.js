import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../Screens/Home';
// import Search from '../Screens/Search';
// import Appointments from '../Screens/Appointments';
// import Favorites from '../Screens/Favorites';
// import Profile from '../Screens/Profile';

const Tab = createBottomTabNavigator();

export default () => {
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={Home} />
    {/* <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Appointments" component={Appointments} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="Profile" component={Profile} /> */}

  </Tab.Navigator>;
};
