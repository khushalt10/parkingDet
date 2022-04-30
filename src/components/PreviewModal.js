import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Modalize} from 'react-native-modalize';
import SlotBox from './SlotBox';
import NextButton from './NextButton';
import axios from 'axios';
import {useStripe} from '@stripe/stripe-react-native';
import {useStore} from '../store';
import paymentSheet from '../utils/payment';
import {errorNotification} from '../utils/notifications';

const PreviewModal = React.forwardRef(
  ({slotsData, id, closeBottomRef}, ref) => {
    const {
      state: {token, user},
    } = useStore();
    const [totalSlots, setTotalSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const {initPaymentSheet, presentPaymentSheet} = useStripe();

    useEffect(() => {
      if (slotsData) {
        setTotalSlots(
          slotsData.total_slots?.sort((a, b) => a.slotid > b.slotid),
        );
      }
    }, [slotsData]);
    const onSubmit = async () => {
      setLoading(true);
      try {
        const {data} = await axios({
          method: 'post',
          url: 'http://172.105.34.168:3002/orders/checkout',
          data: {
            total_slots: totalSlots,
            lot_id: id,
            uid: user.id,
          },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        console.log(data);
        const {paymentIntentClientSecret, ephemeralKey, customer, paymentId} =
          data;
        setLoading(false);
        closeBottomRef();
        await paymentSheet(
          initPaymentSheet,
          customer,
          paymentId,
          ephemeralKey,
          paymentIntentClientSecret,
          presentPaymentSheet,
        );
      } catch (e) {
        let errMsg = 'Please try again later';
        errorNotification('Something went wrong !', errMsg);
      }
      setLoading(false);
    };

    let content;
    if (totalSlots && totalSlots.length > 0) {
      content = (
        <View style={styles.content}>
          <View>
            <View style={styles.firstRow}>
              {totalSlots
                ?.slice(0, totalSlots.length > 9 ? 9 : totalSlots.length + 1)
                .map((e, i) => (
                  <SlotBox
                    totalSlots={totalSlots}
                    setTotalSlots={setTotalSlots}
                    data={e}
                    index={i}
                  />
                ))}
            </View>
            {totalSlots.length > 9 && (
              <View style={styles.firstRow}>
                {totalSlots
                  ?.slice(9, totalSlots.length > 24 ? 24 : totalSlots.length)
                  .map((e, i) => (
                    <SlotBox
                      totalSlots={totalSlots}
                      data={e}
                      setTotalSlots={setTotalSlots}
                      index={i}
                    />
                  ))}
              </View>
            )}
            {totalSlots.length > 24 && (
              <View style={styles.firstRow}>
                {totalSlots?.slice(24).map((e, i) => (
                  <SlotBox
                    totalSlots={totalSlots}
                    data={e}
                    setTotalSlots={setTotalSlots}
                    index={i}
                  />
                ))}
              </View>
            )}
            <NextButton
              onPress={onSubmit}
              label="Book Now"
              style={styles.button}
              loading={loading}
            />
          </View>
        </View>
      );
    } else {
      content = <View />;
    }
    return (
      <Modalize
        adjustToContentHeight
        ref={ref}
        closeOnOverlayTap
        panGestureEnabled
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        modalStyle={styles.container}>
        <Text style={styles.menuItem}>Select your slot</Text>
        {content}
      </Modalize>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  firstRow: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  warning: {
    marginLeft: 20,
    alignSelf: 'center',
    color: '#F8CF3F',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  title: {
    marginBottom: 10,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
});

export default PreviewModal;
