/**
 * Typography:
 * This contains all the typography config for the application
 * #Note: color and font size are defaulted as they can be overridden
 *        as required.
 */

import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from './Colors';

const FontWeights = {
  bold: {
    fontFamily: 'Poppins-Bold',
    color: Colors.secondary.black,
  },
  semiBold: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.secondary.black,
  },
  medium: {
    fontFamily: 'Poppins-Medium',
    color: Colors.secondary.black,
  },
  regular: {
    fontFamily: 'Poppins-Regular',
    color: Colors.secondary.black,
  },
  thin: {
    fontFamily: 'Poppins-Thin',
    color: Colors.secondary.black,
  },
};

const FontSizes = {
  heading: {
    fontSize: RFPercentage(3.6),
  },
  subHeading: {
    fontSize: RFPercentage(3.2),
  },
  label: {
    fontSize: RFPercentage(2.4),
  },
  body: {
    fontSize: RFPercentage(1.8),
  },
  captionLarge: {
    fontSize: RFPercentage(1.6),
  },
  caption: {
    fontSize: RFPercentage(1.4),
  },
};

export { FontWeights, FontSizes };
