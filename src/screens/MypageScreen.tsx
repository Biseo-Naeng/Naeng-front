import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from '../../App';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import CustomToggle from '../components/CustomToggle';

type Props = NativeStackScreenProps<MainTabParamList, 'Mypage'>;

export default function MypageScreen({ navigation }: Props) {

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
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginLeft: 10 }}>
                        <Text style={{fontSize: 15}}>내 정보</Text>
                        <Feather name="chevron-right" size={28} color="#858585" />
                    </View>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.5, borderColor: '#858585', marginHorizontal: 15, backgroundColor: '#858585' }} />
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginLeft: 10 }}>
                        <Text style={{fontSize: 15}}>비밀번호 변경</Text>
                        <Feather name="chevron-right" size={28} color="#858585" />
                    </View>
                </TouchableOpacity>
                <View style={{ borderWidth: 0.5, borderColor: '#858585', marginHorizontal: 15, backgroundColor: '#858585' }} />
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginLeft: 10 }}>
                        <Text style={{fontSize: 15}}>설정</Text>
                        <Feather name="chevron-right" size={28} color="#858585" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, margin: 20, padding: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                <Text style={{fontSize: 15}}>
                    하단 표시바
                </Text>
                <CustomToggle
                    leftText="한글"
                    rightText="아이콘"
                    onToggle={(isLeft: any) => console.log(isLeft ? '한글' : '아이콘')}
                />
            </View>
        </View>
    );
}
