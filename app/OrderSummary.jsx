// screens/OrderSummaryScreen.js
import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartContext } from '../context/CartContext';
import { db } from '../firebase';

function OrderSummaryScreen() {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const total = getCartTotal();
  const router = useRouter();

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Your cart is empty. Please add items before placing an order.");
      return;
    }
    setIsSubmitting(true);

    const orderData = {
      items: cartItems.map(item => ({
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageKey: item.imageKey || '', // Make sure each item has an 'imageKey' property
      })),
      totalPrice: total,
      status: 'Pending',
      createdAt: serverTimestamp(),
      // userEmail: auth.currentUser ? auth.currentUser.email : 'guest',
    };

    try {
      const ordersCollection = collection(db, 'orders');
      await addDoc(ordersCollection, orderData);

      setIsSubmitting(false);
      clearCart();
      router.push('/OrderConfirmation');
    } catch (error) {
      console.error("Error placing order: ", error);
      setIsSubmitting(false);
      Alert.alert('Order Failed', 'There was an issue placing your order. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Confirm Your Order</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Items</Text>
          {cartItems.map(item => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>x {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.summaryTotal}>
            <Text style={styles.summaryTotalText}>Total:</Text>
            <Text style={styles.summaryTotalPrice}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.card}>
            <Text style={styles.cardTitle}>Delivery Details</Text>
            <Text style={styles.placeholderText}>No delivery details needed for this demo.</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmButton, isSubmitting && styles.disabledButton]}
          onPress={handlePlaceOrder}
          disabled={isSubmitting || cartItems.length === 0}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.confirmButtonText}>Place Order & Pay ${total.toFixed(2)}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 8,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  itemQuantity: {
    fontSize: 13,
    color: '#777',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  summaryTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryTotalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  placeholderText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 10,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: '#28A745',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderSummaryScreen;