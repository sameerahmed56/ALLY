/**
 * @format
 */

 import React,{useEffect} from 'react';
//  import messaging from '@react-native-firebase/messaging';
 import { Provider } from 'react-redux'
 import store from './src/redux/store'
 import {AppRegistry} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
 
 
 const hook = () => {
 
   return(
     <Provider store={store}>
       <App/>
     </Provider>
   )
 }
 

 AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(hook));
 