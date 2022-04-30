import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {FontWeights, FontSizes} from '../../constants/Typography';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton';
import AppleAuthButton from '../../components/auth/AppleAuthButton';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function AuthScreen({navigation}) {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '982010551710-715feuic4bl3l18ukpsgru98audl256j.apps.googleusercontent.com',
    });
  }, []);
  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome to *APP NAME*</Text>
        </TouchableOpacity>
        <Image
          style={styles.logoo}
          source={require('../../../assets/car-parking.png')}
        />
        <Text style={styles.signin}>Sign in using</Text>
        <View style={styles.loginButtonContainer}>
          <GoogleAuthButton navigation={navigation} />
          <AppleAuthButton />
        </View>
        <Text style={styles.disclaimerText}>
          {
            'By Signing In, you agree to our TermsAndConditions and that you have read our PrivacyPolicy'
          }
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signin: {
    top: 180,
    fontSize: 19,
    fontWeight: '400',
    alignSelf: 'center',
  },
  outerContainer: {
    height: '100%',
    backgroundColor: 'white',
  },
  welcomeText: {
    fontSize: 19,
    fontWeight: '400',
    color: 'black',
    position: 'absolute',
  },
  button: {
    width: '100%',
    height: 45,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 40,
  },
  loginButtonContainer: {
    width: '80%',
    alignSelf: 'center',
    bottom: -200,
  },
  disclaimerText: {
    alignSelf: 'center',
    top: 250,
    width: '82%',
    ...FontSizes.captionLarge,
    ...FontWeights.regular,
    textAlign: 'center',
  },
  loader: {
    paddingVertical: 2.5,
  },
  loginButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#4285F4',
  },
  logoContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  labelContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  label: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
