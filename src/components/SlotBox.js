import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

const SlotBox = ({data, totalSlots, setTotalSlots, index}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [bgColor, setBgColor] = useState(
    data.booked === true ? '#979292' : 'transparent',
  );

  const bookSlot = value => {
    setToggleCheckBox(!toggleCheckBox);
    if (bgColor === '#979292') {
      return;
    }
    if (!value) {
      setBgColor('#1EB316FF');
    } else {
      setBgColor('transparent');
    }
    let arraay = totalSlots;
    arraay.map(aa => {
      if (aa.slotid === data.slotid) {
        aa.available = !aa.available;
        aa.booked = !aa.booked;
      }
    });
    setTotalSlots(arraay);
  };

  return (
    <View style={styles.content}>
      <Pressable
        onPress={() => bookSlot(toggleCheckBox)}
        style={styles.menuItem}>
        <View style={[styles.slot, {backgroundColor: bgColor}]} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  slot: {
    height: 18,
    width: 18,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#767373',
    backgroundColor: '#bb2124',
  },
  warning: {
    marginLeft: 20,
    alignSelf: 'center',
    color: '#878787',
  },
  content: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    paddingVertical: 15,
    borderBottomWidth: 0.2,
    borderColor: 'rgba(0, 0, 0, 0.05);',
    marginTop: 10,
  },
  title: {
    marginBottom: 10,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
});

export default SlotBox;
