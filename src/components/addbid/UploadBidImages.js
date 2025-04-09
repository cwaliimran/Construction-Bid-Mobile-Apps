import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

// Styles
import styles from '../../pages/bid/addbid/styles';

// Third Party
import ChevronIcon from 'react-native-vector-icons/Feather';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';

// Import Components
import {deleteFile, uploadFile} from '../../store/slices/file';
import {colors, fonts} from '../../utls/styles';
import Toast from 'react-native-toast-message';

const UploadBidImages = ({
  handleData,
  selectedImageFiles,
  setSelectedImageFiles,
}) => {
  const {isUploadLoading} = useSelector(state => state.file);
  const {isLoading, user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const actionSheetRef = useRef(null);
  const options = ['Camera', 'Photos', 'Cancel'];

  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [images, setImages] = useState([]);

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
        setSelectedImageFiles(prev => prev.concat(uploadResponse?.data?.data));
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

      // setSelectedImageFiles(imageData);
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

        setSelectedImageFiles(prev => prev.concat(uploadResponse?.data?.data));
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

      // setSelectedImageFiles(imageData);
    } catch (error) {
      console.log(error.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (selectedImageFiles?.length > 0) {
      const parentData = {
        images: selectedImageFiles.map(i => i.fileName),
        // ['images']: {
        //   sectionId: 'images',
        //   sectionName: 'images',
        //   images: selectedImageFiles,
        // },
      };

      handleData(parentData);
    }
  }, [selectedImageFiles]);

  const ItemList = ({file}) => {
    const handleRemove = () => {
      const data = {
        fileName: file.fileName,
      };

      dispatch(deleteFile(data))
        .then(response => {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: response?.data?.message || 'Item deleted successfully.',
          });
          const filtered = selectedImageFiles.filter(
            i => i.fileName !== file.fileName,
          );
          setSelectedImageFiles(filtered);
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error?.response?.data?.error || 'Something went wrong',
          });
        });
    };
    return (
      <View style={styles.parent}>
        <View style={styles.status_container}>
          <Image
            source={{uri: file.fileUrl}}
            style={{width: 32, height: 32, borderRadius: 6}}
            resizeMethod="resize"
          />
          <View>
            <Text style={styles.house}>{file?.fileName}</Text>
            <Text style={styles.status}>
              Status:<Text style={{color: colors.blue}}> Uploaded</Text>
            </Text>
          </View>
        </View>
        <View style={styles.child}>
          <Pressable
            onPress={() => {
              setImages([{uri: file?.fileUrl}]);
              setImagePreviewVisible(true);
            }}>
            <Image
              source={require('../../../assets/icons/eye.png')}
              style={{width: 20, height: 20}}
              resizeMethod="resize"
            />
          </Pressable>
          <TouchableOpacity onPress={handleRemove}>
            <Image
              source={require('../../../assets/icons/red_cross.png')}
              style={{width: 20, height: 20}}
              resizeMethod="resize"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <ImageView
        images={images}
        imageIndex={0}
        visible={imagePreviewVisible}
        onRequestClose={() => setImagePreviewVisible(false)}
      />

      <Text style={styles.sectionTitle}>Images</Text>
      <View style={styles.img_container}>
        <TouchableOpacity onPress={showActionSheet}>
          {selectedImageFiles || user?.profilePicture ? (
            <Image
              source={require('../../../assets/icons/imgupload.png')}
              style={styles.img_upload}
            />
          ) : (
            <FastImage
              source={{
                uri: selectedImageFiles?.fileUrl || user?.profilePicture,
                priority: FastImage.priority.high,
              }}
              style={styles.img_upload}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
        </TouchableOpacity>

        <Text
          style={[
            styles.sectionTitle,
            {fontSize: 12, fontFamily: fonts.Medium},
          ]}>
          Upload Images
        </Text>
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
      {selectedImageFiles &&
        selectedImageFiles.map(file => <ItemList file={file} />)}
    </>
  );
};

export default UploadBidImages;
