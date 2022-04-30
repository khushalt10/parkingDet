import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Hyperlink from 'react-native-hyperlink';

import NativeImage from '../components/NativeImage';
import Colors from '../constants/Colors';
import {FontSizes, FontWeights} from '../constants/Typography';

import {PrivacyPolicyLink, TermsAndConditionsLink} from '../constants/Links';
import {useStore} from '../store';
import {handleSignOut} from '../utils/auth';
import {successNotification} from '../utils/notifications';

export default function DrawerContent({navigation, ...props}) {
  const {
    state: {user},
    actions: {updateUser},
  } = useStore();

  useEffect(() => {}, [user]);

  const signOut = async () => {
    updateUser(null);
    await handleSignOut();
    navigation.navigate('Home');
    successNotification('Logged Out,', 'Come back soon!');
  };

  function signOutPressed() {
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: signOut},
      ],
      {cancelable: true, onPress: signOut},
    );
  }

  const goToAuth = () => {
    navigation.navigate('Login');
  };

  let authButton = (
    <DrawerItem
      label="Login"
      icon={() => (
        <MaterialIcons name="login" color={Colors.primary.blue} size={20} />
      )}
      onPress={goToAuth}
      labelStyle={styles.labelStyle}
      style={styles.container}
    />
  );

  if (user) {
    authButton = (
      <DrawerItem
        label="Logout"
        icon={() => (
          <MaterialIcons name="logout" color={Colors.primary.blue} size={20} />
        )}
        onPress={signOutPressed}
        labelStyle={styles.labelStyle}
        style={styles.container}
      />
    );
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        contentContainerStyle={styles.contentContainer}
        {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity>
            <View style={styles.userProfile}>
              {user ? (
                <NativeImage
                  uri={user.photoURL}
                  resizeMode="cover"
                  style={styles.avatar}
                />
              ) : (
                <NativeImage
                  uri={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMsm0RGvOWy2fgGiRglR3zOXiGJiW9ODtS9w&usqp=CAU'
                  }
                  resizeMode="cover"
                  style={styles.avatar}
                />
              )}
              <Text style={styles.headerName}>
                {user ? user?.name : 'Username'}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.sectionContainer}>
            <View style={styles.container}>
              <View style={styles.drawerSection}>
                <View style={styles.sectionItem}>
                  <DrawerItem
                    label="Home"
                    icon={() => (
                      <AntDesign
                        name="home"
                        color={Colors.primary.blue}
                        size={20}
                      />
                    )}
                    onPress={() => navigation.navigate('Home')}
                    labelStyle={styles.labelStyle}
                    style={styles.container}
                  />
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    color={Colors.secondary.lightGrey}
                    size={20}
                  />
                </View>
                {user && (
                  <View style={styles.sectionItem}>
                    <DrawerItem
                      label="Booking History"
                      icon={() => (
                        <MaterialIcons
                          name="history"
                          color={Colors.primary.blue}
                          size={20}
                        />
                      )}
                      onPress={() => {
                        navigation.navigate("OrderHistory");
                      }}
                      labelStyle={styles.labelStyle}
                      style={styles.container}
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={styles.sectionItem}>
              {authButton}
              <Text style={styles.versionText}>v1.0.0</Text>
            </View>
            <Hyperlink
              linkDefault
              linkStyle={styles.disclaimerLink}
              linkText={url =>
                url === PrivacyPolicyLink
                  ? 'Privacy Policy'
                  : 'Terms and Conditions'
              }>
              <Text
                style={
                  styles.disclaimerText
                }>{`${TermsAndConditionsLink}   |   ${PrivacyPolicyLink}`}</Text>
            </Hyperlink>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  drawerContent: {
    flex: 1,
  },
  sectionContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary.lightGrey,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },
  headerName: {
    marginLeft: 15,
    ...FontWeights.semiBold,
    ...FontSizes.label,
  },
  drawerSection: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: Colors.secondary.lightGrey,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  support: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary.lightGrey,
  },
  labelStyle: {
    ...FontSizes.body,
    ...FontWeights.regular,
    marginLeft: -20,
  },
  supportLabel: {
    ...FontSizes.body,
    ...FontWeights.regular,
  },
  versionText: {
    color: Colors.secondary.lightGrey,
  },
  disclaimerText: {
    ...FontSizes.caption,
    ...FontWeights.regular,
    textAlign: 'center',
  },
  disclaimerLink: {
    ...FontWeights.medium,
    ...FontSizes.caption,
  },
});
