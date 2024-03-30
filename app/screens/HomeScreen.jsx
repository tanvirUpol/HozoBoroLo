import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';


const HomeScreen = ({navigation}) => {


  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-medium mb-4 text-black">HomeScreen</Text>
      <View className="flex flex-row  gap-2">
        <TouchableOpacity
          className="mb-4 bg-emerald-600 p-3 rounded-md"
          onPress={() => navigation.navigate('camera')}>
          <Text className="text-white font-medium">Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-4 bg-emerald-600 p-3 rounded-md"
          onPress={() => navigation.navigate('scanner')}>
          <Text className="text-white font-medium">Scanner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
