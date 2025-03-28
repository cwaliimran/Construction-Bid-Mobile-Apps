import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

const getFileExtention = fileUrl => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};

export const downloadFile = (fileUrl, onComplete) => {
  let date = new Date();
  let FILE_URL = fileUrl; // 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  let file_ext = getFileExtention(FILE_URL);
  file_ext = '.' + file_ext[0];
  const {config, fs} = ReactNativeBlobUtil;
  const path = fs.dirs.DownloadDir + '/' + FILE_URL.split('/').pop();

  let optionsA = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: false,
      path: path,
      description: 'Downloading document.',
    },
  };
  let optionI = {
    fileCache: true,
    path: path,
  };
  let RootDir = fs.dirs.DownloadDir;
  const filePath =
    RootDir +
    '/file_' +
    Math.floor(date.getTime() + date.getSeconds() / 2) +
    file_ext;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      path: path,
      description: 'downloading file...',
      notification: true,
      useDownloadManager: true,
    },
  };
  // config(options)
  config(Platform.OS == 'ios' ? optionI : optionsA)
    .fetch('GET', FILE_URL)
    .then(res => {
      // Alert after successful downloading
      // console.log('path', path);
      // console.log('res -> ', JSON.stringify(res));
      // Platform.OS == "android"
      //   ? android.actionViewIntent(path)
      //   : ios.previewDocument(path);
      //   onComplete && onComplete(path);
      if (Platform.OS == 'android') {
        ReactNativeBlobUtil.android.actionViewIntent(path, 'application/*');
      } else {
        ReactNativeBlobUtil.ios.openDocument(path);
      }
    });
};
