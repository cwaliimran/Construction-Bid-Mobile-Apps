import {StyleSheet} from 'react-native';
import {fonts} from '../../../utls/styles';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 43,
    marginBottom: 20,
  },
  backButton: {
    width: 24,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  placeholder: {
    width: 24, // Same width as backButton for symmetry
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    // fontFamily: fonts,
    color: '#333333',
    textAlign: 'center',
  },
  eyeIconImage: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 30,
    // textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontWeight: 10,
    fontSize: 14,
    fontFamily: fonts.Medium,
    color: '#333333',
    marginBottom: 5,
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
    padding: 5,
  },
  resetButtonContainer: {
    marginTop: 30,
  },
  resetButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    // fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalIcon: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButtonContainer: {
    width: '100%',
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default styles;
