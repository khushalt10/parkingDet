import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import {
  appleAuth,
  appleAuthAndroid,
  AppleButton,
} from '@invertase/react-native-apple-authentication';

export default function AppleAuthButton() {
  const [loading, setLoading] = useState(false);

  if (Platform.OS === 'ios' && !appleAuth.isSupported) {
    return null;
  }
  if (Platform.OS === 'android' && !appleAuthAndroid.isSupported) {
    return null;
  }

  const appleLogin = () => {
    console.log('ssdf');
  };

  const icon = loading ? (
    <ActivityIndicator color="white" />
  ) : (
    <Image
      style={styles.logoo}
      source={require('../../../assets/auth/images/apple-logo.png')}
    />
  );

  return (
    <AppleButton
      onPress={appleLogin}
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.SIGN_IN}
      style={styles.button}
      textStyle={styles.text}
      leftView={icon}
      disabled={loading}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoo: {
    height: 18,
    width: 18,
    top: 1,
  },
  text: {
    alignSelf: 'center',
    paddingLeft: 17,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
