import {StyleSheet} from 'react-native';

export const colors = {
  primary: ['#126702', '#B1B500'],
  white: '#FFFFFF',
  grey: 'grey',
  black: '#000000',
  errorRed: "#FF0000",
};

// Define common font sizes
export const fontSizes = {
  mSmall: 10,
  small: 12,
  xSmall: 14,
  medium: 16,
  xMedium: 18,
  large: 20,
  xlarge: 23,
};

// Define common font families
export const fonts = {
  Thin: 'Roboto-Thin',
  Light: 'Roboto-Light',
  Regular: 'Roboto-Regular',
  Medium: 'Roboto-Medium',
  Bold: 'Roboto-Bold',
  ExtraBold: 'Roboto-Extra-Bold',
  Black: 'Roboto-Black',
};

export const commonStyles = StyleSheet.create({
  btnContainer: {
    height: 57,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: colors.white,
    fontFamily: fonts.Medium,
    fontSize: fontSizes.xSmall,
  },
});
