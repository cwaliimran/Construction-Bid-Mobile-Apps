// SignIn.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useAuth} from '../../../route/AuthContext';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password too short!')
    .required('Password is required'),
});

const SignIn = () => {
  const navigation = useNavigation();
  const {login} = useAuth();
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSignIn = async values => {
    try {
      let response = await fetch('http://192.168.18.234:5000/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      let jsonResponse = await response.json();

      if (response.ok) {
        login(); // Use context to set login state
        navigation.navigate('Home');
      } else {
        throw new Error(jsonResponse.error || 'Unable to login');
      }
    } catch (error) {
      setApiError(error.message);
      console.error('Login error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require('../../../../assets/icons/LOGO(SignIn).png')}
            style={styles.logo}
          />
        </View>

        <Text style={styles.signInTitle}>Sign In</Text>
        <Text style={styles.signInSubtitle}>
          For a personalized experience, login to your account
        </Text>

        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={SignInSchema}
          onSubmit={handleSignIn}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Image
                    source={require('../../../../assets/icons/email-icon.png')}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Johndoe@gmail.com"
                    placeholderTextColor="#B0B0B0"
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
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
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                    style={styles.eyeIcon}>
                    <Image
                      source={
                        confirmPasswordVisible
                          ? require('../../../../assets/icons/eye-open.png')
                          : require('../../../../assets/icons/eye-closed.png')
                      }
                      style={styles.eyeIconImage}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {apiError ? (
                <Text style={styles.errorText}>{apiError}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.signInButtonContainer}
                onPress={handleSubmit}>
                <LinearGradient
                  colors={['#1D75D8', '#1283D6']}
                  start={{x: 0.0, y: 0.5}}
                  end={{x: 1.0, y: 0.5}}
                  style={styles.signInButton}>
                  <Text style={styles.signInButtonText}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
