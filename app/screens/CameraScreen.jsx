import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  Templates,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';

// firebase
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const CameraScreen = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [newPhoto, setNewPhoto] = useState(null);
  const isFocused = useIsFocused();
  const isActive = isFocused;

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const TakeAphoto = async () => {
    console.log('Photo Taken');
    const photo = await camera.current?.takePhoto();
    setNewPhoto(photo);
    // console.log(photo);
  };

  const RemovePhoto = async () => {
    setNewPhoto(null);
  };

  const uploadPhoto = async () => {
    console.log('upload clicked')
    try {
      console.log('inside try')
      const result = await fetch(`file://${newPhoto.path}`);
      const data = await result.blob();

      console.log('blob data', data);

      // Generate a unique file name for the image
      const imageName = `${Date.now()}_photo.jpg`;

      // Create a reference to the Firebase Storage bucket
      const reference = storage().ref(`images/${imageName}`);

      console.log('reference', reference);

      const uploadTask = reference.put(data);

      // Attach an observer to monitor the upload progress
      uploadTask.on('state_changed',
        snapshot => {
          // Handle progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% complete`);
        },
        error => {
          // Handle errors
          console.error('Error uploading image:', error);
        },
        () => {
          // Handle successful completion
          console.log('Image uploaded successfully');
        }
      );
    } catch (error) {
      console.log('Error');
      console.error('Error uploading image:', error);
    }

  };

  const camera = useRef(null);
  const device = useCameraDevice('back', [
    { videoResolution: 'max' },
    { photoResolution: 'max' },
  ]);

  const format = useCameraFormat(device, Templates.Snapchat);
  const fps = format.maxFps >= 240 ? 240 : format.maxFps;

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  console.log(hasPermission);
  console.log(newPhoto);
  // console.log(device);

  if (device == null) {
    return <Text className="text-black">Camera Not Found</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center">
      {newPhoto ? (
        <>
          <Image
            source={{ uri: `file://${newPhoto.path}` }}
            style={StyleSheet.absoluteFill}
          />
          <View className="absolute bottom-14 flex flex-row gap-3 justify-around w-full">
            <Pressable
              onPress={RemovePhoto}
              className="bg-red-600 py-3 px-4 rounded-md">
              <Text className="font-medium text-white text-lg">
                Remove Photo
              </Text>
            </Pressable>
            <Pressable
              onPress={uploadPhoto}
              className="bg-teal-600 py-3 px-4 rounded-md">
              <Text className="font-medium  text-white text-lg">
                Upload Photo
              </Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            format={format}
            fps={fps}
            isActive={isActive}
            photo={true}
            ref={camera}
          // {...cameraProps}
          />
          <Pressable
            onPress={() => TakeAphoto()}
            className="absolute bottom-14 w-20 h-20 bg-transparent rounded-full border-[6px] border-white"
          />
        </>
      )}
    </View>
  );
};

export default CameraScreen;
