// RootLayout.tsx
import { Stack,useRouter } from "expo-router";
import { CartProvider,CartContext } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { useContext } from "react";

function CartIconWithBadge() {
  const router = useRouter();
  const { getCartItemCount } = useContext(CartContext);
  const itemCount = getCartItemCount();

  return (
    <TouchableOpacity onPress={() => router.push("/Cart")} style={{ marginRight: 15 }}>
      <Ionicons name="cart-outline" size={28} color="#333" />
      {itemCount > 0 && (
        <View style={{
          position: "absolute", right: -2, top: -2, backgroundColor: "#FF6347",
          borderRadius: 10, width: 20, height: 20, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#fff"
        }}>
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function RootLayout() {
  return (
    // CartProvider wraps the entire app,
    // <CartProvider>, all child components can access the shopping cart's state and functions
    // (like adding items, getting the total, etc.) using the useCart hook.
    <CartProvider>
      
      <Stack
        screenOptions={{
          headerRight: () => <CartIconWithBadge />,
          headerTitleAlign: "center",
        }}
      />
    </CartProvider>
  );
}
