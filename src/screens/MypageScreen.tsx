import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../../App';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import CustomToggle from '../components/CustomToggle';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import BottomBarContext from '../context/BottomBarContext';

type Props = BottomTabScreenProps<MainTabParamList, 'Mypage'>;

export default function MypageScreen({ navigation }: Props) {
    const stackNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    // 비밀번호 확인 모달 관련 상태
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const bottomBarContext = useContext(BottomBarContext);
    if (!bottomBarContext) throw new Error('BottomBarProvider로 감싸져야 합니다!');
    const { mode, setMode } = bottomBarContext;

    const handlePasswordConfirm = () => {
        const isMatch = password === 'qwer1234'; // 실제 환경에서는 서버 검증 필요
        if (isMatch) {
            setModalVisible(false);
            setPassword('');
            setError(null);
            stackNavigation.navigate('MypageChangePassword');
        } else {
            setError('비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 15 }}>마이페이지</Text>
                <FontAwesome5 name="bell" size={28} color="black" />
            </View>
            <View style={{ backgroundColor: '#fff', borderRadius: 15, margin: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#455BE2', padding: 10 }}>
                    <Text style={{ fontSize: 20, marginLeft: 10, color: '#fff' }}>내 프로필</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, marginVertical: 20, backgroundColor: '#fff', borderRadius: 10 }}>
                    <Image source={require('../../assets/images/캐릭터.png')} style={{ width: 100, height: 100, borderRadius: 50, marginLeft: 20, borderColor: 'gray', borderWidth: 1 }} />
                    <View>
                        <Text style={{ fontSize: 15, marginLeft: 30, marginBottom: 5 }}>이름</Text>
                        <Text style={{ fontSize: 15, marginLeft: 30 }}>아이디</Text>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: '#fff', borderRadius: 15, margin: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                <TouchableOpacity onPress={() => stackNavigation.navigate('MyInfo')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginLeft: 10 }}>
                        <Text style={{ fontSize: 15 }}>내 정보</Text>
                        <Feather name="chevron-right" size={28} color="#858585" />
                    </View>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.5, borderColor: '#858585', marginHorizontal: 15, backgroundColor: '#858585' }} />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginLeft: 10 }}>
                        <Text style={{ fontSize: 15 }}>비밀번호 변경</Text>
                        <Feather name="chevron-right" size={28} color="#858585" />
                    </View>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.5, borderColor: '#858585', marginHorizontal: 15, backgroundColor: '#858585' }} />
                <TouchableOpacity onPress={() => stackNavigation.navigate('Setting')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginLeft: 10 }}>
                        <Text style={{ fontSize: 15 }}>설정</Text>
                        <Feather name="chevron-right" size={28} color="#858585" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, margin: 20, padding: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                <Text style={{ fontSize: 15 }}>
                    하단 표시바
                </Text>
                <CustomToggle
                    leftText="한글"
                    rightText="아이콘"
                    onToggle={(isLeft: boolean) => setMode(isLeft ? 'korean' : 'icon')}
                />
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.close} onPress={() => {
                            setModalVisible(false);
                            setPassword('');
                            setError(null);
                        }}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>비밀번호를 입력해주세요.</Text>
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
                        {!error && <View style={{ height: 16 }} />}
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: password ? '#1C9BEA' : '#A5B2B9' }]}
                            disabled={!password}
                            onPress={() => {
                                handlePasswordConfirm;
                                setModalVisible(false);
                                setPassword('');
                                setError(null);
                                stackNavigation.navigate('MypageChangePassword');
                            }}
                        >
                            <Text style={styles.buttonText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
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
    modalTitle: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'left',
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
        fontSize: 18,
    },
});