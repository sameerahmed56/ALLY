/**
 * @format
 */

import React, { useEffect } from 'react';
//  import messaging from '@react-native-firebase/messaging';
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { foregroundMessage, backgroundMessage, configureNotification, clickNotification } from './src/services/pushNotification'


const hook = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      foregroundMessage(remoteMessage)
      console.log('remoteMessage1:', remoteMessage)
    });

    return unsubscribe;
  }, []);
  configureNotification()
  clickNotification()
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('remoteMessage2:', remoteMessage)
  backgroundMessage(remoteMessage)
});



AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(hook));
