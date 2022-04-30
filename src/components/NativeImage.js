import React from 'react';

import FastImage from 'react-native-fast-image';

export default function NativeImage({
  style,
  uri,
  priority,
  resizeMode,
  children,
}) {
  return (
    <FastImage
      fallback
      style={style}
      source={{
        uri: uri,
        priority: priority || FastImage.priority.normal,
      }}
      resizeMode={resizeMode || FastImage.resizeMode.contain}>
      {children}
    </FastImage>
  );
}
