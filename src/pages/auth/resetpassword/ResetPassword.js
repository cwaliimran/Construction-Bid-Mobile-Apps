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
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {changePassword} from '../../../store/slices/user';
import Toast from 'react-native-toast-message';
import ActivityIndicatorModal from '../../../components/modal/ActivityIndicatorModal';

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
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.auth);
  const [showPopup, setShowPopup] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleReset = async values => {
    const data = {
      newPassword: values.newPassword,
    };
    await dispatch(changePassword(data))
      .then(response => {
        setShowPopup(true);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.response?.data?.error || 'Something went wrong',
        });
      });
  };

  const handleLogin = () => {
    setShowPopup(false);
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicatorModal />}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../../assets/icons/back-icon.png')}
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
                  source={require('../../../../assets/icons/password-icon.png')}
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
                      newPasswordVisible
                        ? require('../../../../assets/icons/eye-open.png') // Image for showing password
                        : require('../../../../assets/icons/eye-closed.png') // Image for hiding password
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
                  source={require('../../../../assets/icons/password-icon.png')}
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
                        ? require('../../../../assets/icons/eye-open.png') // Image for showing password
                        : require('../../../../assets/icons/eye-closed.png') // Image for hiding password
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
              source={require('../../../../assets/icons/success.png')}
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

export default ResetPassword;
