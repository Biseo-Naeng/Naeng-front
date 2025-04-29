import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'IdConfirm'>;

export default function IdConfirmScreen({ navigation }: Props) {
    const [name] = useState<string>('홍길동');
    const [id] = useState<string>('abcd1234');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.iconButton}>
                    <Ionicons name="chevron-back-outline" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>아이디 찾기</Text>
            </View>
            <View>
                <Text style={styles.sectionTitle}>2. 아이디 확인</Text>
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar} />
                </View>
            </View>
            <View style= {{
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '35%'
            }}>
                <Text style={{fontSize: 24}}>
                    {name} 님의 아이디는
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text style={{marginRight: 5, color: '#455BE2', fontSize: 24, fontWeight: 'bold'}}>
                    {id}
                </Text>
                <Text style={{fontSize: 24}}>
                    입니다.
                </Text>
                </View>                
            </View>
            <View style= {{flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{backgroundColor: '#1C9BEA', width: '100%', borderRadius: 20, height: 50, marginBottom: 5, marginTop: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style= {{color: 'white', fontSize: 20}}>
                        로그인 페이지로 가기
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{backgroundColor: '#B0C4DE', width: '100%', borderRadius: 20, height: 50, marginBottom: 10, marginTop: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 20}}>
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
});
