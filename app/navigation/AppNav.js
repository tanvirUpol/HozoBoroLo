import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// stacks
import AppStack from './AppStack';
// import AuthStack from './AuthStack';
// import {AuthContext} from '../context/AuthContext';
// import {ActivityIndicator, View} from 'react-native';

const AppNav = () => {
  // const {isLoading, user} = useContext(AuthContext);

  // console.log(isLoading);
  // if (isLoading) {
  //   return (
  //     // eslint-disable-next-line react-native/no-inline-styles
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size={'large'} />
  //     </View>
  //   );
  // }
  return (
    <NavigationContainer>
      {/* {user !== null ? <AppStack /> : <AuthStack />} */}
      <AppStack />
    </NavigationContainer>
  );
};

export default AppNav;
