import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import NativeImage from './NativeImage';
import axios from 'axios';

export default function Card({parkingLot, navigation}) {
  const calculateAvailable = () => {
    let available = 0;
    parkingLot.total_slots.map(pl => {
      if (pl.available === true) {
        available++;
      }
    });
    return available;
  };
  const onCardClicked = async () => {
    const encodedUri = encodeURI(
      `http://api.positionstack.com/v1/forward?access_key=6316c528c25685449fa8f9d02d3432f1&query=${parkingLot.address}`,
    );
    const {data} = await axios.get(encodedUri);
    navigation.navigate('ParkingDetails', {
      parking: parkingLot,
      latitude: data.data[0].latitude,
      longitude: data.data[0].longitude,
    });
  };
  return (
    <TouchableOpacity onPress={onCardClicked} style={styles.cardContainer}>
      <NativeImage
        uri={parkingLot.images[0]}
        resizeMode="cover"
        style={styles.avatar}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.parkingName}>{parkingLot.name}</Text>
        <Text style={styles.parkingDetails}>
          Location: {parkingLot.location}
        </Text>
        <Text style={styles.parkingDetails}>
          Spots Available: {calculateAvailable()}/
          {parkingLot.total_slots.length}
        </Text>
        <Text style={styles.parkingDetails}>
          Price: {parkingLot.pricePerHour} ₹/hr
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 130,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#4389ff',
    marginBottom: 20,
  },
  avatar: {
    height: '100%',
    width: '35%',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  parkingName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  parkingDetails: {
    color: 'white',
    fontSize: 13,
  },
  detailsContainer: {
    display: 'flex',
    marginLeft: 20,
    justifyContent: 'space-evenly',
  },
});
