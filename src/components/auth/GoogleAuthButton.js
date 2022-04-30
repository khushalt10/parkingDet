import React, {useState} from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import Colors from '../../constants/Colors';
import {useStore} from '../../store';
import {initUser, signInWithCredential} from '../../utils/auth';

export default function GoogleAuthButton({navigation}) {
  const [loading, setLoading] = useState(false);
  const {
    actions: {updateUser, updateToken},
  } = useStore();

  async function googleSignIn() {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);
      const authUser = await signInWithCredential(credential);

      await axios({
        method: 'post',
        url: 'http://172.105.34.168:3002/api/user/create',
        data: {
          authUser,
        },
        headers: {
          Authorization: 'Bearer ' + idToken,
        },
      });
      const userData = await initUser(authUser.uid);
      updateUser(userData);
      setLoading(false);
      updateToken(idToken);
      navigation.navigate('UserInfo', {token: idToken});
    } catch (error) {
      console.log('Login Error: ', error);
      setLoading(false);
    }
  }

  return (
    <TouchableOpacity onPress={googleSignIn} style={styles.loginButton}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color={Colors.secondary.lightGrey} />
        </View>
      )}
      {!loading && (
        <>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logoo}
              source={require('../../../assets/auth/images/google-logo.png')}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Sign in with Google</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loader: {
    paddingVertical: 2.5,
  },
  logoo: {
    height: 20,
    width: 20,
  },
  loginButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#4285F4',
    marginBottom: 10,
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
