import {ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {errorNotification} from '../../utils/notifications';
import OrderCard from '../../components/OrderCard';
import {useStore} from '../../store';

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const {
    state: {user},
  } = useStore();

  const fetchAllParking = useCallback(async () => {
    try {
      const {data} = await axios({
        method: 'post',
        url: 'http://172.105.34.168:3002/orders/getOrders',
        data: {
          userId: user.id,
        },
      });
      setOrders(data);
    } catch (e) {
      errorNotification(e.message);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAllParking();
  }, [fetchAllParking]);
  return (
    <SafeAreaView style={styles.cont}>
      <ScrollView style={styles.cards}>
        {orders.map(order => (
          <OrderCard order={order} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cont: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 20,
  },
  cards: {
    width: '90%',
  },
});

export default OrderHistoryScreen;
