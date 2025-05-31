// components/CartItemCard.js
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import imageMap from '../assets/imageitems/imageMap';

const CartItemCard = ({ item, onUpdateQuantity, onRemoveItem }) => {
  // Use imageMap for local images, fallback to placeholder_food
  const imageSource = imageMap[item.imageKey] || imageMap.placeholder_food;

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.pricePerItem}>${item.price.toFixed(2)} each</Text>
        <Text style={styles.itemTotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={() => onUpdateQuantity(item.id, item.quantity - 1)} style={styles.controlButton}>
          <Ionicons name="remove-circle-outline" size={28} color="#FF6347" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => onUpdateQuantity(item.id, item.quantity + 1)} style={styles.controlButton}>
          <Ionicons name="add-circle-outline" size={28} color="#FF6347" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onRemoveItem(item.id)} style={styles.removeButton}>
        <Ionicons name="trash-outline" size={24} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  pricePerItem: {
    fontSize: 13,
    color: '#777',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  controlButton: {
    padding: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 5,
  }
});

export default CartItemCard;