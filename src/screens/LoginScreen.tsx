import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Checkbox from 'expo-checkbox';
import { useBackHandler } from '../hook/useBackHandler';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useBackHandler();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/로고.png')}
          style={styles.logo}
        />
      </View>
      <View>
        <TextInput
          placeholder="아이디"
          placeholderTextColor="#979797"
          value={id}
          onChangeText={(text) => {
            const filteredText = text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
            setId(filteredText);
          }}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="비밀번호"
          placeholderTextColor="#979797"
          value={password}
          onChangeText={(text) => {
            const filteredText = text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
            setPassword(filteredText);
          }}
          autoCapitalize="none"
          secureTextEntry={true}
          style={[styles.input, styles.passwordInput]}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isLogin}
            onValueChange={setIsLogin}
            style={styles.checkbox}
            color={isLogin ? '#1C9BEA' : undefined}
          />
          <Text style={styles.checkboxLabel}>아이디 저장</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.loginButton}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Terms')}
          style={styles.signupButton}
        >
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>아이디 찾기</Text>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 80,
  },
  logo: {
    width: 230,
    height: 100,
    resizeMode: 'contain',
  },
  input: {
    width: 300,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#8D8D8D',
  },
  passwordInput: {
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginTop: 20,
    marginRight: 10,
  },
  checkboxLabel: {
    marginTop: 20,
  },
  loginButton: {
    width: 300,
    height: 50,
    backgroundColor: '#1C9BEA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 70,
  },
  signupButton: {
    width: 300,
    height: 50,
    backgroundColor: '#1C9BEA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 300,
    marginTop: 20,
  },
  linkText: {
    marginTop: 5,
    fontSize: 13,
    color: '#8D8D8D',
  },
});
