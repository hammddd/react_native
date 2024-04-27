import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DiagnosisReport = () => {
    const route = useRoute();
    const { testData, formData } = route.params || {};

    console.log("Received testData:", testData);
    console.log("Received formData:", formData);

    const resultMessages = {
        Anemia: {
            messages: {
                8: 'You have Folate Deficiency Anemia.',
                9: 'You do not have Folate Deficiency Anemia.',
                7: 'You have B12 Deficiency Anemia.',
                16: 'You do not have B12 Deficiency Anemia.',
                6: 'You have Iron Deficiency Anemia.',
                17: 'You do not have Iron Deficiency Anemia.',
            },
            
            additionalComments: "None"
        },
        Diabetes: {
          messages: {
              3: 'You have Diabetes.',
              11: 'You do not have Diabetes.',
          },
          additionalComments: "None"
      },
      Hyperparathyroidism: {
          messages: {
              2: 'You have Hyperparathyroidism.',
              10: 'You do not have Hyperparathyroidism.',
          },
          additionalComments: "None"
      }

         
    };

    // Assuming testData contains the disease type and its corresponding prediction number
    const diseaseType = testData?.disease || "Unknown"; // Default to "Unknown" if not specified
    const predictionNumber = testData?.prediction?.[0]; // Should be an integer
    console.log("Disease Type:", diseaseType);
    console.log("Prediction Number:", predictionNumber);

    const diseaseInfo = resultMessages[diseaseType] || { messages: {}, additionalComments: "No data for this disease" };
    const diagnosisMessage = diseaseInfo.messages[predictionNumber] || 'No specific diagnosis available';

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: "https://file.rendit.io/n/QsjuK5hqblFCMcoK4L1l.png" }} style={styles.logo} />
                <Text style={styles.title}>DiagnosysAI</Text>
            </View>

            <Text style={styles.heading}>Diagnosis Report</Text>
            <Text style={styles.diagnosisResult}>{diagnosisMessage}</Text>

            <View style={styles.reportContainer}>
                {formData && Object.entries(formData).map(([key, value], index) => (
                    <View key={index} style={styles.reportItem}>
                        <Text style={styles.parameter}>{key}</Text>
                        <Text style={styles.value}>{value.toString()}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

 

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f6f6f6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 48,
        height: 48,
    },
    title: {
        color: '#0cb8b6',
        fontWeight: 'bold',
        fontSize: 18,
    },
    heading: {
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },
    diagnosisResult: {
        fontSize: 16,
        color: '#FF6347',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    reportContainer: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 8,
    },
    reportItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingVertical: 8,
    },
    parameter: {
        color: '#424242',
    },
    value: {
        color: '#424242',
    },
});

export default DiagnosisReport;
