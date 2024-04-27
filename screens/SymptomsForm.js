
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,  FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from  '@react-native-picker/picker';

// List of possible symptoms for the user to select from
const symptomsList = [
  'Tiredness / Fatigue', 'Lack of Energy', 'Shortness of Breath', 'Palpitation / Noticeable Heartbeat',
  'Pale Skin', 'Numbness or Tingling', 'Sore Red Tongue', 'Muscle Weakness', 
  'Vision Problem, Have Blurry Vision', 'Anxiety / Depression', 'Memory Problem', 
  'Bone Pain or Muscle Pain or Joint Pain', 'Frequent Increased Urination', 
  'Increase Thirst', 'Tummy / Abdominal Pain', 'Constipation', 'History of Fractures', 
  'Weight Loss Without Trying', 'Feel Very Hungry', 'Have Very Dry Skin', 
  'Have Sores That Heal Slowly', 'Have More Infections Than Usual', 'Cough (Dry)', 
  'Orthopnea', 'Reduced Chest Movement During Breathing', 'Decreased Breath Sounds on One Side of the Chest', 
  'Fever with Rigors and Chills', 'Cough (Productive)', 'Chest Pain', 'Depressed Mood or Severe Mood Swings', 
  'Difficulty Bonding with Your Baby', 'Withdrawing from Family and Friends', 
  'Inability to Sleep or Called Insomnia or Sleeping Too Much', 'Intense Irritability and Anger', 
  'Reduced Ability to Think Clearly or Concentrate or Make Decisions', 'Restlessness', 
  'Thoughts of Harming Yourself or Your Baby', 'Diarrhea', 'Uncontrollable Muscle Movements', 
  'Trouble Walking', 'Problems with Smell or Taste',
];

// Severity levels for symptoms
const severityLevels = [
  { value: '0.25', label: 'Mild' },
  { value: '0.5', label: 'Normal' },
  { value: '0.75', label: 'Severe' },
  { value: '1', label: 'Very Severe' }
];

export default function SymptomsForm() {
  const [symptom, setSymptom] = useState('');
  const [severity, setSeverity] = useState('');
  const [symptomsListFiltered, setSymptomsListFiltered] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const navigation = useNavigation();

  const handleSymptomChange = (text) => {
    setSymptom(text);
    if (text) {
      setSymptomsListFiltered(symptomsList.filter(item =>
        item.toLowerCase().includes(text.toLowerCase())
      ));
    } else {
      setSymptomsListFiltered([]);
    }
  };

  const addSymptom = () => {
    if (!symptom || !severity) {
      Alert.alert("Error", "Please complete all fields before adding a symptom.");
      return;
    }
  
    // Check if the symptom exists in symptomsList
    if (!symptomsList.includes(symptom)) {
      Alert.alert("Error", "This symptom does not exist.");
      return;
    }
  
    // Check if the symptom already exists in selectedSymptoms array
    const existingSymptomIndex = selectedSymptoms.findIndex(item => item.symptom === symptom);
  
    if (existingSymptomIndex >= 0) {
      // If the symptom already exists, check if the severity is different
      if (selectedSymptoms[existingSymptomIndex].severity !== severity) {
        // If the severity is different, update the existing symptom's severity
        const updatedSymptoms = [...selectedSymptoms];
        updatedSymptoms[existingSymptomIndex] = { symptom, severity };
        setSelectedSymptoms(updatedSymptoms);
      } else {
        // If the severity is the same, alert the user that the symptom has already been added with the same severity
        Alert.alert("Error", "This symptom has already been added with the same severity.");
      }
    } else {
      // If the symptom doesn't exist, add it to the list
      setSelectedSymptoms([...selectedSymptoms, { symptom, severity }]);
    }
  
    // Reset symptom and severity fields
    setSymptom('');
    setSeverity('');
  };
  
  

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
        Alert.alert("Error", "Please add at least one symptom before proceeding.");
        return;
      }
    const symptomsPayload = selectedSymptoms.reduce((acc, curr) => {
      acc[curr.symptom] = parseFloat(curr.severity);
      return acc;
    }, {});

    try {
      const response = await fetch('https://e3b0-58-65-135-186.ngrok-free.app/predict/test-recommender', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(symptomsPayload),
      });
      const responseData = await response.json();
      console.log('Backend Response:', responseData);
     // Navigate with response data
       navigation.navigate('RecommendedTests', { testData: responseData });

    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", "Failed to submit symptoms.");
    }
  };
  const removeSymptom = (indexToRemove) => {
    const updatedSymptoms = selectedSymptoms.filter((_, index) => index !== indexToRemove);
    setSelectedSymptoms(updatedSymptoms);
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Symptoms Input</Text>
      <TextInput
        style={styles.input}
        placeholder="Type to search symptoms..."
        value={symptom}
        onChangeText={handleSymptomChange}
      />
      <ScrollView style={styles.suggestions}>
        {symptom && symptomsListFiltered.map((item, index) => (
          <Text key={index} style={styles.item} onPress={() => setSymptom(item)}>{item}</Text>
        ))}
      </ScrollView>
      <Picker
        selectedValue={severity}
        style={styles.picker}
        onValueChange={(itemValue) => setSeverity(itemValue)}
>
  <Picker.Item label="Select severity" value="" />
  {severityLevels.map((level, index) => (
    <Picker.Item key={index} label={level.label} value={level.value} />
  ))}
</Picker>

      <TouchableOpacity style={styles.button} onPress={addSymptom}>
        <Text style={styles.buttonText}>Add Symptom</Text>
      </TouchableOpacity>
      <Text style={styles.listHeader}>Selected Symptoms:</Text>
{selectedSymptoms.map((item, index) => (
  <View key={index} style={styles.listItem}>
    <Text style={styles.itemText}>
      {item.symptom} - {severityLevels.find(level => level.value === item.severity)?.label}
      <TouchableOpacity onPress={() => removeSymptom(index)}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </Text>
  </View>
))}


      <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Symptoms</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  suggestions: {
    maxHeight: 150,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#32a852',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#007bff',
  },
  removeButton: {
    color: 'red', // Customize as needed
    marginLeft: 10, // Adjust spacing as needed
  }
  
});