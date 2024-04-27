import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialDetails = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  // Function to store data
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('age', age);
      await AsyncStorage.setItem('gender', gender);
      // Navigate to the SymptomsForm screen upon successful storage
      navigation.navigate('SymptomsForm');
    } catch (error) {
      // Error saving data
      Alert.alert("Error", "Failed to save data");
    }
  };

  const submitForm = () => {
    // Check if age or gender is empty
    if (!age.trim() || !gender.trim()) {
      Alert.alert("Missing Information", "Please fill all fields");
      return; // Stop the function if any field is empty
    }
    
    console.log({ age, gender });
    // Store data when form is submitted
    storeData();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>DiagnosysAI</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Enter your age:</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>Gender:</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'male' && styles.selectedGender]}
          onPress={() => setGender('male')}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'female' && styles.selectedGender]}
          onPress={() => setGender('female')}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={submitForm} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0cb8b6',
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  genderOption: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  selectedGender: {
    backgroundColor: '#0cb8b6',
    borderColor: '#0cb8b6',
  },
  genderText: {
    fontSize: 16,
    color: '#424242',
  },
  nextButton: {
    backgroundColor: '#32a852',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default InitialDetails;
