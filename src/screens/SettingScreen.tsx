import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Setting'>;

export default function SettingScreen({ navigation }: Props) {

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
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 18 }}>로그아웃</Text>
                            <EvilIcons name="chevron-right" size={36} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderWidth: 0.5, borderColor: '#C5D5DE', backgroundColor: '#C5D5DE' }} />
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 18 }}>회원탈퇴</Text>
                            <EvilIcons name="chevron-right" size={36} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
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
        color: '#000',
    },
});
