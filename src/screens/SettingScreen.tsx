import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Setting'>;

export default function SettingScreen({ navigation }: Props) {
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [askWithdrawalModalVisible, setAskWithdrawalModalVisible] = useState(false);
    const [WithdrawalModalVisible, setWithdrawlModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.iconButton}>
                    <Ionicons name="chevron-back-outline" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>설정</Text>
            </View>
            <View>
                <Text style={{ marginLeft: 10, fontSize: 15, color: '#000' }}>
                    어플리케이션 정보
                </Text>
                <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#C5D5DE', backgroundColor: '#fff', borderRadius: 15, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 7 }}>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 18 }}>버전관리</Text>
                            <EvilIcons name="chevron-right" size={36} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderWidth: 0.5, borderColor: '#C5D5DE', backgroundColor: '#C5D5DE' }} />
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 18 }}>알림설정</Text>
                            <EvilIcons name="chevron-right" size={36} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderWidth: 0.5, borderColor: '#C5D5DE', backgroundColor: '#C5D5DE' }} />
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 18 }}>이용약관</Text>
                            <EvilIcons name="chevron-right" size={36} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{ marginTop: 20, marginLeft: 10, fontSize: 15, color: '#000' }}>
                    상담 및 안내
                </Text>
                <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#C5D5DE', backgroundColor: '#fff', borderRadius: 15, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 7 }}>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 18 }}>공지사항</Text>
                            <EvilIcons name="chevron-right" size={36} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderWidth: 0.5, borderColor: '#C5D5DE', backgroundColor: '#C5D5DE' }} />
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 18 }}>문의사항</Text>
                            <EvilIcons name="chevron-right" size={36} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{ marginTop: 20, marginLeft: 10, fontSize: 15, color: '#000' }}>
                    회원설정
                </Text>
                <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#C5D5DE', backgroundColor: '#fff', borderRadius: 15, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 7 }}>
                    <TouchableOpacity onPress={() => setLogoutModalVisible(true)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 18 }}>로그아웃</Text>
                            <EvilIcons name="chevron-right" size={36} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderWidth: 0.5, borderColor: '#C5D5DE', backgroundColor: '#C5D5DE' }} />
                    <TouchableOpacity onPress={() => setAskWithdrawalModalVisible(true)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 18 }}>회원탈퇴</Text>
                            <EvilIcons name="chevron-right" size={36} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                visible={logoutModalVisible}
                animationType='fade'
                onRequestClose={() => setLogoutModalVisible(false)}
                transparent={true}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 300,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 20,
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 22 }}>로그아웃 하시겠습니까?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <TouchableOpacity onPress={() => {
                                setLogoutModalVisible(false);
                                navigation.navigate('Login');
                            }}
                                style={{ width: 100, alignItems: 'center', marginRight: 10, backgroundColor: '#455BE2', padding: 10, borderRadius: 20 }}>
                                <Text style={{ color: "#fff", fontSize: 18 }}>로그아웃</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setLogoutModalVisible(false)}
                                style={{ alignItems: 'center', width: 100, backgroundColor: '#A5B2B9', padding: 10, borderRadius: 20 }}>
                                <Text style={{ color: "#fff", fontSize: 18 }}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={askWithdrawalModalVisible}
                animationType='fade'
                onRequestClose={() => setAskWithdrawalModalVisible(false)}
                transparent={true} >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 300,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 20,
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 22 }}>탈퇴하시겠습니까?</Text>
                        <View>
                            <Image source={require('../../assets/images/탈퇴.png')} style={{ width: 80, height: 105, marginTop: 10 }} />
                        </View>
                        <Text style={{ marginTop: 10}}>
                            탈퇴시 계정은 삭제되며 복구되지 않습니다.
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => {
                                setAskWithdrawalModalVisible(false);
                                setWithdrawlModalVisible(true);
                            }}
                                style={{ width: 100, alignItems: 'center', marginRight: 10, backgroundColor: '#455BE2', padding: 10, borderRadius: 20 }}>
                                <Text style={{ color: "#fff", fontSize: 18 }}>탈퇴</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setAskWithdrawalModalVisible(false)}
                                style={{ alignItems: 'center', width: 100, backgroundColor: '#A5B2B9', padding: 10, borderRadius: 20 }}>
                                <Text style={{ color: "#fff", fontSize: 18 }}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
            visible={WithdrawalModalVisible}
            animationType='fade'
            onRequestClose={() => setWithdrawlModalVisible(false)}
            transparent={true} >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 300,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 20,
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 22 }}>탈퇴되었습니다.</Text>
                        
                        <Text style={{ marginTop: 10}}>
                            떠나신다니 아쉽습니다.
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setWithdrawlModalVisible(false);
                            navigation.navigate('Login');
                        }}
                            style={{ width: 100, alignItems: 'center', marginTop: 20, backgroundColor: '#455BE2', padding: 10, borderRadius: 20 }}>
                            <Text style={{ color: "#fff", fontSize: 18 }}>확인</Text>
                        </TouchableOpacity>                        
                    </View>
                </View>

            </Modal>
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
        color: '#000',
    },
});
