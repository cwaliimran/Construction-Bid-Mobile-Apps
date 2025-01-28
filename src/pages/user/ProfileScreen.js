import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const userData = {
  name: 'John Doe',
  email: 'johndiaz@gmail.com',
  profileImage: require('../../../assets/icons/profile.png'),
  profileBorder: require('../../../assets/icons/profile-border.png'),
};

const ProfileScreen = () => {
  const navigation = useNavigation();
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
    // Passing email as a parameter to pre-fill the email field on reset screen if needed
  };

  // Rest of the component remains the same...
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}>
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

      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
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
          keyboardVisible && Platform.OS === 'ios' && styles.footerWithKeyboard,
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
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 48 : 16,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    width: 32,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 32,
    width: 100,
    height: 100,
  },
  profileImageWrapper: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  profileBorder: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: -5,
    left: 0,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  cameraButtonContainer: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    zIndex: 1,
  },
  cameraButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  cameraIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFF',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
    fontWeight: '500',
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFF',
    width: '100%',
  },
  footer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerWithKeyboard: {
    bottom: 0,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  footerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
