import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {fonts} from '../../utls/styles';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const ResetPassword = () => {
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleReset = values => {
    setShowPopup(true);
  };

  const handleLogin = () => {
    setShowPopup(false);
    navigation.navigate('Home'); // Changed from 'VerifyOTP' to 'Home'
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/icons/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Reset Password</Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.subtitle}>You can now reset your password.</Text>

      <Formik
        initialValues={{newPassword: '', confirmPassword: ''}}
        validationSchema={validationSchema}
        onSubmit={handleReset}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>New Password</Text>
              <View style={styles.inputWrapper}>
                <Image
                  source={require('../../../assets/icons/password-icon.png')}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="*******"
                  placeholderTextColor="#B0B0B0"
                  style={styles.input}
                  secureTextEntry={!newPasswordVisible}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                />
                {/* onPress={() => setNewPasswordVisible(!newPasswordVisible)} */}
                <TouchableOpacity
                  onPress={() => setNewPasswordVisible(!newPasswordVisible)}
                  style={styles.eyeIcon}>
                  <Image
                    source={
                      confirmPasswordVisible
                        ? require('../../../assets/icons/eye-open.png') // Image for showing password
                        : require('../../../assets/icons/eye-closed.png') // Image for hiding password
                    }
                    style={styles.eyeIconImage}
                  />
                </TouchableOpacity>
              </View>
              {touched.newPassword && errors.newPassword && (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Image
                  source={require('../../../assets/icons/password-icon.png')}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="*******"
                  placeholderTextColor="#B0B0B0"
                  style={styles.input}
                  secureTextEntry={!confirmPasswordVisible}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
                <TouchableOpacity
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  style={styles.eyeIcon}>
                  <Image
                    source={
                      confirmPasswordVisible
                        ? require('../../../assets/icons/eye-open.png') // Image for showing password
                        : require('../../../assets/icons/eye-closed.png') // Image for hiding password
                    }
                    style={styles.eyeIconImage}
                  />
                </TouchableOpacity>
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.resetButtonContainer}
              onPress={handleSubmit}>
              <LinearGradient
                colors={['#0060CE', '#0060CE']}
                start={{x: 0.0, y: 0.5}}
                end={{x: 1.0, y: 0.5}}
                style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <Modal visible={showPopup} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={require('../../../assets/icons/success.png')}
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>Password Updated</Text>
            <Text style={styles.modalMessage}>
              Your password has been updated successfully.
            </Text>
            <TouchableOpacity
              style={styles.loginButtonContainer}
              onPress={handleLogin}>
              <LinearGradient
                colors={['#0060CE', '#0060CE']}
                start={{x: 0.0, y: 0.5}}
                end={{x: 1.0, y: 0.5}}
                style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Home</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
    fontFamily: fonts.Medium,
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
    fontWeight: 'bold',
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

export default ResetPassword;
