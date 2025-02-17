import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Keyboard,
  ActionSheetIOS,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import styles from './styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import ActivityIndicatorModal from '../../components/modal/activity-indicator-modal';
import GeneralModal from '../../components/modal/general-modal';
import {getCurrentUserProfile} from '../../store/slices/user';

const userData = {
  name: 'John Doe',
  email: 'johndiaz@gmail.com',
  profileImage: require('../../../assets/icons/profile.png'),
  profileBorder: require('../../../assets/icons/profile-border.png'),
};

const ProfileScreen = ({navigation}) => {
  // API data
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useSelector(state => state.auth);
  const [profileData, setProfileData] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [profileImage, setProfileImage] = useState(userData.profileImage);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleImagePickerError = error => {
    if (error.code === 'camera_unavailable') {
      Alert.alert('Error', 'Camera is not available on this device');
    } else if (error.code === 'permission') {
      Alert.alert('Error', 'Permission not granted');
    } else {
      Alert.alert('Error', 'Something went wrong while selecting the image');
    }
  };

  const handleImageSelection = response => {
    if (response.didCancel) {
      return;
    }

    if (response.error) {
      handleImagePickerError(response.error);
      return;
    }

    if (response.assets && response.assets[0]) {
      setProfileImage({uri: response.assets[0].uri});
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Please grant camera permission to use this feature.',
      );
      return;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, handleImageSelection);
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleImageSelection);
  };

  const openImagePicker = async () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            openCamera();
          } else if (buttonIndex === 2) {
            openGallery();
          }
        },
      );
    } else {
      Alert.alert(
        'Select Image',
        'Choose an option to select profile image',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Take Photo',
            onPress: openCamera,
          },
          {
            text: 'Choose from Library',
            onPress: openGallery,
          },
        ],
        {cancelable: true},
      );
    }
  };

  const handleUpdate = () => {
    setIsEditing(false);
    console.log('Updated:', {name, email, profileImage});
  };

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword', {email: email});
  };

  useEffect(() => {
    console.log(user);
    
    dispatch(getCurrentUserProfile(user?.userId))
      .then(response => {
        setIsLoading(false);
        setProfileData(response?.data?.profile);
      })
      .catch(error => {
        setIsLoading(false);
        setErr(true);
        setErrMsg(
          error?.response?.data?.error ||
            'An unexpected error has occurred. Please try again later.',
        );
      });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicatorModal loaderIndicator={isLoading} />}
      {err && (
        <GeneralModal
          modalError={true}
          description={errMsg}
          Set_Modal_Visibilty={setErr}
        />
      )}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/icons/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Profile' : 'Profile'}
        </Text>
        <View style={styles.headerRight} />
      </View>
      {profileData && (
        <>
          <View style={styles.contentContainer}>
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={{
                ...styles.scrollContentContainer,
                paddingBottom: keyboardVisible ? 200 : 20,
              }}
              keyboardShouldPersistTaps="handled">
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  <Image
                    source={userData.profileBorder}
                    style={styles.profileBorder}
                  />
                  <TouchableOpacity
                    style={styles.profileImageWrapper}
                    onPress={isEditing ? openImagePicker : null}>
                    <Image
                      source={profileImage}
                      style={styles.profileImage}
                      resizeMode="cover"
                    />
                    {isEditing && (
                      <View style={styles.cameraButtonContainer}>
                        <TouchableOpacity
                          style={styles.cameraButton}
                          onPress={openImagePicker}>
                          <Image
                            source={require('../../../assets/icons/camera-icon.png')}
                            style={styles.cameraIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                  <Text style={styles.label}>Full Name</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                      placeholder="Full Name"
                    />
                  ) : (
                    <Text style={styles.info}>{name}</Text>
                  )}

                  <Text style={styles.label}>Email Address</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Email Address"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  ) : (
                    <Text style={styles.info}>{email}</Text>
                  )}
                </View>
              </View>
            </ScrollView>
          </View>

          <View
            style={[
              styles.footer,
              keyboardVisible &&
                Platform.OS === 'ios' &&
                styles.footerWithKeyboard,
            ]}>
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={handleUpdate}>
                  <Text style={styles.footerButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleResetPassword}>
                  <Text style={styles.resetButtonText}>Reset Password</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;
