import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EXdlxmiMgcZRdxlAKXhAImage from '../screens/EXdlxmiMgcZRdxlAKXhA.png';
import BdquPp1NkV0DnvhKAdJMImage from '../screens/BdquPp1NkV0DnvhKAdJM.svg';

const predictionOutcomes = {
  2: 'Pneumonia',
  0: 'Effusion',
  1: 'No chest disease found'
};

const XrayReport = ({ route }) => {
  const navigation = useNavigation();
 
  const { predictedClass } = route.params;

  

  const outcomeMessage = predictionOutcomes[predictedClass] || 'Unknown result';
  const additionalComments = "none";

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={EXdlxmiMgcZRdxlAKXhAImage}
          style={styles.logo}
        />
        <Text style={styles.logoText}>DiagnosysAI</Text>
      </View>
      <Text style={styles.sectionHeader}>Recommended Test</Text>
      <Text style={styles.resultText}>ChestXray</Text>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Image
          source={BdquPp1NkV0DnvhKAdJMImage}
          style={styles.icon}
        />
        <View style={styles.dividerLine} />
      </View>
      <Text style={styles.sectionHeader}>Diagnosed Disease</Text>
      <Text style={styles.resultText}>{outcomeMessage}</Text>
       
      <Text style={styles.sectionHeader}>Additional Comments</Text>
      <Text style={styles.additionalComments}>{additionalComments}</Text>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0cb8b6',
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0cb8b6',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#0cb8b6',
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  xRayImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  additionalComments: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: '#0cb8b6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default XrayReport;
