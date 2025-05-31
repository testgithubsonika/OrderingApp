// components/MenuItemCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  imageMap  from '../assets/imageitems/imageMap'; // Assuming you have an imageMap file that exports your images 
// import { useLocalSearchParams } from 'expo-router';

// This component displays a card for each menu item with an image, name, description, price, and an "Add to Cart" button.
const MenuItemCard = ({ item, onAddToCart }) => {
  // We'll assume the 'item' prop now includes an 'imageKey' (e.g., item.imageKey = 'pizza_pepperoni')
  // For robustness, let's assume 'item.imageKey' is passed.
  // Get the image source from the imported imageMap, with a fallback
  const imageSource = imageMap[item.imageKey] || imageMap.placeholder_food;

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
        <Ionicons name="add-circle" size={38} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347', // Tomato color for price
  },
  addButton: {
    paddingLeft: 10,
  },
});

export default MenuItemCard;