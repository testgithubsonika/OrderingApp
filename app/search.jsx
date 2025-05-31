
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import imageMap from '../assets/imageitems/imageMap'; // Import your image map

// Placeholder search results data
const allFoodItems = [
  {
    id: 's1',
    name: 'Spicy Chicken Pizza',
    restaurant: 'Pizza Palace',
    rating: 4.3,
    price: '$13.50',
    imageKey: 'pizza_spicy', // Use imageKey
  },
  {
    id: 's2',
    name: 'Veggie Burger Deluxe',
    restaurant: 'Green Bites',
    rating: 4.6,
    price: '$10.00',
    imageKey: 'burger_veggie', // Use imageKey
  },
  {
    id: 's3',
    name: 'Chicken Biryani',
    restaurant: 'Spice Route',
    rating: 4.9,
    price: '$15.00',
    imageKey: 'biryani_chicken', // Use imageKey
  },
  {
    id: 's4',
    name: 'Margherita Pizza',
    restaurant: 'Italian Oven',
    rating: 4.0,
    price: '$11.00',
    imageKey: 'pizza_margherita', // Use imageKey
  },
  {
    id: 's5',
    name: 'Double Cheeseburger',
    restaurant: 'Burger Joint',
    rating: 4.7,
    price: '$11.50',
    imageKey: 'burger_cheeseburger', // Use imageKey
  },
];

export default function SearchScreen() {
  const { query } = useLocalSearchParams();
  const [searchText, setSearchText] = useState(query || '');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchText) {
      const filteredResults = allFoodItems.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.restaurant.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  const handleSearch = () => {
    console.log('Performing search for:', searchText);
  };

  const renderSearchResultItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() =>
        router.push({
          pathname: '/details',
          params: {
            itemId: item.id,
            itemName: item.name,
            itemPrice: item.price,
            itemImageKey: item.imageKey, // Pass the imageKey
          },
        })
      }
    >
      {/* Use imageMap to get the source */}
      <Image
        source={imageMap[item.imageKey] || imageMap.placeholder_food}
        style={styles.resultImage}
      />
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultRestaurant}>{item.restaurant}</Text>
        <Text style={styles.resultRating}>⭐ {item.rating}</Text>
        <Text style={styles.resultPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Search Food</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food or restaurants..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchIconContainer} onPress={handleSearch}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResultItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
        />
      ) : (
        <Text style={styles.noResultsText}>
          {searchText ? `No results for "${searchText}"` : 'Start typing to search...'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  backButtonText: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  searchIconContainer: {
    padding: 5,
  },
  searchIcon: {
    fontSize: 20,
    color: '#888',
  },
  resultsList: {
    paddingBottom: 20,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    overflow: 'hidden',
  },
  resultImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  resultInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  resultName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  resultRestaurant: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  resultRating: {
    fontSize: 14,
    color: '#FFA500',
    marginBottom: 5,
  },
  resultPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00AA00',
  },
  noResultsText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
});
