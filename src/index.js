/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';

import {SafeAreaView} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';

import Config from '../config.json';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DrawerContent from './navigation/DrawerContent';
import {StoreProvider, useStore} from './store';
import UserInfoScreen from './screens/AuthScreen/UserInfoScreen';
import ParkingDetails from './screens/ParkingDetails';
import 'react-native-gesture-handler';
import NotificationBanner from './components/NotificationBanner';
import {getCurrentUserId, initUser} from './utils/auth';
import OrderHistoryScreen from "./screens/OrderHistoryScreen";

const Drawer = createDrawerNavigator();

function App() {
  return (
    <SafeAreaView style={styles.whole}>
      <StripeProvider publishableKey={Config.stripe.publicKey}>
        <StoreProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <AppContainer />
        </StoreProvider>
        <NotificationBanner />
      </StripeProvider>
    </SafeAreaView>
  );
}

function AppContainer() {
  const {user, actions} = useStore();
  const {updateUser} = actions;

  async function initialize() {
    const uid = getCurrentUserId();

    if (uid) {
      const user = await initUser(uid);
      await updateUser(user);
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        overlayColor="rgba(10, 17, 74, 0.5)"
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login" component={AuthScreen} />
        <Drawer.Screen name="UserInfo" component={UserInfoScreen} />
        <Drawer.Screen name="ParkingDetails" component={ParkingDetails} />
        <Drawer.Screen name="OrderHistory" component={OrderHistoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  whole: {
    height: '100%',
  },
});

export default App;
