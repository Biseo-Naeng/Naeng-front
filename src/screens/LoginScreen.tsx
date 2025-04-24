import React, {useState} from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Checkbox from 'expo-checkbox';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 80}}>
        <Image 
        source={require('../../assets/images/로고.png')}
        style={{
          width: 230,
          height: 100,
          resizeMode: 'contain',
        }}/>
      </View>
      <View>
        <TextInput
          placeholder="아이디"
          placeholderTextColor="#979797"
          value={id}
          onChangeText={(text) => {
            // 영문, 숫자만 허용하고 20자 이내로 제한
            const filteredText = text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
            setId(filteredText);
          }}
          autoCapitalize="none"          
          style={{
            width: 300,
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: '#8D8D8D',
          }}
        />
        <TextInput
          placeholder='비밀번호'
          placeholderTextColor='#979797'
          value={password}
          onChangeText={(text) => {
            // 영문, 숫자만 허용하고 20자 이내로 제한
            const filteredText = text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
            setPassword(filteredText);
          }}
          autoCapitalize="none"
          secureTextEntry={true}
          style={{
            width: 300,
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: '#8D8D8D',
            marginTop: 10,
          }}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            value={isLogin}
            onValueChange={setIsLogin}
            style={{ marginTop: 20, marginRight: 10 }}
            color={isLogin ? '#1C9BEA' : undefined} />
          <Text style={{marginTop: 20}}>아이디 저장</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          //onPress={() => navigation.navigate('Main')}
          style={{
            width: 300,
            height: 50,
            backgroundColor: '#1C9BEA',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 70,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Terms')}
          style={{
            width: 300,
            height: 50,
            backgroundColor: '#1C9BEA',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 10,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>회원가입</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: 300, marginTop: 20}}>
          <Text style={{marginTop: 5, fontSize: 13, color: '#8D8D8D'}}>아이디 찾기</Text>
          <Text style={{marginTop: 5, fontSize: 13, color: '#8D8D8D'}}>비밀번호 찾기</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
});
