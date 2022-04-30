import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import NativeImage from './NativeImage';
import parkingLots from '../__mock__/parkingLots';

export default function OrderCard({order}) {
  return (
    <TouchableOpacity onPress={() => null} style={styles.cardContainer}>
      <NativeImage
        uri={parkingLots[0].photo}
        resizeMode="cover"
        style={styles.avatar}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.parkingName}>{order?.parking_lot?.name}</Text>
        <Text style={styles.parkingDetails}>
          Location: {order?.parking_lot?.location}
        </Text>
        <Text style={styles.parkingDetails}>
          Price: {order?.parking_lot?.price} ₹/hr
        </Text>
        <Text style={styles.parkingDetails}>Status: {order.status}</Text>
        <Text style={styles.parkingDetails}>
          {new Date(order?.createdAt * 1000).toUTCString()}
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
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: 'gray',
  },
  avatar: {
    height: '100%',
    width: '35%',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  parkingName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  parkingDetails: {
    color: 'black',
    fontSize: 13,
  },
  detailsContainer: {
    display: 'flex',
    marginLeft: 20,
    justifyContent: 'space-evenly',
  },
});
