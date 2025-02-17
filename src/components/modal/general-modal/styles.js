import {StyleSheet} from 'react-native';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {colors, commonStyles, fonts} from '../../../utls/styles';

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WP('80'),
  },
  modalContainer: {
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    width: WP('80'),
  },
  modalView: {
    alignItems: 'center',
  },
  modalImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    width: WP('70'),
    textAlign: 'center',
    fontFamily: fonts.Medium,
    marginTop: 10,
    color: colors.primary,
  },
  descriptionText: {
    fontFamily: fonts.Regular,
    fontSize: 13,
    color: colors.black,
    width: WP('70'),
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    ...commonStyles.btnContainer,
    marginTop: 15,
    marginBottom: 20,
  },
  buttonText: {
    ...commonStyles.btnText,
  },
  notNowBtn: {
    marginBottom: 20,
    marginTop: -10,
  },
  notNowBtnText: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    lineHeight: 24,
    color: colors.black,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 15,
    resizeMode: 'contain',
  },
});

export default styles;
