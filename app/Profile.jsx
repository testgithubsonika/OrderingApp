// app/details.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import imageMap from '../assets/imageitems/imageMap'; // Import your image map

export default function DetailsScreen() {
  // Get parameters, including the new itemImageKey
  const { itemId, itemName, itemPrice, itemImageKey } = useLocalSearchParams();

  // Get the image source from the map, with a fallback
  const imageSource = imageMap[itemImageKey] || imageMap.placeholder_food;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{itemName || 'Item Details'}</Text>

      <Image source={imageSource} style={styles.itemImage} />

      {itemId && <Text style={styles.detailText}>ID: {itemId}</Text>}
      {itemPrice && <Text style={styles.detailText}>Price: {itemPrice}</Text>}

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => {
          console.log(`Added ${itemName} to cart!`);
          // In a real app, you'd add the item to the cart context here
        }}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  backButton: {
    position: 'absolute', // Position absolutely for better UI
    top: 50, // Adjust based on safe area
    left: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
    zIndex: 1, // Ensure it's above other content
  },
  backButtonText: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    marginTop: 80, // Make space for back button
  },
  itemImage: {
    width: '90%', // Make image responsive
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'cover', // Cover the area, cropping if necessary
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  cartButton: {
    marginTop: 30,
    backgroundColor: '#00AA00',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
