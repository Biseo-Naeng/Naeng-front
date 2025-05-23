import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  GestureResponderEvent,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = NativeStackScreenProps<RootStackParamList, 'MypageChangePassword'>;

export default function MypagePasswordChangeScreen({ navigation }: Props) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);


  useEffect(() => {
    if (!newPassword) {
      setNewPasswordError(null);
      return;
    }
    if (newPassword.length < 6 || newPassword.length > 18) {
      setNewPasswordError('비밀번호는 6~18자를 입력해주세요.');
    } else {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/;
      if (!regex.test(newPassword)) {
        setNewPasswordError('최소 1개 이상의 영문, 숫자, 특수문자를 입력해주세요.');
      } else {
        setNewPasswordError(null);
      }
    }
  }, [newPassword]);

  useEffect(() => {
    if (!confirmPassword) {
      setConfirmPasswordError(null);
      return;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
    } else {
      setConfirmPasswordError(null);
    }
  }, [newPassword, confirmPassword]);

  const handleSave = (e: GestureResponderEvent) => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const isSaveEnabled =
    newPassword &&
    confirmPassword &&
    !newPasswordError &&
    !confirmPasswordError;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Ionicons name="chevron-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>비밀번호 변경</Text>
      </View>

      <Text style={styles.label}>새 비밀번호</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호(특수문자 포함 영문·숫자 6~18자리)"
        placeholderTextColor="#979797"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      {newPasswordError && (
        <View style={styles.errorRow}>
          <AntDesign name="exclamationcircleo" size={12} color="red" />
          <Text style={styles.errorText}>{newPasswordError}</Text>
        </View>
      )}

      <Text style={[styles.label, { marginTop: 20 }]}>비밀번호 확인</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 다시 입력해주세요."
        placeholderTextColor="#979797"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {confirmPasswordError && (
        <View style={styles.errorRow}>
          <AntDesign name="exclamationcircleo" size={12} color="red" />
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: isSaveEnabled ? '#1C9BEA' : '#A5B2B9' },
          ]}
          disabled={!isSaveEnabled}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>저장</Text>
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
    backgroundColor: '#fff',
    padding: 20,
    position: 'relative',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 30,
  },
  back: {
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#000',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#8D8D8D',
    height: 44,
    paddingVertical: 8,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 4,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  saveButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
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
