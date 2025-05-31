// components/LoadingIndicator.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const LoadingIndicator = ({ message = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF6347" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  }
});

export default LoadingIndicator;