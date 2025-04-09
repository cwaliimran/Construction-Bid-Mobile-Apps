import React, {useEffect, useRef, useState} from 'react';
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
import GeneralModal from '../../components/modal/general-modal';
import {getMyProfile, updateProfile} from '../../store/slices/user';
import ActivityIndicator from '../../components/modal/ActivityIndicator';
import ActionSheet from 'react-native-actionsheet';
import ImageCropPicker from 'react-native-image-crop-picker';

import FastImage from 'react-native-fast-image';

import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import ActivityIndicatorModal from '../../components/modal/ActivityIndicatorModal';
import {uploadFile} from '../../store/slices/file';

const UpdateProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email must have a valid domain (e.g., .com, .net, .org)',
    ),
});

const UpdateProfile = ({navigation}) => {
  // API data
  const dispatch = useDispatch();

  const {isLoading, user} = useSelector(state => state.auth);

  console.log('user picture ---------->', user?.profilePicture);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const {isUploadLoading} = useSelector(state => state.file);

  const [selectedImageFile, setSelectedImageFile] = useState(null);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setKeyboardVisible(true);
  //     },
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setKeyboardVisible(false);
  //     },
  //   );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);

  const actionSheetRef = useRef(null);
  const options = ['Camera', 'Photos', 'Cancel'];

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const MAX_SIZE_MB = 10;

  const handleCameraClick = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        cropping: true,
        width: 1080,
        height: 1080,
        compressImageQuality: 0.5,
      });

      const imageSizeMB = image.size / (1024 * 1024); // size is in bytes, so convert to MB

      if (imageSizeMB > MAX_SIZE_MB) {
        Alert.alert('Image exceeds the size limit', [{text: 'OK'}]);
        return;
      }

      const formData = new FormData();
      formData.append('file', {
        name: image.filename || `camera_image_${Date.now()}`,
        uri: image.path,
        type: image.mime,
      });

      try {
        const uploadResponse = await dispatch(uploadFile(formData));
        setSelectedImageFile(uploadResponse?.data?.data);
      } catch (error) {
        setErr(true);
        setErrMsg(error?.response?.data?.message || 'Something went wrong');
      }
      // const imageData = {
      //   name: image.filename || `camera_image_${Date.now()}`,
      //   uri: image.path,
      //   type: image.mime,
      //   avatar: false,
      // };

      // setSelectedImageFile(imageData);
    } catch (error) {
      console.log(error.message || 'Something went wrong');
    }
  };

  const handlePhotosClick = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        width: 1080,
        height: 1080,
        compressImageQuality: 0.5,
      });

      const imageSizeMB = image.fileSize / (1024 * 1024);

      if (imageSizeMB > MAX_SIZE_MB) {
        Alert.alert(t('imageExceedsErr'), [
          {
            text: 'OK',
            // onPress: () => {},
          },
        ]);

        return;
      }

      const formData = new FormData();
      formData.append('file', {
        name: image.filename || `image_${Date.now()}`,
        uri: image.path,
        type: image.mime,
      });

      try {
        const uploadResponse = await dispatch(uploadFile(formData));

        setSelectedImageFile(uploadResponse?.data?.data);
      } catch (error) {
        setErr(true);
        setErrMsg(error?.response?.data?.message || 'Something went wrong');
      }

      // const imageData = {
      //   name: image.filename || `image_${Date.now()}`,
      //   uri: image.path,
      //   type: image.mime,
      //   avatar: false,
      // };

      // setSelectedImageFile(imageData);
    } catch (error) {
      console.log(error.message || 'Something went wrong');
    }
  };

  const handleUpdate = async values => {
    const data = {
      name: values.name,
      email: values.email,
    };

    if (selectedImageFile) {
      data.profilePicture = selectedImageFile?.fileName;
    }

    await dispatch(updateProfile(data))
      .then(response => {
        navigation.goBack();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.data?.message || 'Profile update successfully',
        });
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.response?.data?.error || 'Something went wrong',
        });
      });
  };

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <View style={styles.container}>
      {(isLoading || isUploadLoading) && <ActivityIndicatorModal />}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/icons/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.headerRight} />
      </View>
      {user ? (
        <>
          <Formik
            initialValues={{
              name: user?.name || '',
              email: user?.email || '',
            }}
            validationSchema={UpdateProfileSchema}
            onSubmit={handleUpdate}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
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
                          source={require('../../../assets/icons/profile-border.png')}
                          style={styles.profileBorder}
                        />
                        <TouchableOpacity
                          style={styles.profileImageWrapper}
                          onPress={showActionSheet}>
                          {selectedImageFile || user?.profilePicture ? (
                            <FastImage
                              source={{
                                uri:
                                  selectedImageFile?.fileUrl ||
                                  user?.profilePicture,
                                priority: FastImage.priority.high,
                              }}
                              style={styles.profileImage}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          ) : (
                            <Image
                              source={require('../../../assets/icons/profile.png')}
                              style={styles.profileImage}
                              resizeMode="cover"
                            />
                          )}

                          <View style={styles.cameraButtonContainer}>
                            <TouchableOpacity
                              style={styles.cameraButton}
                              onPress={showActionSheet}>
                              <Image
                                source={require('../../../assets/icons/camera-icon.png')}
                                style={styles.cameraIcon}
                              />
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.formContainer}>
                        <Text style={styles.label}>Full Name</Text>

                        <TextInput
                          allowFontScaling={false}
                          placeholder="Enter your name"
                          placeholderTextColor="#B0B0B0"
                          style={styles.input}
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          value={values.name}
                        />

                        {touched.name && errors.name && (
                          <Text style={styles.errorText}>{errors.name}</Text>
                        )}

                        <Text style={styles.label}>Email Address</Text>

                        <TextInput
                          allowFontScaling={false}
                          placeholder="Enter you email"
                          placeholderTextColor="#B0B0B0"
                          style={styles.input}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />

                        {touched.email && errors.email && (
                          <Text style={styles.errorText}>{errors.email}</Text>
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
                  <>
                    <TouchableOpacity
                      style={styles.updateButton}
                      onPress={handleSubmit}>
                      <Text style={styles.footerButtonText}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.resetButton}
                      onPress={handleResetPassword}>
                      <Text style={styles.resetButtonText}>Reset Password</Text>
                    </TouchableOpacity>
                  </>
                </View>
              </>
            )}
          </Formik>
        </>
      ) : (
        <View style={{marginVertical: 20}} refre>
          <Text style={commonStyles.noDataText}>No data found</Text>
        </View>
      )}
      <ActionSheet
        ref={actionSheetRef}
        title={'Select an option'}
        options={options}
        cancelButtonIndex={2}
        onPress={index => {
          if (index === 0) {
            handleCameraClick();
          } else if (index === 1) {
            handlePhotosClick();
          }
        }}
      />
    </View>
  );
};

export default UpdateProfile;
