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
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../store/slices/user';
import GeneralModal from '../../../components/modal/general-modal';
import ActivityIndicatorModal from '../../../components/modal/ActivityIndicatorModal';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email must have a valid domain (e.g., .com, .net, .org)',
    ),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[0-9]/, 'Password must contain at least one number')
    // .matches(
    //   /[@$!%*?&]/,
    //   'Password must contain at least one special character (@$!%*?&)',
    // )
    .required('Password is required'),
});

const SignIn = ({navigation}) => {
  // API data
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignIn = async values => {
    setIsLoading(true);
    const payload = {
      email: values.email,
      password: values.password,
    };
    dispatch(loginUser(payload))
      .then(response => {
        setIsLoading(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('err ------->', error);
        console.log('err res ------->', error?.response?.data);
        setIsLoading(false);
        setErr(true);
        setErrMsg(error?.response?.data?.error || 'Something went wrong');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <ActivityIndicatorModal />}
      {err && (
        <GeneralModal
          modalError={true}
          description={errMsg}
          Set_Modal_Visibilty={setErr}
        />
      )}
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require('../../../../assets/icons/LOGO(SignIn).png')}
            style={styles.logo}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.signInTitle}>Sign In</Text>
          <Text style={styles.signInSubtitle}>
            For a personalized experience, login to your account
          </Text>
        </View>

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
                    allowFontScaling={false}
                    placeholder="Enter your email"
                    placeholderTextColor="#B0B0B0"
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                    placeholder="Enter your password"
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
