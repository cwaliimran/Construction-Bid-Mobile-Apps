import React from 'react';
import {StyleSheet, View} from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import {colors} from '../../utls/styles';

const ActivityIndicatorModal = () => {
  return (
    <View style={styles.container}>
      <LoaderKit
        style={{width: 50, height: 50}}
        name={'BallPulse'}
        color={colors.white}
      />
    </View>
  );
};

export default ActivityIndicatorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
});
