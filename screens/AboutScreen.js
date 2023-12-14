
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About SkySage</Text>
      <Text style={styles.description}>
        SkySage is a weather application that provides current weather conditions, forecasts, and allows you to save your favorite locations.
      </Text>
      <Text style={styles.team}>
        Developed by the SkySage Team
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  team: {
    fontSize: 14,
    color: '#555',
  },
});

export default AboutScreen;
