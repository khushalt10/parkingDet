import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './DrawerContent';

import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="hom"
      overlayColor="rgba(10, 17, 74, 0.5)"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="hom" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
