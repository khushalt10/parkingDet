import React from 'react';
import {StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';

import NextButton from './NextButton';
import Container from './Container';

const SelectImageBottomSheet = React.forwardRef(
  ({onImageAdd, onCapture}, ref) => {
    return (
      <Modalize
        adjustToContentHeight
        ref={ref}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        modalStyle={styles.container}>
        <Container style={styles.content}>
          <NextButton
            onPress={onCapture}
            label="Take Photo"
            style={styles.captureButton}
          />
          <NextButton
            onPress={onImageAdd}
            label="Choose from device"
            style={styles.captureButton}
          />
        </Container>
      </Modalize>
    );
  },
);

const styles = StyleSheet.create({
  container: {},
  content: {
    flex: 1,
    padding: 20,
  },
  captureButton: {
    height: 50,
    marginTop: 10,
  },
});

export default SelectImageBottomSheet;
