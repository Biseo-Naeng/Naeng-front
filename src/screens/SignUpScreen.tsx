import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Feather from '@expo/vector-icons/Feather';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../assets/images/로고.png')} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Feather name="check-circle" size={54} color="black" />
        <Text style={{ fontSize: 20, marginTop: 20 }}>
          회원가입이 완료되었습니다.
        </Text>
        <Text style={{ fontSize: 20, marginTop: 10 }}>
          가입을 환영합니다.
        </Text>
      </View>
      <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
        <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        style={{
          backgroundColor: '#1C9BEA',
          borderRadius: 20, height: 50, marginBottom: 10,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>로그인 페이지로 가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
