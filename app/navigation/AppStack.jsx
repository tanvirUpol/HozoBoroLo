// import 'react-native-gesture-handler';
import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';

// navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import ScannerScreen from '../screens/ScannerScreen';
// import TokenScreen from '../screens/TokenScreen';
// import TaskStoList from '../screens/TaskStoList';
// import TaskAssign from '../screens/TaskAssign';

const AppStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login" id="App">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="camera" component={CameraScreen} />
      <Stack.Screen name="scanner" component={ScannerScreen} />
      {/* <Stack.Screen name="Token" component={TokenScreen} />
      <Stack.Screen name="TaskSto" component={TaskStoList} />
      <Stack.Screen name="TaskAssign" component={TaskAssign} /> */}
    </Stack.Navigator>
  );
};

export default AppStack;
