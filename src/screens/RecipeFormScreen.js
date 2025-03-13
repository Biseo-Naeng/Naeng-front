import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default function RecipeForm({ navigation }) {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("g");
  const [image, setImage] = useState(null);

  const addIngredient = () => {
    if (ingredientName && quantity) {
      setIngredients([...ingredients, { name: ingredientName, quantity, unit }]);
      setIngredientName("");
      setQuantity("");
      setUnit("g");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>레시피 등록</Text>
      <Text style={styles.subtitle}>조리 방법</Text>
      <TextInput 
        style={styles.input} 
        placeholder="제목" 
        value={title} 
        onChangeText={setTitle} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="조리 방법" 
        value={instructions} 
        onChangeText={setInstructions} 
        multiline
      />
      <Text style={styles.subtitle}>재료 준비</Text>
      <TextInput 
        style={styles.input} 
        placeholder="재료명" 
        value={ingredientName} 
        onChangeText={setIngredientName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="개수" 
        value={quantity} 
        keyboardType="numeric"
        onChangeText={setQuantity} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Unit (g, mg, ml, L)" 
        value={unit} 
        onChangeText={setUnit} 
      />
      <Button title="재료 추가" onPress={addIngredient} />
      {ingredients.map((ing, index) => (
        <Text key={index} style={styles.ingredientItem}>{`${ing.name}: ${ing.quantity} ${ing.unit}`}</Text>
      ))}
      <Button title="이미지 등록" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.recipeImage} />}
      <Button title="레시피 저장" onPress={() => navigation.goBack()} />
    </ScrollView>
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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  ingredientItem: {
    fontSize: 14,
    padding: 4,
    backgroundColor: "#f1f1f1",
    marginVertical: 4,
    borderRadius: 4,
  },
  recipeImage: {
    width: "100%",
    height: 200,
    marginTop: 16,
    borderRadius: 8,
  },
});
