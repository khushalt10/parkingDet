import React from 'react';
import {Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';

import {FontWeights, FontSizes} from '../constants/Typography';

export default function NextButton({
  label,
  onPress,
  style,
  loading,
  labelStyle,
}) {
  const buttonStyle = [styles.container, style];
  if (loading) {
    buttonStyle.push(styles.disabledButtonStyle);
  }

  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={buttonStyle}
      activeOpacity={0.8}>
      {label && !loading && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      {loading && <ActivityIndicator />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#1878f3',
    borderRadius: 10,
  },
  label: {
    ...FontSizes.label,
    ...FontWeights.bold,
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
  disabledButtonStyle: {
    opacity: 0.5,
  },
});
