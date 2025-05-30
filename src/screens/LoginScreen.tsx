import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useBackHandler } from '../hook/useMainBackHandler';
import Checkbox from 'expo-checkbox';
import { login } from '../api/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setusername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useBackHandler();

  const handleLogin = async () => {
    try{
      const response = await login({username, password});
      if (response.statusCode === 200 && response.body &&
        typeof response.body.accessToken === 'string') {
        Alert.alert('로그인 성공');
        // 토큰 저장 및 화면 이동 처리 추가 가능
      } else {
        Alert.alert('로그인 실패', '이메일 또는 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      Alert.alert('네트워크 오류', '서버와의 통신에 실패했습니다.');
    }
  }

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
          value={username}
          onChangeText={(text) => {
            const filteredText = text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
            setusername(filteredText);
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
          <Text style={styles.checkboxLabel}>로그인 유지</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainTabs');
          handleLogin();
        }}
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
          <TouchableOpacity onPress={() =>
            navigation.navigate('FindId')
          }>
            <Text style={styles.linkText}>아이디 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            navigation.navigate('FindPassword')
          }>
            <Text style={styles.linkText}>비밀번호 찾기</Text>
          </TouchableOpacity>          
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
    textAlignVertical: 'bottom',
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
