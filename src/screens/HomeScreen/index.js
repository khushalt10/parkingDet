import React, {useState, useEffect, useRef, useCallback} from 'react';
import Permissions, {RESULTS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
} from 'react-native';
import {useForm} from 'react-hook-form';

import Card from '../../components/Card';
import SearchBox from '../../components/SearchBox';
import {useStore} from '../../store';
import NextButton from '../../components/NextButton';
import {uploadProductImage} from '../../utils/media';
import {
  errorNotification,
  successNotification,
} from '../../utils/notifications';
import NativeImage from '../../components/NativeImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectImageBottomSheet from '../../components/SelectImageBottomSheet';
import InfoInput from '../../components/InfoInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const CameraStatus = {
  granted: 'granted',
  checking: 'checking',
  denied: 'denied',
};

const HomeScreen = ({navigation}) => {
  const {
    state: {user, token},
  } = useStore();
  const {handleSubmit} = useForm();

  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [isCoordinates, setIsCoordinates] = useState(false);
  const [isImages, setIsImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [showParking, setShowParking] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [totalSlots, setTotalSlots] = useState('');
  const [price, setPrice] = useState('');
  const [permissionStatus, setPermissionStatus] = useState(
    CameraStatus.checking,
  );

  const fetchAllParking = useCallback(async () => {
    try {
      const data = await axios.get(
        'http://172.105.34.168:3002/api/parking/all',
      );
      const filteredData = Object.values(data.data).filter(p => {
        return p.location?.toLowerCase().includes(search?.toLowerCase());
      });
      if (search?.length > 0) {
        setSearchResults(filteredData);
      } else {
        setSearchResults(data.data);
      }
    } catch (e) {
      errorNotification(e.message);
    }
  }, [search]);

  useEffect(() => {
    fetchAllParking();
  }, [fetchAllParking]);

  const BottomSheetRef = useRef(null);

  async function onImageAdd() {
    try {
      const result = await launchImageLibrary();
      if (result.didCancel !== true) {
        if (isImages && !isCoordinates) {
          setImages(list => [...list, result.assets[0].uri]);
        } else if (!isImages && isCoordinates) {
          setCoordinates(list => [...list, result.assets[0].uri]);
        }
      }
      BottomSheetRef.current.close();
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        return;
      }
      errorNotification('Error', error.message);
      console.log('ADD_PRODUCT_SCREEN::MEDIA ', error);
    }
  }

  async function onCapture() {
    try {
      const result = await launchCamera({mediaType: 'photo'});
      if (result.didCancel !== true) {
        if (isImages && !isCoordinates) {
          setImages(list => [...list, result.assets[0].uri]);
        } else if (!isImages && isCoordinates) {
          setCoordinates(list => [...list, result.assets[0].uri]);
        }
      }
      BottomSheetRef.current.close();
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        errorNotification('Error', error.message);
      }
      console.log('ADD_PRODUCT_SCREEN::MEDIA ', error);
    }
  }

  async function getImageRefs(list, docId, isCo = false) {
    const imageRefs = [];

    for (const idx in list) {
      if (Object.prototype.hasOwnProperty.call(list, idx)) {
        if (list[idx].substring(0, 8) === 'https://') {
          imageRefs.push(list[idx]);
        } else {
          const uri = list[idx];
          const datetime = Date.now();
          const downloadURL = await uploadProductImage(
            `${docId}/${datetime}`,
            uri,
            isCo,
          );
          imageRefs.push(downloadURL);
        }
      }
    }
    return imageRefs;
  }

  function removeImage(idx) {
    const list = [...images];
    list.splice(idx, 1);
    setImages(list);
  }

  function removeCoordinates(idx) {
    const list = [...coordinates];
    list.splice(idx, 1);
    setCoordinates(list);
  }

  useEffect(() => {
    initializePermissions();
  }, []);

  const checkPermission = permission => {
    const permissionList = Object.values(permission);
    return (
      permissionList[0] === permissionList[1] &&
      permissionList[0] === RESULTS.GRANTED
    );
  };

  const initializePermissions = async () => {
    const platform = Platform.OS;

    const CAMERA = 'CAMERA';

    try {
      let permission = await Permissions.checkMultiple([
        `${platform}.permission.${CAMERA}`,
      ]);

      if (checkPermission(permission)) {
        setPermissionStatus(CameraStatus.granted);
      } else {
        permission = await Permissions.requestMultiple([
          `${platform}.permission.${CAMERA}`,
        ]);

        if (checkPermission(permission)) {
          setPermissionStatus(CameraStatus.granted);
        } else {
          setPermissionStatus(CameraStatus.denied);
        }
      }
    } catch (e) {
      errorNotification('Permission Not Available!', `${e.message}`);
    }
  };

  const addProduct = async () => {
    setLoading(true);
    const docId = uuid.v1();
    const imageRefs = await getImageRefs(images, docId);
    const coordinatesRefs = await getImageRefs(coordinates, docId, true);
    const decodedImages = imageRefs.map(ir => decodeURIComponent(ir));
    const decodedCoordinates = coordinatesRefs.map(ir =>
      decodeURIComponent(ir),
    );
    try {
      const {data} = await axios({
        method: 'post',
        url: 'http://172.105.34.168:3002/api/parking/add',
        data: {
          name,
          address,
          images: imageRefs,
          coordinates: coordinatesRefs,
          decodedCoordinates,
          decodedImages,
          location,
          docId,
          total_slots: totalSlots,
          price,
          uid: user.id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      if (data.err) {
        errorNotification(
          'There was problem adding Parking lot!',
          `${data.err}`,
        );
      } else {
        successNotification(
          'Parking Lot Added Successfully!',
          'You can access the parking lot via customer dashboard',
        );
      }
    } catch (e) {
      setLoading(false);
      errorNotification(
        'There was problem adding Parking lot!',
        `${e.message}`,
      );
    }
    await fetchAllParking();
    // setName('');
    // setCoordinates([]);
    // setPrice();
    // setTotalSlots();
    // setAddress('');
    // setLocation('');
    // setImages([]);
    setShowParking(false);
    setLoading(false);
  };

  return (
    <View style={styles.whole}>
      {user?.role !== 'owner' ? (
        <>
          <View style={styles.search}>
            <SearchBox
              value={search}
              onChangeText={val => {
                setSearch(val);
              }}
              placeholder="search for desired location"
            />
          </View>
          <ScrollView style={styles.cards}>
            {searchResults.map(p => (
              <Card parkingLot={p} navigation={navigation} />
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          {!showParking && (
            <NextButton
              loading={loading}
              style={styles.button}
              onPress={() => setShowParking(!showParking)}
              label="Add Parking Lot"
            />
          )}
          <SafeAreaView style={{flex: 1}}>
            {showParking && (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView
                  contentContainerStyle={styles.content}
                  showsVerticalScrollIndicator={false}>
                  <Text>Parking Details</Text>
                  <Text style={styles.productDetail}>Parking Lot Images</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.imageList}>
                    <Pressable
                      onPress={() => {
                        BottomSheetRef.current?.open();
                        setIsImages(true);
                        setIsCoordinates(false);
                      }}
                      style={[styles.addImage, {borderColor: 'black'}]}>
                      <MaterialCommunityIcons
                        name="image-outline"
                        size={28}
                        color="black"
                      />
                    </Pressable>
                    {images.length > 0 &&
                      images.map((uri, idx) => (
                        <View key={uri} style={styles.productCard}>
                          <NativeImage
                            uri={uri}
                            style={styles.productImage}
                            borderRadius={5}
                          />
                          <Pressable
                            onPress={() => removeImage(idx)}
                            style={[
                              styles.removeProductImage,
                              {
                                backgroundColor: 'red',
                                borderColor: 'white',
                              },
                            ]}>
                            <AntDesign name="close" size={16} color="white" />
                          </Pressable>
                        </View>
                      ))}
                  </ScrollView>
                  <Text style={styles.productDetail}>Co-ordinates Image</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.imageList}>
                    <Pressable
                      onPress={() => {
                        BottomSheetRef.current?.open();
                        setIsImages(false);
                        setIsCoordinates(true);
                      }}
                      style={[styles.addImage, {borderColor: 'black'}]}>
                      <MaterialCommunityIcons
                        name="image-outline"
                        size={28}
                        color="black"
                      />
                    </Pressable>
                    {coordinates.length > 0 &&
                      coordinates.map((uri, idx) => (
                        <View key={uri} style={styles.productCard}>
                          <NativeImage
                            uri={uri}
                            style={styles.productImage}
                            borderRadius={5}
                          />
                          <Pressable
                            onPress={() => removeCoordinates(idx)}
                            style={[
                              styles.removeProductImage,
                              {
                                backgroundColor: 'red',
                                borderColor: 'white',
                              },
                            ]}>
                            <AntDesign name="close" size={16} color="white" />
                          </Pressable>
                        </View>
                      ))}
                  </ScrollView>
                  <InfoInput
                    label="Parking Lot *"
                    placeholder="Name"
                    onChangeText={val => {
                      setName(val);
                    }}
                    value={name}
                    placeholderTextColor={'#1878f3'}
                  />
                  <InfoInput
                    label="Location *"
                    placeholder="Area"
                    onChangeText={val => {
                      setLocation(val);
                    }}
                    value={location}
                    placeholderTextColor={'#1878f3'}
                  />
                  <InfoInput
                    label="Address *"
                    multiline
                    numberOfLines={3}
                    placeholder="address"
                    onChangeText={val => {
                      setAddress(val);
                    }}
                    value={address}
                    placeholderTextColor={'#1878f3'}
                  />
                  <InfoInput
                    label="Total Spots *"
                    placeholder="parking lots"
                    onChangeText={val => {
                      setTotalSlots(val);
                    }}
                    keyboardType="numeric"
                    value={totalSlots}
                    placeholderTextColor={'#1878f3'}
                  />
                  <InfoInput
                    label="Price per hour *"
                    placeholder="price"
                    onChangeText={val => {
                      setPrice(val);
                    }}
                    value={price}
                    keyboardType="numeric"
                    placeholderTextColor={'#1878f3'}
                  />
                  <NextButton
                    loading={loading}
                    style={styles.highlightButton}
                    onPress={handleSubmit(addProduct)}
                    label="Save"
                  />
                </ScrollView>
              </KeyboardAvoidingView>
            )}
            <SelectImageBottomSheet
              ref={BottomSheetRef}
              onImageAdd={onImageAdd}
              onCapture={onCapture}
            />
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  whole: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  cards: {
    width: '90%',
  },
  search: {
    alignSelf: 'center',
    width: '95%',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    marginTop: 20,
    height: 40,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  addImage: {
    height: 130,
    width: 100,
    marginTop: 20,
    marginRight: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'blue',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCard: {
    paddingTop: 20,
  },
  productImage: {
    height: 130,
    width: 100,
    backgroundColor: 'white',
    marginHorizontal: 9,
  },
  productDetail: {
    marginTop: 10,
    fontSize: 15,
    color: 'blue',
  },
  removeProductImage: {
    position: 'absolute',
    right: 2,
    bottom: 115,
    padding: 5,
    paddingTop: 5,
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 1,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  errorIcon: {
    marginRight: 4,
  },
  errorMsg: {
    color: '#f74228',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    marginTop: 5,
  },
  highlightButton: {
    height: 44,
    width: '100%',
    marginVertical: 18,
  },
  currencyPrefixContainer: {justifyContent: 'center'},
  imageList: {
    flexDirection: 'row',
  },
});

export default HomeScreen;
