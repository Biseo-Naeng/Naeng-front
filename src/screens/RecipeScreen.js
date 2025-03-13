import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Bookmark, Eye } from "lucide-react-native";

const recipes = [
  { id: "1", image: "https://via.placeholder.com/150", user: "ChefA", views: 120, bookmarks: 45, title: "Spaghetti Carbonara" },
  { id: "2", image: "https://via.placeholder.com/150", user: "FoodieB", views: 200, bookmarks: 78, title: "Avocado Toast" },
  { id: "3", image: "https://via.placeholder.com/150", user: "HomeCookC", views: 95, bookmarks: 30, title: "Pancakes" },
];

export default function RecipeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>레시피 화면 예시</Text>
      <TextInput 
        style={styles.searchBar} 
        placeholder="Search by ingredient or category" 
      />
      <FlatList
        data={recipes}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text style={styles.recipeUser}>By {item.user}</Text>
            <View style={styles.recipeStats}>
              <View style={styles.statItem}>
                <Eye size={16} color="gray" />
                <Text style={styles.statText}>{item.views}</Text>
              </View>
              <View style={styles.statItem}>
                <Bookmark size={16} color="gray" />
                <Text style={styles.statText}>{item.bookmarks}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('RecipeForm')}>
        <Text style={styles.addButtonText}>+ 레시피 등록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  recipeCard: {
    flex: 1,
    margin: 8,
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  recipeImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  recipeUser: {
    color: "gray",
  },
  recipeStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 4,
    color: "gray",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#ff6347",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
