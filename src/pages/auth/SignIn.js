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
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {fonts} from '../../utls/styles';

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
            source={require('../../../assets/icons/LOGO(SignIn).png')}
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
                    source={require('../../../assets/icons/email-icon.png')}
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
                    source={require('../../../assets/icons/password-icon.png')}
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
                          ? require('../../../assets/icons/eye-open.png') // Image for showing password
                          : require('../../../assets/icons/eye-closed.png') // Image for hiding password
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
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
    color: '#666666',
    marginBottom: 30,
  },
  inputContainer: {
    color: 'FFFFFF',
    marginBottom: 20,
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
  },
  signInButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    fontWeight: 700,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fonts.Medium,
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

export default SignIn;
