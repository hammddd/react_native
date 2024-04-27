import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Intro() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          {/* Implement IconHello with React Native SVG if needed */}
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.brandingSection}>
        <Image
          source={{ uri: "https://file.rendit.io/n/HhNKTKVWPskIFlAmZwFe.png" }}
          style={styles.logo}
        />
        <Text style={styles.title}>DiagnosysAI</Text>
      </View>

      <View style={styles.mainImageSection}>
        <Image
          source={{ uri: "https://www.reshot.com/preview-assets/illustrations/VAZ9BMYX6U/female-doctor-VAZ9BMYX6U-w600.jpg" }}
          style={styles.mainImage}
        />
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.subtitle}>Your Best Medical Assistant</Text>
        <Text style={styles.description}>ML based disease prediction system.</Text>
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('MyDetails')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}


// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    padding: 10,
    maxWidth: 300,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  skipButton: {
    color: '#007bff',
    fontSize: 16,
  },
  brandingSection: {
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  mainImageSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  mainImage: {
    width: 200,
    height: 200,
  },
  descriptionSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#008080',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
