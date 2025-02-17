import {StyleSheet} from 'react-native';
import {fonts} from '../../../utls/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'column', // Changed to 'column' to stack elements vertically
    justifyContent: 'center', // Centered the content vertically
    alignItems: 'center', // Centered the content horizontally
    marginTop: 35,
  },
  logo: {
    width: 151,
    height: 103,
    resizeMode: 'contain',
  },
  eyeIconImage: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },

  signInTitle: {
    fontSize: 24,
    fontFamily: fonts.Medium,
    color: '#0060CE',
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'left',
    textUnderlinePosition: 'from-font',
    textDecorationSkipInk: 'none',
    marginBottom: 10,
    marginTop: 15,
  },
  signInSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 30,
  },
  inputContainer: {
    color: 'FFFFFF',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 17,
    textAlign: 'left',
    textUnderlinePosition: 'from-font',
    textDecorationSkipInk: 'none',
    color: '#333333',
    marginBottom: 5,
    fontFamily: fonts.Medium,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonContainer: {
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  signInButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0060CE', // Color of the shadow
    shadowOffset: {width: 0, height: 13}, // Direction and distance of shadow
    shadowOpacity: 0.21, // Opacity of shadow
    shadowRadius: 27, // Blur radius of shadow
    elevation: 15, // Elevation for Android (creates shadow effect)
  },
  signInButtonText: {
    color: 'white', // Ensure text color is white or any other suitable color
    fontWeight: 'bold', // Optional: if you want bold text
  },

  bottomContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  createAccountText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666666',
    fontFamily: fonts.Regular,
  },
  createAccountLink: {
    color: '#B1B500',
    fontFamily: fonts.Medium,
    fontSize: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  backIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
});

export default styles;
