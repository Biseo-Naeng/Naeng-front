import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import * as ImagePicker from 'expo-image-picker';

type Props = NativeStackScreenProps<RootStackParamList, 'FillInfo'>;

export default function FillInfoScreen({ navigation }: Props) {
  const [id, setId] = useState<string>('');
  const [idError, setIdError] = useState<string>('');
  // const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string>('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<string>('');
  const [isPasswordValid, setPasswordValid] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // 앱 실행 시 권한 요청
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted' || cameraStatus !== 'granted') {
          alert('사진 접근 및 카메라 권한이 필요합니다.');
        }
      }
    })();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  const handleCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  const handleDefaultImage = () => {
    setProfileImage(null);
    setModalVisible(false);
  };

  const handleIdDuplicateCheck = () => {
    console.log('id 중복확인 버튼 클릭')
    // 아이디 중복확인 로직
    setIdError('아이디 중복확인 로직 필요'); // 중복확인 되면 문자열, 안되면 ''
  }

  const handleVerifyPassword = (password: string, verifyPassword: string) => {
    if (password !== verifyPassword) {
      setIsPasswordCorrect('비밀번호가 일치하지 않습니다.');
    }
    else {
      setIsPasswordCorrect('비밀번호가 일치합니다.');
    }
  }

  const handlePasswordValid = (text: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/;
    if (passwordRegex.test(text)) {
      setPasswordValid('비밀번호가 유효합니다.');
    } else if(text.length < 6 || text.length > 18){
      setPasswordValid('비밀번호는 6~18자를 입력해주세요.');
    } else {
      setPasswordValid('비밀번호는 최소 1개의 영문, 숫자, 특수문자를 포함해야 합니다.');
    } 
  };

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-back-outline" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>회원가입</Text>
      </View>

      {/* 진행 바 */}
      <View>
        <Text style={styles.sectionTitle}>3. 정보 입력</Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar} />
        </View>
      </View>

      {/* 프로필 이미지 선택 */}
      <View style={styles.imageContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../assets/images/캐릭터.png')
          }
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.imageButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.imageButtonText}>사진 등록</Text>
        </TouchableOpacity>
      </View>

      {/* 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={handleCamera}>
              <Text style={styles.modalButtonText}>사진 촬영</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleImagePick}>
              <Text style={styles.modalButtonText}>앨범에서 선택</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleDefaultImage}>
              <Text style={styles.modalButtonText}>기본 이미지로 선택</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#E0E0E0' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, { color: '#000' }]}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 아이디 입력 */}
      <View>
        <Text style={{ marginTop: 70 }}>아이디</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="아이디를 입력하세요"
            placeholderTextColor="#979797"
            value={id}
            onChangeText={(text) => {
              const filteredText = text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
              setId(filteredText);
            }}
            autoCapitalize="none"
            style={[styles.input, { width: '67%' }]}
          />
          <TouchableOpacity
            onPress={() =>
              handleIdDuplicateCheck()} // 중복확인 함수 호출
            disabled={id == ''}
            style={[styles.duplicateCheckButton, { backgroundColor: !(id == '') ? '#1C9BEA' : '#E0E0E0' }]}>
            <Text style={styles.duplicateCheckButtonText}>중복확인</Text>
          </TouchableOpacity>
        </View>
        {idError && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign
              name="exclamationcircleo"
              size={12}
              color="red"
              style={{ marginTop: 6, marginRight: 3 }}
            />
            <Text style={styles.errorText}>{idError}</Text>
          </View>
        )}
        {!idError && <View style={{ height: 21 }} />}
      </View>

      {/* 비밀번호 입력 */}
      <View>
        <Text style={{ marginTop: 20 }}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력하세요"
          placeholderTextColor="#979797"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            handlePasswordValid(text);
            
          }}
          autoCapitalize="none"
          secureTextEntry={true}
          style={[styles.input]}
        />
      </View>
      {isPasswordValid && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign
            name="exclamationcircleo"
            size={12}
            color={isPasswordValid == '비밀번호가 유효합니다.' ? 'green' : 'red'}
            style={{ marginTop: 6, marginRight: 3 }}
          />
          <Text style={[styles.errorText, { color: isPasswordValid == '비밀번호가 유효합니다.' ? 'green' : 'red' }]}>{isPasswordValid}</Text>
        </View>
      )}
      {!isPasswordValid && <View style={{ height: 21 }} />}
      <View>
        <TextInput
          placeholder="비밀번호를 다시 입력하세요"
          placeholderTextColor="#979797"
          value={verifyPassword}
          onChangeText={(text) => {            
            setVerifyPassword(text);
            handleVerifyPassword(password, text);
          }}
          autoCapitalize="none"
          secureTextEntry={true}
          style={[styles.input]}
        />
      </View>
      {isPasswordCorrect && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign
            name="exclamationcircleo"
            size={12}
            color={isPasswordCorrect == '비밀번호가 일치합니다.' ? 'green' : 'red'}
            style={{ marginTop: 6, marginRight: 3 }}
          />
          <Text style={[styles.errorText, {color: isPasswordCorrect == '비밀번호가 일치합니다.' ? 'green' : 'red'}]}>{isPasswordCorrect}</Text>
        </View>
      )}
      {!isPasswordCorrect && <View style={{ height: 21 }} />}

      {/* 닉네임 입력
      <View>
        <Text>닉네임</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="닉네임을 입력하세요"
            placeholderTextColor="#979797"
            value={nickname}
            onChangeText={(text) => {
              const filteredText = text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
              setId(filteredText);
            }}
            autoCapitalize="none"
            style={[styles.input, { width: '67%' }]}
          />
          <TouchableOpacity onPress={() => console.log('nickname 중복확인 버튼 클릭')} style={styles.duplicateCheckButton}>
            <Text style={styles.duplicateCheckButtonText}>중복확인</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.signupButton}
        >
          <Text style={styles.signupButtonText}>다음</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconButton: {
    position: 'absolute',
    left: -10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBarContainer: {
    width: '100%',
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    width: '66.66%',
    height: '100%',
    backgroundColor: '#1C9BEA',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#E0E0E0',
    borderWidth: 1,
    borderColor: '#979797',
    position: 'absolute',
  },
  imageButton: {
    backgroundColor: '#1C9BEA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    left: 120,
    top: 60,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C9BEA',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#8D8D8D',
    textAlignVertical: 'bottom',
  },
  duplicateCheckButton: {
    width: '30%',
    height: 40,
    backgroundColor: '#1C9BEA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    color: 'white',
    marginLeft: 10,
  },
  duplicateCheckButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#1C9BEA',
    borderRadius: 20,
    height: 50,
    marginBottom: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
