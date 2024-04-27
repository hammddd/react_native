import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function TestForm() {
  const [inputValue, setInputValue] = React.useState("");
  const navigation = useNavigation(); // Use the useNavigation hook

  const navigateToChestXRay = () => {
    navigation.navigate('ChestXRay'); // Navigate to the ChestXRayComponent screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: "https://file.rendit.io/n/QsjuK5hqblFCMcoK4L1l.png" }} style={styles.logo} />
        <Text style={styles.title}>DiagnosysAI</Text>
        <Image source={{ uri: "https://file.rendit.io/n/YZVkDaow8ZVYp88IxvVR.svg" }} style={styles.menuIcon} />
      </View>

      <Text style={styles.heading}>Test 1</Text>
      <View style={styles.separator} />

      <TextInput
        style={styles.input}
        placeholder="John Doe"
        value={inputValue}
        onChangeText={setInputValue}
      />

      <TouchableOpacity style={styles.nextButton} onPress={navigateToChestXRay}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 48,
    height: 48,
  },
  title: {
    fontWeight: 'bold',
    color: '#0cb8b6',
    fontSize: 18,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  heading: {
    fontSize: 20,
    color: '#424242',
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
  },
  separator: {
    backgroundColor: '#0cb8b6',
    height: 2,
    width: '100%',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#32a852',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
