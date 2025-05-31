// screens/MenuListScreen.js
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import imageMap from '../assets/imageitems/imageMap';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingIndicator from '../components/LoadingIndicator';
import MenuItemCard from '../components/MenuItemCard';
import { CartContext } from '../context/CartContext';
import { db } from '../firebase';

function MenuListScreen() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { addItemToCart, getCartItemCount } = useContext(CartContext);
  const cartItemCount = getCartItemCount();
  const router = useRouter();

  const categories = [
    { name: 'All', icon: '✨' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Sushi', icon: '🍣' },
    { name: 'Desserts', icon: '🍰' },
    { name: 'Salads', icon: '🥗' },
    { name: 'Pasta', icon: '🍝' },
    { name: 'Beverages', icon: '🥤' },
    { name: 'Indian', icon: '🍛' },
    { name: 'Appetizers', icon: '🍟' },
    { name: 'Soups', icon: '🥣' },
    { name: 'Seafood', icon: '🦞' },
    { name: 'Chicken Dishes', icon: '🍗' },
    { name: 'Vegetarian Entrees', icon: '🥦' },
    { name: 'Italian', icon: '🇮🇹' },
  ];

  const fetchMenuItems = () => {
    setLoading(true);
    setError(null);
    const menuCollection = collection(db, 'menuItems');
    const unsubscribe = onSnapshot(menuCollection, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setMenuItems(items);
      setLoading(false);
    }, (err) => {
      console.error("Firebase fetch error: ", err);
      setError("Failed to fetch menu items. Please check your connection.");
      setLoading(false);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchMenuItems();
    return () => unsubscribe();
  }, []);

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <LoadingIndicator message="Fetching delicious items..." />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchMenuItems} />;
  }

  const handleAddToCart = (item) => {
    addItemToCart(item);
    console.log(`${item.name} added to cart`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Ionicons name="fast-food-outline" size={30} color="#FF6347" style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Foodie App</Text>
        <TouchableOpacity style={styles.userIcon}>
          <Ionicons name="person-circle-outline" size={32} color="#FF6347" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesScrollView}
          contentContainerStyle={{ paddingVertical: 0 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text style={styles.categoryEmoji}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.name && styles.selectedCategoryButtonText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.popularTitle}>Popular Near You</Text>
      </View>

      <View style={styles.container}>
        {filteredMenuItems.length === 0 && !loading && (
          <View style={styles.emptyMenuContainer}>
            <Ionicons name="fast-food-outline" size={80} color="#CCC" />
            <Text style={styles.emptyMenuText}>No items found for your search/category.</Text>
            <Text style={styles.emptyMenuSubText}>Try adjusting your filters!</Text>
          </View>
        )}
        <FlatList
          data={filteredMenuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuItemCard
              item={item}
              onAddToCart={() => handleAddToCart(item)}
              imageMap={imageMap}
            />
          )
          }
          contentContainerStyle={styles.listContentContainer}
        />
        {cartItemCount > 0 && (
          <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/Cart')}>
            <Ionicons name="cart" size={28} color="#fff" />
            <Text style={styles.cartButtonText}>View Cart ({cartItemCount})</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 'auto',
  },
  userIcon: {
    padding: 5,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  categoriesSection: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  popularTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 0, // No gap above this title
  },
  categoriesScrollView: {
    paddingHorizontal: 10,
    marginBottom: 0,
    paddingBottom: 0,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCategoryButton: {
    backgroundColor: '#FF6347',
  },
  categoryEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginTop: 5,
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  container: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FF6347',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  emptyMenuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyMenuText: {
    fontSize: 20,
    color: '#777',
    marginTop: 20,
    textAlign: 'center',
  },
  emptyMenuSubText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default MenuListScreen;