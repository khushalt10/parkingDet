import React from 'react';
import {Platform, StyleSheet, View, Text, TextInput} from 'react-native';

import {FontWeights, FontSizes} from '../constants/Typography';

export default function InfoInput({
  label,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  style,
  children,
  prefix,
  showValidation,
  disabled,
  ...props
}) {
  return (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
      {children || (
        <View style={styles.textBox}>
          {prefix}
          <TextInput
            style={[styles.input, style]}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={onChangeText}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            placeholderTextColor="#1878f3"
            {...props}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...FontWeights.bold,
    ...FontSizes.label,
    marginBottom: 10,
    marginTop: 20,
    color: 'blue',
  },
  textBox: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 7 : 6,
    paddingLeft: 20,
    paddingRight: 35,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#777575',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  input: {
    ...FontWeights.body,
    ...FontSizes.label,
    flex: 1,
    paddingVertical: 4,
    color: '#303E65',
  },
  validationMark: {
    alignSelf: 'center',
  },
});
