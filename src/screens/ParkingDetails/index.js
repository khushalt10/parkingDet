import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import {useStore} from '../../store';
import NextButton from '../../components/NextButton';
import {FontSizes, FontWeights} from '../../constants/Typography';
import PreviewModal from '../../components/PreviewModal';

const ParkingDetails = ({navigation, route}) => {
  const {
    state: {user},
  } = useStore();
  const [loading, setLoading] = useState(false);
  const [slotsData, setSlotsData] = useState();

  const previewModalRef = useRef(null);
  const {parking, latitude, longitude} = route.params;
  useEffect(() => {}, [parking, latitude, longitude]);

  const calculateAvailable = () => {
    let available = 0;
    parking.total_slots.map(pl => {
      if (pl.available === true) {
        available++;
      }
    });
    return available;
  };

  const closeBottomRef = () => {
    previewModalRef.current?.close();
  };

  const onPreviewPress = async () => {
    if (user) {
      setLoading(true);
      const data = await axios.get(
        `http://172.105.34.168:3002/api/parking/details/${parking.id}`,
      );
      setSlotsData(data.data);
      setLoading(false);
      previewModalRef.current?.open();
    } else {
      Alert.alert('Alert', 'Please Login to book Slots!', [
        {
          text: 'Login',
          onPress: () => navigation.navigate('Login'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <View style={styles.cont}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          />
        </MapView>
      </View>
      <ScrollView style={styles.innercont}>
        <Text style={styles.name}>{parking.name}</Text>
        <View style={styles.details}>
          <Text style={styles.label}>Location: </Text>
          <Text>{parking.address}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Price: </Text>
          <Text>{parking.pricePerHour} ₹/hr</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Slots Available: </Text>
          <Text>
            {calculateAvailable()} available out of {parking.total_slots.length}
          </Text>
        </View>
        <ScrollView horizontal>
          {parking.images.map(i => (
            <Image source={{uri: i}} style={styles.images} />
          ))}
        </ScrollView>
        <Text style={styles.name}>Parking Preview:</Text>
        <Pressable style={styles.prviews} onPress={onPreviewPress}>
          <Image
            style={styles.slots}
            source={require('../../../assets/preview.png')}
          />
        </Pressable>

        <NextButton
          onPress={onPreviewPress}
          label="Show Preview"
          style={styles.button}
          loading={loading}
        />
      </ScrollView>
      <PreviewModal
        ref={previewModalRef}
        slotsData={slotsData}
        closeBottomRef={closeBottomRef}
        id={parking.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    height: '100%',
    backgroundColor: 'white',
  },
  container: {
    height: 250,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  slots: {
    marginVertical: 10,
    height: 150,
    width: '80%',
  },
  innercont: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  prviews: {
    display: 'flex',
    alignItems: 'center',
  },
  images: {
    height: 110,
    width: 120,
    marginRight: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  details: {
    flexDirection: 'row',
    maxWidth: '70%',
    marginVertical: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  logoo: {
    height: '30%',
    width: '100%',
    alignSelf: 'center',
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
    width: '80%',
    marginVertical: 20,
    alignSelf: 'center',
  },
  header: {
    ...FontWeights.medium,
    ...FontSizes.body,
    alignSelf: 'center',
    width: '100%',
    color: '#303E65',
  },
});

export default ParkingDetails;
