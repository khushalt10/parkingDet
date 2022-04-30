import React from 'react';
import {Platform, StyleSheet, View, Text, TextInput} from 'react-native';

import {FontWeights, FontSizes} from '../constants/Typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SearchBox({
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
      {children || (
        <View style={styles.textBox}>
          <MaterialIcons style={styles.search} name="search" size={25} />
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
  search: {
    marginTop: 6,
  },
  textBox: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 7 : 6,
    paddingLeft: 20,
    paddingRight: 35,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#1878f3',
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
