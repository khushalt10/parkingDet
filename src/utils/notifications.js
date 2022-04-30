import {showMessage} from 'react-native-flash-message';

const NOTIFICATION_DURATION = 2000;

export function successNotification(
  title,
  description = '',
  duration = NOTIFICATION_DURATION,
) {
  showMessage({
    message: title,
    description,
    type: 'success',
    duration,
  });
}

export function warningNotification(
  title,
  description = '',
  duration = NOTIFICATION_DURATION,
) {
  showMessage({
    message: title,
    description,
    type: 'warning',
    duration,
  });
}

export function errorNotification(
  title,
  description = '',
  duration = NOTIFICATION_DURATION * 2,
) {
  showMessage({
    message: title,
    description,
    type: 'danger',
    duration,
  });
}
