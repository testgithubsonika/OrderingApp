// components/ErrorDisplay.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ErrorDisplay = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={60} color="red" />
      <Text style={styles.errorText}>Oops! Something went wrong.</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && <Button title="Try Again" onPress={onRetry} color="#FF6347" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  }
});

export default ErrorDisplay;