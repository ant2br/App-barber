
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import CustomTabBar from '../Components/CustomTabBar';
import Home from '../Screens/Home';
import Search from '../Screens/Search';
import Appointments from '../Screens/Appointments';
import Favorites from '../Screens/Favorites';
import Profile from '../Screens/Profile';
// import CusttomTabBar from '../componets/CusttomTabBar';

export default () => (
<Tab.Navigator  screenOptions={{ 
      headerShown: false,
    }}
    tabBar={props => <CustomTabBar {...props} />}
    >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Appointments" component={Appointments} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);
