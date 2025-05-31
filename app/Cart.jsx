// screens/CartScreen.js
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CartItemCard from '../components/CartItemCard';
import { CartContext } from '../context/CartContext';

function CartScreen() {
  const { cartItems, getCartTotal, updateItemQuantity, removeItemFromCart, clearCart } = useContext(CartContext);
  const total = getCartTotal();
  const router = useRouter();

  const goToMenu = () => router.push('/MenuList'); 

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={100} color="#CCC" />
          <Text style={styles.emptyCartText}>Your cart is feeling lonely!</Text>
          <Text style={styles.emptyCartSubText}>Add some delicious items from the menu.</Text>
          <TouchableOpacity style={styles.shopButton} onPress={goToMenu}>
            <Text style={styles.shopButtonText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Cart</Text>
          {cartItems.length > 0 && (
             <TouchableOpacity onPress={clearCart}>
                <Text style={styles.clearCartText}>Clear All</Text>
             </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartItemCard
              item={item}
              onUpdateQuantity={updateItemQuantity}
              onRemoveItem={removeItemFromCart}
            />
          )}
          contentContainerStyle={{ paddingBottom: 160 }} // Space for total and button
        />

        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => router.push('/OrderSummary')}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
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
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  clearCartText: {
    fontSize: 14,
    color: '#FF6347', // Tomato
    fontWeight: '600',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
  },
  emptyCartSubText: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    color: '#555',
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  checkoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;