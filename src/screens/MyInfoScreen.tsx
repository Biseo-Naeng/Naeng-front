import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput, Platform, GestureResponderEvent, Alert} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

type Props = NativeStackScreenProps<RootStackParamList, 'MyInfo'>;

export default function MyInfoScreen({ navigation }: Props) {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [originalProfileImage, setOriginalProfileImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [id, setId] = useState<string>('sony123');
  const [name, setName] = useState<string>('홍길동');
  const [nameInput, setNameInput] = useState<string>(name);
  const [email, setEmail] = useState<string>('sony123@koreatech.ac.kr');
  const [emailInput, setEmailInput] = useState<string>(email);
  const [emailError, setEmailError] = useState<string>('');
  const [verificationNumber, setVerificationNumber] = useState<string>('');
  const [verificationNumberError, setVerificationNumberError] = useState<string>('');
  const [verificationComplete, setVerificationComplete] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);

  // 최초 마운트 시 profileImage 값을 originalProfileImage에 저장
  useEffect(() => {
    setOriginalProfileImage(profileImage);
  }, []);

  useEffect(() => {
    if (!isModifyMode) {
      setNameInput(name);
      setEmailInput(email);
      setEmailError('');
      setIsVerificationSent(false);
      setVerificationNumber('');
      setVerificationNumberError('');
      setVerificationComplete(false);
      setProfileImage(originalProfileImage);
    }
  }, [isModifyMode]);

  // 권한 요청
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

  // 이메일 유효성 검사 함수(리턴값 사용)
  const isEmailValid = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // 인증번호 유효성 검사 함수(리턴값 사용)
  const isValidNumber = (value: string) => {
    const numberRegex = /^[0-9]{6}$/; // 6자리 숫자
    return numberRegex.test(value);
  }

  const handleSave = () => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    };

  return (
    <View style={styles.container}>
      {/* 사진 등록 모달 */}
      {modalVisible && (
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
      )}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}>
          <Ionicons name="chevron-back-outline" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>내 정보</Text>
      </View>
      <View>
        <View style={{ marginTop: 20, marginLeft: 10 }}>
          <Text style={{ color: '#455BE2', fontWeight: 'bold', marginBottom: 10, }}>프로필 사진</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require('../../assets/images/캐릭터.png')
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: 'gray',
              }}
            />
            {isModifyMode && (<TouchableOpacity
              style={[styles.imageButton, { position: 'absolute', right: 0, bottom: 0 }]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.imageButtonText}>사진 등록</Text>
            </TouchableOpacity>)}
          </View>
        </View>

        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          <Text style={{ color: '#455BE2', fontWeight: 'bold' }}>아이디</Text>
          <TextInput
            style={[styles.input, { width: '100%' }]}
            editable={false}
            value={id}
          >
          </TextInput>
        </View>
        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          <Text style={{ color: '#455BE2', fontWeight: 'bold' }}>이름</Text>
          <TextInput
            style={[styles.input, { width: '100%' }]}
            editable={isModifyMode}
            onChangeText={text => setNameInput(text)}
            value={isModifyMode ? nameInput : name}
          >
          </TextInput>
        </View>
        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          <Text style={{ color: '#455BE2', fontWeight: 'bold' }}>이메일</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextInput
              style={[
                styles.input,
                { width: isModifyMode ? '60%' : '100%' }
              ]}
              editable={isModifyMode}
              value={isModifyMode ? emailInput : email}
              onChangeText={text => {
                setEmailInput(text);
                // 여기서 바로 검사
                if (isModifyMode) {
                  if (!isEmailValid(text)) {
                    setEmailError('이메일이 올바르지 않습니다. 다시 확인해주세요.');
                  } else {
                    setEmailError('');
                  }
                }
              }}
            />
            {isModifyMode && (
              <TouchableOpacity
                disabled={
                  verificationComplete ||
                  emailInput === email ||
                  emailInput.trim() === '' ||
                  !isEmailValid(emailInput)
                }
                onPress={() => {
                  if (!verificationComplete) {
                    if (isVerificationSent) {
                      console.log('인증번호 재발송!');
                    } else {
                      console.log('인증번호 발송!');
                    }
                    setIsVerificationSent(true);
                  }
                }}
                style={[
                  styles.verifyButton,
                  (verificationComplete ||
                    emailInput === email ||
                    emailInput.trim() === '' ||
                    !isEmailValid(emailInput)) && { backgroundColor: '#ccc' }
                ]}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  {!isVerificationSent ? "인증번호 발송" : "인증번호 재발송"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {isModifyMode && emailError !== '' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <AntDesign
                name="exclamationcircleo"
                size={12}
                color="red"
                style={{ marginRight: 3 }}
              />
              <Text style={{ color: 'red', fontSize: 13 }}>{emailError}</Text>
            </View>
          )}
          {isModifyMode && emailError === '' && (
            <View style={{ height: 20, marginTop: 2.5 }} />
          )}

          {isModifyMode && isVerificationSent && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextInput
                style={[
                  styles.input,
                  { width: isModifyMode ? '60%' : '100%' }
                ]}
                editable={isModifyMode && !verificationComplete}
                value={verificationNumber}
                onChangeText={text => {
                  setVerificationNumber(text);
                }}
                placeholder="인증번호 입력"
                placeholderTextColor="#8D8D8D"
              />
              {isModifyMode && (
                <TouchableOpacity
                  disabled={
                    verificationComplete ||
                    emailInput === email ||
                    emailInput.trim() === '' ||
                    !isEmailValid(emailInput)
                  }
                  onPress={() => {
                    if (!verificationComplete) {
                      if (!isValidNumber(verificationNumber)) {
                        setVerificationNumberError('인증번호가 올바르지 않습니다. 다시 확인해주세요.');
                      } else {
                        setVerificationNumberError('');
                        setVerificationComplete(true);
                      }
                    }
                  }}
                  style={[
                    styles.verifyButton,
                    (verificationComplete ||
                      emailInput === email ||
                      emailInput.trim() === '' ||
                      !isEmailValid(emailInput)) && { backgroundColor: '#ccc' }
                  ]}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>인증번호 확인</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {isModifyMode && verificationNumberError !== '' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <AntDesign
                name="exclamationcircleo"
                size={12}
                color="red"
                style={{ marginRight: 3 }}
              />
              <Text style={{ color: 'red', fontSize: 13 }}>{verificationNumberError}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          disabled={
            isModifyMode &&
            !(
              (nameInput !== name || emailInput !== email || profileImage !== originalProfileImage) &&
              (verificationComplete || emailInput === email)
            )
          }
          style={[
            styles.signupButton,
            (
              isModifyMode &&
              !(
                (nameInput !== name || emailInput !== email || profileImage !== originalProfileImage) &&
                (verificationComplete || emailInput === email)
              )
            ) && { backgroundColor: '#ccc' }
          ]}
          onPress={() => {
            if (isModifyMode) {
              handleSave();
              setName(nameInput);
              setEmail(emailInput);
              setOriginalProfileImage(profileImage);
              setVerificationComplete(false); // 저장 후 인증 완료 상태 초기화
            }
            setIsModifyMode(!isModifyMode);
          }}
        >
          <Text style={styles.signupButtonText}>{!isModifyMode ? '정보 수정' : '저장'}</Text>
        </TouchableOpacity>
      </View>
      {toastVisible && (
              <View style={styles.toast}>
                <Text style={styles.toastText}>저장되었습니다.</Text>
              </View>
            )}
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
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#8D8D8D',
    textAlignVertical: 'bottom',

  },
  signupButton: {
    backgroundColor: '#1C9BEA',
    borderRadius: 20,
    height: 50,
    marginBottom: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageButton: {
    backgroundColor: '#1C9BEA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginLeft: 20,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
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
  verifyButton: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#1C9BEA',
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#fff',
    borderRadius: 15,
  },
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    backgroundColor: 'rgba(104, 117, 245, 0.9)',
    paddingHorizontal: 80,
    paddingVertical: 14,
    borderRadius: 8,
    // 그림자가 view안에 겹쳐져서 보여서 지저분해보여서.. 일단 없앰 -> 해결법 찾아보자
    // elevation: 5,
    // shadowColor: '#000',
    // shadowOpacity: 0.2,
    // shadowOffset: { width: 0, height: 2 },
  },
  toastText: {
    color: '#fff',
    fontSize: 18,
  },
});
