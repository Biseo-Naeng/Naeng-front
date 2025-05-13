import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = NativeStackScreenProps<RootStackParamList, 'FindPassword'>;

export default function FindPasswordScreen({ navigation }: Props) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [idError, setIdError] = useState<string>('');
    const [verificationNumber, setVerificationNumber] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [isSent, setIsSent] = useState(false);
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);

    const handleSend = () => {
        if (!isSent) {
            // 인증번호 전송 로직
            console.log('인증번호 전송됨');
        } else {
            // 재전송 로직
            console.log('인증번호 재전송됨');
        }
        setIsSent(true);
    };

    const handleVerify = () => {
        if (verificationNumber === '123456') {
            console.log('인증번호 확인 성공');
            setVerificationError(null);
            setIsVerified(true);
        } else {
            console.log('인증번호 확인 실패');
            setVerificationError('인증번호가 올바르지 않습니다.');
        }
    };

    const checkIdExistence = async (id: string) => {
        // 아이디 존재 여부 확인 로직
        setIdError('존재하지 않는 아이디입니다. 다시 확인해주세요')
        if(!id){
            // 아이디 존재하지 않을 때
            setIdError('존재하지 않는 아이디입니다. 다시 확인해주세요')
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
                <Text style={styles.sectionTitle}>1. 본인 인증</Text>
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar} />
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.inputLabel}>아이디</Text>
                <TextInput
                    placeholder="아이디를 입력하세요"
                    placeholderTextColor="#979797"
                    autoCapitalize="none"
                    style={styles.nameInput}
                    value={id}
                    maxLength={10}
                    onChangeText={(text) => {
                        setId(text);
                    }}
                    onBlur={() => {
                        // textinput에서 포커스가 벗어날 때 실행
                        checkIdExistence(id);
                    }}
                />
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
            <View style={styles.section}>
                <Text style={styles.inputLabel}>이름</Text>
                <TextInput
                    placeholder="이름을 입력하세요"
                    placeholderTextColor="#979797"
                    autoCapitalize="none"
                    style={styles.nameInput}
                    value={name}
                    maxLength={10}
                    onChangeText={(text) => {
                        setName(text); // 한글 조합을 위해 일단 항상 허용
                        const koreanRegex = /^[가-힣]*$/;
                        if (!koreanRegex.test(text)) {
                            setNameError('이름은 한글만 입력할 수 있습니다.');
                        } else {
                            setNameError(null);
                        }
                    }}
                />
            </View>
            {nameError && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign
                        name="exclamationcircleo"
                        size={12}
                        color="red"
                        style={{ marginTop: 6, marginRight: 3 }}
                    />
                    <Text style={styles.errorText}>{nameError}</Text>
                </View>
            )}
            {!nameError && <View style={{ height: 21 }} />}
            <View>
                <View>
                    <Text style={[styles.inputLabel, { marginTop: 20 }]}>이메일</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            placeholder="이메일을 입력하세요"
                            placeholderTextColor="#979797"
                            autoCapitalize="none"
                            style={styles.emailInput}
                            value={email}
                            onChangeText={(text) => {
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                setEmail(text || '');
                                if (!emailRegex.test(text)) {
                                    setEmailError('올바른 이메일 형식이 아닙니다. 다시 확인해주세요.');
                                } else {
                                    setEmailError(null);
                                }
                            }}
                        />
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                { backgroundColor: email !== '' && !emailError ? '#1C9BEA' : '#E0E0E0' },
                            ]}
                            onPress={() => {
                                // 이메일 인증번호 전송 로직
                                handleSend()
                            }}
                            disabled={email === '' || !!emailError}
                        >

                            <Text style={styles.sendButtonText}>
                                {isSent ? '인증번호 재전송' : '인증번호 전송'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {emailError && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign
                                name="exclamationcircleo"
                                size={12}
                                color="red"
                                style={{ marginTop: 6, marginRight: 3 }}
                            />
                            <Text style={styles.errorText}>{emailError}</Text>
                        </View>
                    )}
                    {!emailError && <View style={{ height: 21 }} />}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            placeholder="인증번호를 입력하세요"
                            placeholderTextColor="#979797"
                            autoCapitalize="none"
                            keyboardType="numeric"
                            maxLength={6}
                            style={styles.emailInput}
                            value={verificationNumber}
                            onChangeText={(text) => {
                                const numericRegex = /^[0-9]*$/;
                                if (!numericRegex.test(text)) {
                                    setVerificationError('인증번호는 숫자만 입력할 수 있습니다.');
                                } else if (text.length !== 6) {
                                    setVerificationError('인증번호는 6자를 입력해야 합니다.');
                                } else {
                                    setVerificationError(null);
                                }
                                setVerificationNumber(text);
                            }}
                        />
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                { backgroundColor: isVerified ? '#4CAF50' : verificationNumber.length === 6 ? '#1C9BEA' : '#E0E0E0',
                                 },
                            ]}
                            onPress={() => {
                                if (!isVerified) {
                                    handleVerify(); // 인증번호 확인 로직 실행
                                }                                
                            }}
                            disabled={verificationNumber.length !== 6 || isVerified}
                        >
                            <Text style={styles.sendButtonText}>
                                {isVerified ? '확인 완료' : '인증번호 확인'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {verificationError && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign
                        name="exclamationcircleo"
                        size={12}
                        color="red"
                        style={{ marginTop: 6, marginRight: 3 }}
                    />
                    <Text style={styles.errorText}>{verificationError}</Text>
                </View>
            )}
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PasswordConfirm')}
                    disabled={!isVerified || !name || !!emailError}
                    // 인증번호 확인 로직 되면 조건 변경해야함
                    style={{ backgroundColor: (!isVerified || !name || !!emailError) ? '#B0C4DE' : '#1C9BEA', borderRadius: 20, height: 50, marginBottom: 10, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>다음</Text>
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
        width: '50%',
        height: '100%',
        backgroundColor: '#1C9BEA',
    },
    section: {
        marginTop: 20,
    },
    inputLabel: {
        fontSize: 16,
    },
    nameInput: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#8D8D8D',
        textAlignVertical: 'bottom',
    },
    sendButton: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 12,
        marginLeft: 10,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emailInput: {
        flex: 1,
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
})