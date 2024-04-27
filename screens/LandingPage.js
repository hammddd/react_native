// Import React Native components and hooks
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function LandingPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://file.rendit.io/n/HhNKTKVWPskIFlAmZwFe.png" }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>DiagnosysAI</Text>
      <Text style={styles.subtitle}>Your Best Medical Assistant</Text>
      <Text style={styles.description}>
        ML based disease prediction system
      </Text>
      {/* Place for interactive elements like buttons */}
    </ScrollView>
  );
}

// Define your styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: '80%',
    height: 200,
  },
  title: {
    color: '#0cb8b6',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 4,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  description: {
    marginTop: 1,
    textAlign: 'center',
  },
});
