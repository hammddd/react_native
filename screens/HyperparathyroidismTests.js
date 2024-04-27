import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HyperparathyroidismTests = () => {
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        VitD: '',
        Cal: '',
        PTH: '',
        Ph: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const storedGender = await AsyncStorage.getItem('gender');
            const storedAge = await AsyncStorage.getItem('age');
            setFormData({
                ...formData,
                gender: storedGender || '',
                age: storedAge || ''
            });
        };

        fetchData();
    }, []);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        // Validate input fields
        if (!formData.VitD.trim() || isNaN(formData.VitD) ||
            !formData.Cal.trim() || isNaN(formData.Cal) ||
            !formData.PTH.trim() || isNaN(formData.PTH) ||
            !formData.Ph.trim() || isNaN(formData.Ph)) {
            Alert.alert("Validation Error", "Please fill in all fields with valid numeric values.");
            return;
        }

        const payload = {
            ...formData,
            gender: formData.gender === 'male' ? '0' : '1'
        };

        try {
            const response = await fetch('https://e3b0-58-65-135-186.ngrok-free.app/predict/hyperparathyroidism', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const responseData = await response.json();
            navigation.navigate('DiagnosisReport', {
                testData: { prediction: [responseData.prediction], disease: 'Hyperparathyroidism' },
                formData: formData
            });
            
        } catch (error) {
            console.error('Error submitting data:', error);
            Alert.alert("Server Error", "Failed to submit data.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Enter Hyperparathyroidism Test Report</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('VitD', text)}
                value={formData.VitD}
                placeholder="Vitamin D (ng/ml)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('Cal', text)}
                value={formData.Cal}
                placeholder="Calcium (mg/dl)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('PTH', text)}
                value={formData.PTH}
                placeholder="PTH (pg/mL)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('Ph', text)}
                value={formData.Ph}
                placeholder="Phosphorus (mg/dl)"
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    header: {
        fontSize: 18,
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
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white'
    }
});

export default HyperparathyroidismTests;
