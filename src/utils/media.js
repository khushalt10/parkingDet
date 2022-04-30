import {Platform} from 'react-native';

import {storage} from './firebase';

export function getImageType(uri) {
  return uri.split('.').splice(-1);
}

// export async function getImageFromLibrary(aspect = [9, 16]) {
//   const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   if (!granted) {
//     throw new Error('Permission Denied');
//   }
//
//   const result = await ImagePicker.launchImageLibraryAsync({
//     allowsEditing: true,
//     aspect,
//     quality: 0.9,
//   });
//
//   if (result.cancelled) {
//     const err = new Error('');
//     err.code = 'E_PICKER_CANCELLED';
//     throw err;
//   }
//
//   return result;
// }
//
// export async function getCapturedImage(aspect = [9, 16]) {
//   const {granted} = await ImagePicker.requestCameraPermissionsAsync();
//   if (!granted) {
//     throw new Error('Camera Permission Denied');
//   }
//
//   const result = await ImagePicker.launchCameraAsync({
//     allowsEditing: true,
//     aspect,
//     quality: 0.9,
//   });
//
//   if (result.cancelled) {
//     const err = new Error('');
//     err.code = 'E_PICKER_CANCELLED';
//     throw err;
//   }
//
//   return result;
// }
//
// export async function getVideoFromLibrary() {
//   const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   if (!granted) {
//     throw new Error('Permission Denied');
//   }
//
//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//   });
//
//   if (result.cancelled) {
//     const err = new Error('');
//     err.code = 'E_PICKER_CANCELLED';
//     throw err;
//   }
//
//   return result;
// }

export async function uploadProfileImage(id, uri) {
  return uploadToStorage('profile', id, uri);
}

export async function uploadProductImage(id, uri, isCo) {
  return uploadToStorage(isCo ? 'co-ordinates' : 'parking', id, uri);
}

export async function uploadLivestreamThumbnail(id, uri) {
  return uploadToStorage('livestream', id, uri);
}

async function uploadToStorage(imageType, id, uri) {
  const [type] = getImageType(uri);
  const storageRef = `/${imageType}-images/${id}.${type}`;

  const ref = storage.ref(storageRef);
  await ref.putFile(uri);
  return ref.getDownloadURL();
}

export async function processMediaPath(uri) {
  const [videoType] = uri.split('.').slice(-1);
  const videoPath = uri.replace(
    Platform.select({android: 'file://', ios: ''}),
    '',
  );

  return {videoPath, videoType};
}
