import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import AuthScreen from '../screens/AuthScreen';
import DrawerNavigator from './DrawerNavigator';

enableScreens();
const Stack = createNativeStackNavigator();
export const navigationRef = React.createRef();

export default function RootNavigator({ initialRoute }) {

  return (
    <NavigationContainer ref={navigationRef} >
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={DrawerNavigator} />
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
