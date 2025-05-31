// screens/OrderConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import useRouter

export default function OrderConfirmationScreen() {
  const router = useRouter(); // Use router instead of navigation

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Ionicons name="checkmark-circle" size={120} color="#28A745" />
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.message}>
          Thank you for your order. You can track its status in your order history (feature coming soon!).
        </Text>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace('MenuList')} // Go to root/home screen
        >
          <Text style={styles.homeButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 25,
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  homeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});