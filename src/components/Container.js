import React from 'react';
import {View} from 'react-native';

export const ContainerVariants = {
  primary: 'primary',
  secondary: 'secondary',
};

const Container = props => {
  const {
    variant = ContainerVariants.primary,
    lightBgColor,
    darkBgColor,
    children,
    style,
    ...rest
  } = props;

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[{backgroundColor: 'white'}, style]} {...rest}>
      {children}
    </View>
  );
};

export default Container;
