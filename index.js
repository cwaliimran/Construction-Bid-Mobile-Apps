/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PERSISTOR, STORE} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function Main() {
  return (
    <Provider store={STORE}>
      <PersistGate loading={null} persistor={PERSISTOR}>
        <App />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
