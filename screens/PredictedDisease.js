import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PredictedDisease = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const testData = route.params.testData;

    // Function to navigate based on the selected disease
    const navigateToTestForm = (disease) => {
        switch (disease) {
            case 'Iron-deficiency-Anemia-Folate-Deficiency-Anemia':
                navigation.navigate('AnemiaTests');
                break;
            case 'Vitamine-B12-Deficiency-Anemia':
                navigation.navigate('AnemiaTests');
                break;
            case 'Diabetes':
                navigation.navigate('DiabetesTests');
                break;
            case 'Hyperparathyroidism':
                navigation.navigate('HyperparathyroidismTests');
                break;
            case 'Pneumonia':
                navigation.navigate('DiabetesTests');
                break;
            case 'Effusion':
                navigation.navigate('HyperparathyroidismTests');
                break;
            default:
                console.log('No specific test component available for this disease');
                break;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: "https://file.rendit.io/n/QsjuK5hqblFCMcoK4L1l.png" }}
                    style={styles.logo}
                />
                <Text style={styles.logoText}>DiagnosysAI</Text>
            </View>

            <View style={styles.predictedDiseaseContainer}>
                <Text style={styles.predictedDiseaseText}>Predicted Disease</Text>
                <View style={styles.separatorContainer}>
                    <View style={styles.separator} />
                    <Image
                        source={{ uri: "https://file.rendit.io/n/tuE571NLt56SGsMC6Xm0.png" }}
                        style={styles.decoration}
                    />
                    <View style={styles.separator} />
                </View>
                <Text style={styles.suspectedDiseases}>Suspected Diseases</Text>
            </View>

            {testData.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.diseaseButton}
                    onPress={() => navigateToTestForm(item.disease)}
                >
                    <Text style={styles.diseaseButtonText}>{item.disease}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        paddingTop: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 48,
        height: 48,
    },
    logoText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#0cb8b6',
        marginTop: 8,
    },
    predictedDiseaseContainer: {
        width: '90%',
        borderRadius: 36,
        padding: 16,
        backgroundColor: '#ecf2f3',
        alignItems: 'center',
        marginTop: 20,
    },
    predictedDiseaseText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    separator: {
        backgroundColor: '#0cb8b6',
        height: 1,
        width: 40,
    },
    decoration: {
        width: 16,
        height: 16,
        marginHorizontal: 8,
    },
    suspectedDiseases: {
        fontSize: 16,
        color: '#666',
    },
    diseaseButton: {
        marginTop: 12,
        backgroundColor: '#32a852',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        width: '90%',
        alignItems: 'center',
    },
    diseaseButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default PredictedDisease;
