import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';

const ActivityIndicatorModal = ({loaderIndicator}) => {
  return (
    <View style={styles.container}>
      {loaderIndicator === true ? (
        <ActivityIndicator size="large" animating color={'#0060CE'} />
      ) : (
        ''
      )}
    </View>
  );
};

export default ActivityIndicatorModal;
