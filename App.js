import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View, LogBox} from 'react-native';
import SplashScreen from './src/pages/splash/SplashScreen';
import Route from './src/route/Route';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      {!loader ? <SplashScreen /> : <Route />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
