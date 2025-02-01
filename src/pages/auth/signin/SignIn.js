import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';


// Validation schema using Yup
const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password too short!')
    .required('Password is required'),
});

const SignIn = () => {
  const navigation = useNavigation(); // Use navigation hook to navigate between screens
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
          onSubmit={values => {
            // Handle form submission and navigate to the home screen
            console.log(values);
            navigation.navigate('Home'); // Navigates to the Home screen
          }}>
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
                          ? require('../../../../assets/icons/eye-open.png') // Image for showing password
                          : require('../../../../assets/icons/eye-closed.png') // Image for hiding password
                      }
                      style={styles.eyeIconImage}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

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

        {/* <View style={styles.bottomContainer}>
          <Text style={styles.createAccountText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.createAccountLink}>Create new account</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
