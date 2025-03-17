import React from 'react';
import {StyleSheet, View} from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import {colors} from '../../utls/styles';

const ActivityIndicator = () => {
  return (
    <View style={styles.container}>
      <LoaderKit
        style={{width: 40, height: 40}}
        name={'BallSpinFadeLoader'}
        color={colors.blue}
      />
    </View>
  );
};

export default ActivityIndicator;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
});
