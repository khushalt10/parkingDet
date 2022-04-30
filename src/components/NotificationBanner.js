import React from 'react';
import {StyleSheet, Platform, StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';

import {RFPercentage} from 'react-native-responsive-fontsize';

const NotificationBanner = () => (
  <FlashMessage
    floating
    position="top"
    style={styles.container}
    titleStyle={styles.titleStyle}
    textStyle={styles.textStyle}
  />
);

const styles = StyleSheet.create({
  container: {
    top: Platform.select({android: StatusBar.currentHeight, ios: 0}),
    zIndex: 20,
  },
  titleStyle: {
    fontSize: RFPercentage(2.4),
    lineHeight: RFPercentage(2.6),
    color: 'white',
  },
  textStyle: {
    fontSize: RFPercentage(1.8),
    color: 'white',
  },
});

export default NotificationBanner;
