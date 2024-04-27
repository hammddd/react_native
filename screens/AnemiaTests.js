import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AnemiaTests = () => {
    const navigation = useNavigation();

    // Initialize state with empty defaults
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        Fo: "",
        Ir: "",
        IBC: "",
        MCH: "",
        Ferr: "",
        RBC: "",
        VB12: "",
        MCV: "",
        Hg: ""
    });

    useEffect(() => {
        const fetchStorageData = async () => {
            const gender = await AsyncStorage.getItem('gender');
            const age = await AsyncStorage.getItem('age');
            setFormData(prevState => ({
                ...prevState,
                gender: gender === 'male' ? '0' : '1', // Convert gender to '0' or '1' when loading from storage
                age: age || ''
            }));
        };

        fetchStorageData();
    }, []);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        const payload = {
            ...formData,
            gender: formData.gender === 'male' ? '0' : '1' // Make sure gender is formatted correctly
        };

        try {
            const response = await fetch('https://e3b0-58-65-135-186.ngrok-free.app/predict/anemia', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const responseData = await response.json();
            if (responseData.error) {
                console.error('Backend Error:', responseData.error);
                return; // Handle error appropriately
            }

            // Assuming you have a screen named 'DiagnosisResult' in your navigator
            console.log("this is form data ",formData);

            navigation.navigate('DiagnosisReport', {
                testData: { prediction: [responseData.prediction], disease: 'Anemia' },
                formData: formData
            });
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Enter Iron/Folate Anemia Test Report</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('Ir', text)}
                value={formData.Ir}
                placeholder="Enter Iron Level (Ir)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('Fo', text)}
                value={formData.Fo}
                placeholder="Enter Folate Level (Fo)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('Ferr', text)}
                value={formData.Ferr}
                placeholder="Enter Ferritin Level (Ferr)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('IBC', text)}
                value={formData.IBC}
                placeholder="Enter Iron Binding Capacity (IBC)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('MCH', text)}
                value={formData.MCH}
                placeholder="Enter Mean Corpuscular Hemoglobin (MCH)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('RBC', text)}
                value={formData.RBC}
                placeholder="Enter Red Blood Cell count (RBC)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('VB12', text)}
                value={formData.VB12}
                placeholder="Enter Vitamin B12 Level (VB12)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('MCV', text)}
                value={formData.MCV}
                placeholder="Enter Mean Corpuscular Volume (MCV)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('Hg', text)}
                value={formData.Hg}
                placeholder="Enter Hemoglobin Level (Hg)"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 10,
        borderWidth: 1,
        padding: 10
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
});

export default AnemiaTests;
