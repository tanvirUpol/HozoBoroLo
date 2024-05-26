import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    Camera,
    Templates,
    useCameraDevice,
    useCameraFormat,
    useCameraPermission,
    useCodeScanner,
} from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';

const ScannerScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const [newCode, setNewCode] = useState(null);
    const isFocused = useIsFocused();
    const isActive = isFocused;

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13', 'code-128'],
        onCodeScanned: (codes, frame) => {
            // console.log(codes[0]);
            // console.log('Top corner', codes[0].frame[3]);
            // console.log('bottom corner', codes[0].frame[1]);

            console.log(codes[0]);

            console.log();

            if ((codes[0].frame.x >= 440)) {
                console.log(codes[0].value);
                setNewCode(codes[0].value);
            }
            // console.log(`Scanned ${codes.length} codes!`);
        },
    });

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission, requestPermission]);

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
    console.log(newCode);
    // console.log(device);

    if (device == null) {
        return <Text className="text-black">Camera Not Found</Text>;
    }

    return (
        // </View>
        <View className="flex-1 items-center justify-center">
            <>
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    format={format}
                    fps={fps}
                    isActive={isActive}
                    codeScanner={codeScanner}
                />
                {newCode && (
                    <Text className="absolute top-14 bg-white px-3 py-2 text-black rounded-md font-medium text-lg">
                        {newCode}
                    </Text>
                )}
            </>
        </View>
    );
};

export default ScannerScreen;
