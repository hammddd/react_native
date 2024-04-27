import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecommendedTests = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const testData = route.params.testData;

    const [gender, setGender] = useState('');

    useEffect(() => {
        const fetchGender = async () => {
            const storedGender = await AsyncStorage.getItem('gender');
            setGender(storedGender);
        };

        fetchGender();
    }, []);

    const diseaseMapping = {
        0: 'Postpartum-Depression',
        1: 'Hyperparathyroidism',
        2: 'Diabetes',
        3: 'Pneumonia',
        4: 'Effusion',
        5: 'Iron-deficiency-Anemia-Folate-Deficiency-Anemia',
        6: 'Vitamine-B12-Deficiency-Anemia',
        7: 'No finding'
    };

    const testMapping = {
        'Hyperparathyroidism': ["Parathormone Levels Test", "Calcium and Phosphate Levels Test"],
        'Diabetes': ["HbA1c Test", "Fasting Blood Glucose Test", "Random Blood Sugar Test"],
        'Iron-deficiency-Anemia-Folate-Deficiency-Anemia': ["Iron Profile Test", "Vitamin B12 Test", "Folate Level Test"],
        'Vitamine-B12-Deficiency-Anemia': ["Vitamin B12 Test"],
        'Pneumonia': ["Chest X-ray"],
        'Effusion': ["Chest X-ray"],
        'No finding': ["No tests recommended"],
        'Postpartum-Depression': ["No tests recommended"]
    };

    const probabilities = testData?.predicted_test_group_probabilities[0] || [];
    let suspectedDiseases = probabilities
        .map((prob, index) => ({ disease: diseaseMapping[index], probability: prob }))
        .filter(disease => disease.probability < 0 && disease.probability > -2);

    if (suspectedDiseases.some(disease => disease.disease !== 'No finding')) {
        suspectedDiseases = suspectedDiseases.filter(disease => disease.disease !== 'No finding');
    }

    if (gender === 'female' && probabilities[0] === 0) {
        suspectedDiseases = [{ disease: 'Postpartum-Depression', tests: testMapping['Postpartum-Depression'] }];
    }

    const handleProceed = () => {
        // Navigate only if there is a disease other than 'No finding' or 'Postpartum-Depression'
        if (suspectedDiseases.length > 0 && !(suspectedDiseases.length === 1 && suspectedDiseases[0].disease === 'Postpartum-Depression')) {
            navigation.navigate('PredictedDisease', {testData: suspectedDiseases });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Recommended Tests</Text>
            {suspectedDiseases.length > 0 ? (
                suspectedDiseases.map((item, index) => (
                    <View key={index} style={styles.testSection}>
                        <Text style={styles.subTitle}>Suspected Disease:</Text>
                        <Text style={styles.diseaseName}>{item.disease}</Text>
                        <Text style={styles.subTitle}>Recommended Tests:</Text>
                        {testMapping[item.disease].map((test, idx) => (
                            <Text key={idx} style={styles.testName}>{test}</Text>
                        ))}
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>No significant test recommendations available.</Text>
            )}
            {suspectedDiseases.length > 0 && !(suspectedDiseases.length === 1 && suspectedDiseases[0].disease === 'Postpartum-Depression') && (
                <Button title="Proceed" onPress={handleProceed} color="#32a852" />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0cb8b6',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 10,
        marginBottom: 5,
    },
    testSection: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    diseaseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    testName: {
        fontSize: 16,
        color: '#666',
        marginBottom: 3,
    },
    noDataText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
});

export default RecommendedTests;
