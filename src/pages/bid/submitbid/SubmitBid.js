import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Linking,
  Platform,
  Modal,
  TextInput,
  BackHandler,
  Alert,
} from 'react-native';
import styles from './styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {API_ENDPOINTS} from '../../../utls/network/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userConstants} from '../../../constants/user';

import ReactNativeBlobUtil from 'react-native-blob-util';
import FileViewer from 'react-native-file-viewer';
import Toast from 'react-native-toast-message';
import Mailer from 'react-native-mail';

import ActivityIndicatorModal from '../../../components/modal/ActivityIndicatorModal';

import axios from 'axios';
import {downloadFile} from '../../../utls/downloadFile';
import {useDispatch, useSelector} from 'react-redux';
import {bidSendEmail} from '../../../store/slices/bid';
import {setGlobalEmail} from '../../../store/slices/user';

const SubmitBid = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {bidId} = route.params;

  const {isLoading} = useSelector(state => state.bid);
  const {globalEmail} = useSelector(state => state.auth);

  const goToHomePage = () => navigation.navigate('Home');

  const [inputEmail, setInputEmail] = useState(globalEmail || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownload = async () => {
    const token = await AsyncStorage.getItem(userConstants.tokenVariable);
    setDownloadLoading(true);
    try {
      const response = await ReactNativeBlobUtil.fetch(
        'POST',
        `http://18.221.36.251/${API_ENDPOINTS.download.bidPdfDownload}`,
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify({
          bidId: bidId,
        }),
      );

      if (response.respInfo.status === 200) {
        const base64Data = response.base64();

        const {dirs} = ReactNativeBlobUtil.fs;
        const filePath =
          Platform.OS === 'ios'
            ? dirs.DocumentDir + '/bid_detail.pdf'
            : dirs.DownloadDir + '/bid_detail.pdf';

        await ReactNativeBlobUtil.fs.writeFile(filePath, base64Data, 'base64');

        if (Platform.OS === 'android') {
          ReactNativeBlobUtil.android.actionViewIntent(
            filePath,
            'application/pdf',
          );
        } else {
          ReactNativeBlobUtil.ios.openDocument(filePath);
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Failed to download PDF`,
          text1Style: {fontSize: 14},
          text2Style: {fontSize: 10},
        });
      }
      setDownloadLoading(false);
    } catch (error) {
      setDownloadLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Failed to download the bid: ${error.message}`,
        text1Style: {fontSize: 14},
        text2Style: {fontSize: 10},
      });
    }
  };

  const handleSendEmail = async () => {
    setModalVisible(false);
    const token = await AsyncStorage.getItem(userConstants.tokenVariable);
    setDownloadLoading(true);
    dispatch(setGlobalEmail(inputEmail));
    try {
      const response = await ReactNativeBlobUtil.fetch(
        'POST',
        `http://18.221.36.251/${API_ENDPOINTS.download.bidPdfDownload}`,
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify({
          bidId: bidId,
        }),
      );

      if (response.respInfo.status === 200) {
        const base64Data = response.base64();

        const {dirs} = ReactNativeBlobUtil.fs;
        const filePath =
          Platform.OS === 'ios'
            ? dirs.DocumentDir + '/bid_detail.pdf'
            : dirs.DownloadDir + '/bid_detail.pdf';

        Mailer.mail(
          {
            subject: 'Bid Details',
            recipients: [inputEmail],
            // body: '',
            isHTML: true,
            attachments: [
              {
                // Specify either `path` or `uri` to indicate where to find the file data.
                // The API used to create or locate the file will usually indicate which it returns.
                // An absolute path will look like: /cacheDir/photos/some image.jpg
                // A URI starts with a protocol and looks like: content://appname/cacheDir/photos/some%20image.jpg
                path: filePath, // The absolute path of the file from which to read data.
                uri: '', // The uri of the file from which to read the data.
                // Specify either `type` or `mimeType` to indicate the type of data.
                type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                mimeType: '', // - use only if you want to use custom type
                name: `bid_detail_${bidId}`, // Optional: Custom filename for attachment
              },
            ],
          },
          (error, event) => {
            Alert.alert(
              error,
              event,
              [
                {
                  text: 'Ok',
                  onPress: () => console.log('OK: Email Error Response'),
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('CANCEL: Email Error Response'),
                },
              ],
              {cancelable: true},
            );
          },
        );
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Failed to download PDF`,
          text1Style: {fontSize: 14},
          text2Style: {fontSize: 10},
        });
      }
      setDownloadLoading(false);
    } catch (error) {
      setDownloadLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Failed to download the bid: ${error.message}`,
        text1Style: {fontSize: 14},
        text2Style: {fontSize: 10},
      });
    }
  };

  // const handleSendEmail = () => {
  //   setModalVisible(false);
  //   const data = {
  //     bidId: bidId,
  //     // email: inputEmail,
  //   };
  //   dispatch(setGlobalEmail(inputEmail));
  //   dispatch(bidSendEmail(data))
  //     .then(response => {
  //       if (response?.data && response.data?.email_content) {
  //         Mailer.mail(
  //           {
  //             subject: 'Bid Details',
  //             recipients: [inputEmail],
  //             body: response?.data?.email_content,
  //             isHTML: true,
  //           },
  //           (error, event) => {
  //             Alert.alert(
  //               error,
  //               event,
  //               [
  //                 {
  //                   text: 'Ok',
  //                   onPress: () => console.log('OK: Email Error Response'),
  //                 },
  //                 {
  //                   text: 'Cancel',
  //                   onPress: () => console.log('CANCEL: Email Error Response'),
  //                 },
  //               ],
  //               {cancelable: true},
  //             );
  //           },
  //         );
  //       } else {
  //         Alert.alert('Error', 'No email content available in the response.');
  //       }
  //       // Toast.show({
  //       //   type: 'success',
  //       //   text1: 'Success',
  //       //   text2: response?.data?.message || 'Email sent successfully',
  //       // });
  //     })
  //     .catch(error => {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Error',
  //         text2: error?.response?.data?.error || 'Something went wrong',
  //       });
  //     });
  // };

  return (
    <SafeAreaView style={styles.container}>
      {(downloadLoading || isLoading) && <ActivityIndicatorModal />}
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={goToHomePage} style={styles.backButton}>
          <Image
            source={require('../../../../assets/icons/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Image
          source={require('../../../../assets/icons/trophy.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Bid Submitted Successfully.</Text>
        <TouchableOpacity
          style={styles.buttonInternalPDF}
          onPress={handleDownload}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../../assets/icons/download.png')}
              style={styles.icon}
            />
          </View>
          <Text style={styles.buttonText}>Download Internal PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonClientPDF}
          onPress={handleDownload}>
          <Image
            source={require('../../../../assets/icons/download.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Download Clients PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonEmail}
          onPress={() => setModalVisible(true)}>
          <Image
            source={require('../../../../assets/icons/bid-email.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Send Via Email</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Send bid pdf via email</Text>
              <TextInput
                style={styles.modalInput}
                placeholder={`Enter email address`}
                value={inputEmail}
                onChangeText={text => setInputEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                allowFontScaling={false}
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSendEmail}>
                <Text style={styles.modalButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SubmitBid;
