import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const DiabetesTests = () => {
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        Glucose: '',
        Hemo: '',
        Fast: ''
    });

    useEffect(() => {
        const loadData = async () => {
            const storedGender = await AsyncStorage.getItem('gender');
            const storedAge = await AsyncStorage.getItem('age');
            setFormData(prevData => ({
                ...prevData,
                gender: storedGender || '',
                age: storedAge || ''
            }));
        };

        loadData();
    }, []);

    const handleChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.Glucose.trim() || isNaN(Number(formData.Glucose)) ||
            !formData.Hemo.trim() || isNaN(Number(formData.Hemo)) ||
            !formData.Fast.trim() || isNaN(Number(formData.Fast))) {
            Alert.alert("Validation Error", "Please fill in all fields with valid numeric values.");
            return;
        }
    
        // Prepare the payload with numeric conversion
        const payload = {
            ...formData,
            gender: formData.gender === 'male' ? '0' : '1',
            Glucose: parseFloat(formData.Glucose),
            Hemo: parseFloat(formData.Hemo),
            Fast: parseFloat(formData.Fast)
        };
    
        try {
            const response = await fetch('https://e3b0-58-65-135-186.ngrok-free.app/predict/diabetes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const responseData = await response.json();
    
            if (response.ok) {
                navigation.navigate('DiagnosisReport', {
                    testData: { prediction: responseData.prediction, disease: 'Diabetes' },
                    formData: payload
                });
            } else {
                throw new Error(responseData.error || "Unknown error from API");
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            Alert.alert("API Error", error.message || "Failed to submit data");
        }
    };
    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Enter Diabetes Test Report</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('Glucose', text)}
                value={formData.Glucose}
                placeholder="Enter Glucose Level"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('Hemo', text)}
                value={formData.Hemo}
                placeholder="Enter % Hemoglobin A1c"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('Fast', text)}
                value={formData.Fast}
                placeholder="Enter Fasting Blood Glucose HbA1c"
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
        flexGrow: 1,
        alignItems: 'center',
        padding: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#0cb8b6',
        padding: 10,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white'
    }
});

export default DiabetesTests;
