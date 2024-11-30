import React, { useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, ImageSourcePropType, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImageSelectorProps {
    image: string | null;
    setImage: (uri: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ image, setImage }) => {
    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
            const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
                Alert.alert('Permission required', 'Camera and media library access are required for this app.');
            }
        })();
    }, []);

    const showImageOptions = () => {
        Alert.alert(
            'Select Image',
            'Choose an option',
            [
                {
                    text: 'Take Photo',
                    onPress: takePhoto,
                },
                {
                    text: 'Choose from Gallery',
                    onPress: pickImage,
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    const takePhoto = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Alert.alert('Error', 'Failed to take photo. Please try again.');
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    return (
        <TouchableOpacity style={styles.placeholder} onPress={showImageOptions}>
            <Image
                source={
                    image ? { uri: image } : (require('../assets/placeholder.png') as ImageSourcePropType)
                }
                style={styles.image}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    placeholder: {
        width: 150,
        height: 150,
        backgroundColor: '#ddd',
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
});

export default ImageSelector;
