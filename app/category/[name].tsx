import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import MenuItemCard from '../../components/MenuItemCard';
import { db } from '../../firebase';

// 1. Define a type for your menu item
type MenuItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  // Add other fields as needed
};

export default function CategoryScreen() {
  // Get the dynamic category name from the route
  const { name } = useLocalSearchParams();
  // 2. Use the type in useState
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    setLoading(true);

    // Fetch and filter data from Firestore
    const itemsCollection = collection(db, 'menuItems');
    const q = query(itemsCollection, where('category', '==', name));

    // 3. Explicitly type fetchedItems
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedItems: MenuItem[] = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ ...doc.data(), id: doc.id } as MenuItem);
        });
        setItems(fetchedItems);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching category items: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [name]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF6347" />
        <Text>Loading {name}...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${name} Menu` }} />

      {items.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="sad-outline" size={60} color="#CCC" />
          <Text style={styles.emptyText}>No items found for '{name}'</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuItemCard item={item} onAddToCart={() => { /* Add cart logic here */ }} />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  list: {
    padding: 10,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
  }
});