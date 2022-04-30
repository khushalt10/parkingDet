import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';

const app = firebase.app();

export const auth = app.auth();
export const storage = app.storage();

export const db = app.firestore();
