import React, { useState, useRef } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function RecipeForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([{ type: 'text', value: '' }]);
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newContent = [...content];
      newContent.push({ type: 'image', value: result.assets[0].uri });
      newContent.push({ type: 'text', value: '' }); // 새 텍스트 입력 칸 추가
      setContent(newContent);

      // 스크롤을 맨 아래로 이동
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const updateTextContent = (text, index) => {
    const newContent = [...content];
    newContent[index].value = text;
    setContent(newContent);
  };

  const handleSubmit = () => {
    console.log('제목:', title);
    console.log('내용:', content);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.block} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior="padding">
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}>
          <TextInput
            placeholder="레시피 제목"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          {content.map((item, index) => (
            <View key={index} style={styles.contentItem}>
              {item.type === 'text' ? (
                <TextInput
                  placeholder="레시피 내용"
                  style={styles.contentInput}
                  multiline
                  value={item.value}
                  onChangeText={(text) => updateTextContent(text, index)}
                />
              ) : (
                <Image source={{ uri: item.value }} style={styles.image} />
              )}
            </View>
          ))}
          <TouchableOpacity
            style={styles.imageButton}
            onPress={addImage}>
            <Text style={styles.imageButtonText}>이미지 추가</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>등록</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  keyboardAvoiding: {
    flex: 1,
    marginTop: 20,
  },
  scrollContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  contentItem: {
    marginBottom: 16,
  },
  contentInput: {
    backgroundColor: 'white',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    minHeight: 50,
  },
  imageButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  imageButtonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
