import {auth, db} from './firebase';
import {errorNotification, successNotification} from './notifications';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export function getCurrentUserId() {
  return auth?.currentUser?.uid;
}

export function getCurrentUser() {
  return initUser(auth.currentUser?.uid);
}

export async function signInWithCredential(credential) {
  try {
    const {user: authUser} = await auth.signInWithCredential(credential);

    return authUser;
  } catch (error) {
    const {message} = error;
    if (message.includes('auth/account-exists-with-different-credential')) {
      throw new error('email already taken');
    }
    throw error;
  }
}

export async function initUser(uid) {
  const publicUserSnap = await db.collection('users').doc(uid).get();

  return {
    ...publicUserSnap.data(),
    id: uid,
  };
}

export async function handleSignOut() {
  try {
    await auth.signOut();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    successNotification('Logged out of Velvet', "Hope you'll be back soon");
  } catch (e) {
    errorNotification("Couldn't log you out", 'Please try again');
    return false;
  }
  return true;
}
