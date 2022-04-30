import {
  errorNotification,
  successNotification,
  warningNotification,
} from './notifications';

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function paymentSheet(
  initPaymentSheet,
  customer,
  paymentId,
  ephemeralKey,
  paymentIntentClientSecret,
  presentPaymentSheet,
) {
  await initPaymentSheet({
    style: 'alwaysLight',
    merchantCountryCode: 'GB',
    applePay: true,
    googlePay: true,
    testEnv: true,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    paymentIntentClientSecret,
    merchantDisplayName: 'velvet',
  });
  await delay(270);
  const {error} = await presentPaymentSheet({
    clientSecret: paymentIntentClientSecret,
  });
  if (!error) {
    successNotification('Woah yay,', "You've successfully booked a slot!");
  } else {
    if (error.code === 'Canceled') {
      warningNotification(
        'Purchase Canceled',
        'You can check your purchase on order history screen.',
      );
    } else {
      errorNotification(
        'Purchase Failed',
        'You can check your purchase on order history screen.',
      );
    }
  }
}
