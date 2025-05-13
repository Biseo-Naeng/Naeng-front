import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePassword'>;

export default function ChangePasswordScreen({ navigation }: Props) {
    const [password, setPassword] = useState<string>('');
    const [verifyPassword, setVerifyPassword] = useState<string>('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState<string>('');
    const [isPasswordValid, setPasswordValid] = useState<string>('');

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
        } else if (text.length < 6 || text.length > 18) {
            setPasswordValid('비밀번호는 6~18자를 입력해주세요.');
        } else {
            setPasswordValid('비밀번호는 최소 1개의 영문, 숫자, 특수문자를 포함해야 합니다.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.iconButton}>
                    <Ionicons name="chevron-back-outline" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>비밀번호 찾기</Text>
            </View>
            <View>
                <Text style={styles.sectionTitle}>2. 비밀번호 변경</Text>
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar} />
                </View>
            </View>
            <View>
                <Text style={{ marginTop: 20 }}>새 비밀번호</Text>
                <TextInput
                    placeholder="비밀번호를 입력하세요"
                    placeholderTextColor="#979797"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        handlePasswordValid(text);
                        handleVerifyPassword(text, verifyPassword)
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
            <Text>비밀번호 확인</Text>
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
                    <Text style={[styles.errorText, { color: isPasswordCorrect == '비밀번호가 일치합니다.' ? 'green' : 'red' }]}>{isPasswordCorrect}</Text>
                </View>
            )}
            {!isPasswordCorrect && <View style={{ height: 21 }} />}
            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('PasswordConfirm')} style={{ backgroundColor: '#B0C4DE', width: '100%', borderRadius: 20, height: 50, marginBottom: 10, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>
                        비밀번호 찾기
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
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
        color: '#000',
    },
    sectionTitle: {
        fontSize: 18,
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
        width: '100%',
        height: '100%',
        backgroundColor: '#1C9BEA',
    },
    input: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#8D8D8D',
        textAlignVertical: 'bottom',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});
