import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View, LogBox, Appearance} from 'react-native';
import SplashScreen from './src/pages/splash/SplashScreen';
import Route from './src/route/Route';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userConstants} from './src/constants/user';
import {useDispatch} from 'react-redux';
import {setUser} from './src/store/slices/user';

const App = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      const isConnected = state.isConnected ? 'true' : 'false';
      AsyncStorage.setItem(userConstants.isInternetAvailable, isConnected);
      if (isConnected === 'false') {
        console.log('Internet Disconnected');
      }
      if (isConnected === 'true') {
        console.log('Internet Connected');
      }
    });

    return () => {
      unsubscribeNetInfo();
    };
  }, [dispatch]);

  useEffect(() => {
    Appearance.setColorScheme('light');
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
