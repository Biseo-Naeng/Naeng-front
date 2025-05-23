import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = NativeStackScreenProps<RootStackParamList, 'MypagePasswordConfirm'>;

export default function MypagePasswordConfirmScreen({ navigation }: Props) {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    const isMatch = password === 'qwer1234';
    if (isMatch) {
      navigation.navigate('MypageChangePassword');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>비밀번호를 입력해주세요.</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="비밀번호"
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (error) setError(null);
          }}
        />
        {error && (
          <View style={styles.errorContainer}>
            <AntDesign name="exclamationcircleo" size={12} color="red" style={{ marginRight: 4 }} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: password ? '#1C9BEA' : '#B0C4DE' }]}
          disabled={!password}
          onPress={handleConfirm}
        >
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'stretch',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#8D8D8D',
    paddingVertical: 8,
    marginBottom: 10,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
