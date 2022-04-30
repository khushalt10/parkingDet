import React, {useState, useEffect} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useStore} from '../../store';
import InfoInput from '../../components/InfoInput';
import NextButton from '../../components/NextButton';
import {FontSizes, FontWeights} from '../../constants/Typography';
import axios from 'axios';

const UserInfoScreen = ({navigation, route}) => {
  const {
    state: {user},
    actions: {updateUser},
  } = useStore();
  const {token} = route.params;
  const [formData, setFormData] = useState({
    displayName: user?.name || '',
    email: user?.email || '',
    photo: user?.photoURL || '',
    phone: user?.phoneNumber || '',
  });
  const [errorText, setErrorText] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.name,
        email: user.email,
        photo: user.photoURL,
        phone: user.phoneNumber,
      });
    }
  }, [user]);
  const onSubmit = async role => {
    setLoading(true);

    try {
      await axios({
        method: 'put',
        url: 'http://172.105.34.168:3002/api/user/create',
        data: {
          name: formData.displayName,
          phoneNumber: formData.phone,
          uid: user.id,
          role: role,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setFormData({
        displayName: '',
        email: '',
        photo: '',
        phone: '',
      });
      updateUser({...user, role});

      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  if (user) {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.cont}>
        <Image style={styles.logoo} source={{uri: formData.photo}} />
        <View style={styles.formContainer}>
          <InfoInput
            label="Full Name"
            placeholder="Full Name *"
            onChangeText={val => setFormData({...formData, displayName: val})}
            value={formData.displayName}
            placeholderTextColor={formData.displayName ? '#303E65' : '#1878f3'}
          />
          <InfoInput
            label="Email"
            placeholder="Email *"
            onChangeText={val => {
              setFormData({...formData, email: val});
              setErrorText(null);
            }}
            value={formData.email}
            disabled={true}
            placeholderTextColor={formData.email ? '#303E65' : '#1878f3'}
          />
          <InfoInput
            label="Phone Number"
            placeholder="Phone Number *"
            onChangeText={val => {
              setFormData({...formData, phone: val});
              setErrorText(null);
            }}
            value={formData.phone}
            placeholderTextColor={formData.phone ? '#303E65' : '#1878f3'}
          />
          {errorText && <Text style={styles.errorText}> {errorText} </Text>}
          {!user?.role ? (
            <>
              <NextButton
                onPress={() => onSubmit('customer')}
                label="Continue as Customer"
                style={styles.button}
                loading={loading}
              />
              <NextButton
                onPress={() => onSubmit('owner')}
                label="Continue as Owner"
                style={styles.button}
                loading={loading}
              />
            </>
          ) : (
            <NextButton
              onPress={() => onSubmit(user.role)}
              label="Next"
              style={styles.button}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  cont: {
    height: '100%',
    backgroundColor: 'white',
  },
  logoo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 30,
  },
  formContainer: {
    display: 'flex',
    alignSelf: 'center',
    marginTop: 30,
    width: '80%',
  },
  errorText: {
    marginTop: 3,
    color: 'red',
  },
  button: {
    marginTop: 30,
    paddingVertical: 5,
  },
  header: {
    ...FontWeights.medium,
    ...FontSizes.body,
    alignSelf: 'center',
    width: '100%',
    color: '#303E65',
  },
});

export default UserInfoScreen;
