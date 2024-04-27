import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function ChestXRayComponent() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);   

    // useEffect(() => {
    //     (async () => {
    //         if (Platform.OS !== 'web') {
    //             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Sorry, we need camera roll permissions to make this work!');
    //             }
    //         }
    //     })();
    // }, []);

    const selectFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("result: "+ result.assets[0]);

        if (!result.cancelled) {
            setImage(result.assets[0]);
        }
    };

    useEffect(() => {
        if (image) {
            console.log('Selected image:::', image.uri);
        }
    }, [image]); // Dependency array to run effect when `image` changes
    

    const handleSubmit = async () => {
        if (!image) {
            Alert.alert("Please select an image before submitting.");
            return;
        }

        // Convert Base64 to blob if necessary
    const uri = image.uri;
    let blob;
    if (uri.startsWith('data:')) {
        // Convert Base64 to blob
        const fetchResponse = await fetch(uri);
        blob = await fetchResponse.blob();
    } else {
     
        blob = {
            uri: image.uri,
            type: image.type,
            name: "temp_image.jpeg",
        };
    }

    const formData = new FormData();
    formData.append('file', blob);
        
    console.log("Formdata: " + formData)

       

        try {
            const response = await fetch('https://e3b0-58-65-135-186.ngrok-free.app/predict/chest-xray', {
                method: 'POST',
                body: formData,
                headers: {
                  //  'Content-Type': 'multipart/form-data; ',
                },
            });

            const responseData = await response.json();
            const predictedClass = responseData.predicted_class;
            console.log("this is response data",responseData);
            console.log("this is disease class",responseData.predicted_class);
            if (!response.ok) {
               
                throw new Error('Failed to upload image');
            }
            console.log("response: "+ response)
            if (response.status === 402) {
                Alert.alert("Invalid Image", "The uploaded image is not recognized as a chest X-ray.");
                return; // Stop further processing since the image is invalid
            }
            

            navigation.navigate('XrayReport', {
                predictedClass: predictedClass
                
            });
    
        } catch (error) {
            console.error('Error submitting file:', error);
            Alert.alert("Error", "Failed to upload image");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Chest X-Ray Analysis</Text>
            <TouchableOpacity style={styles.button} onPress={selectFile}>
                <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!image}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 22,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0cb8b6',
        padding: 10,
        margin: 10,
        width: 200,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
