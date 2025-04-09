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
import GeneralModal from '../../components/modal/general-modal';
import {getMyProfile} from '../../store/slices/user';
import ActivityIndicator from '../../components/modal/ActivityIndicator';
import FastImage from 'react-native-fast-image';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading, user} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight} />
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : user ? (
        <>
          <View style={styles.contentContainer}>
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={{
                ...styles.scrollContentContainer,
              }}
              keyboardShouldPersistTaps="handled">
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  <Image
                    source={require('../../../assets/icons/profile-border.png')}
                    style={styles.profileBorder}
                  />
                  <View style={styles.profileImageWrapper}>
                    {user?.profilePicture ? (
                      <FastImage
                        source={{
                          uri: user?.profilePicture,
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

                    {/* <Image
                      source={
                        user?.profilePicture
                          ? user?.profilePicture
                          : require('../../../assets/icons/profile.png')
                      }
                      style={styles.profileImage}
                      resizeMode="cover"
                    /> */}
                  </View>
                </View>

                <View style={styles.formContainer}>
                  <Text style={styles.label}>Full Name</Text>
                  <Text style={styles.info}>{user?.name}</Text>
                  <Text style={styles.label}>Email Address</Text>
                  <Text style={styles.info}>{user?.email}</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={[styles.footer]}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('UpdateProfile')}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{marginVertical: 20}} refre>
          <Text style={commonStyles.noDataText}>No data found</Text>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
